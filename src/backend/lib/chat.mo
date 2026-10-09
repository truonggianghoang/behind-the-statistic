import { fromEnv } "mo:caffeineai-inference-client/Config";
import ChatApi "mo:caffeineai-inference-client/Apis/ChatApi";
import ChatCompletionRequest "mo:caffeineai-inference-client/Models/ChatCompletionRequest";
import ChatCompletionRequestMessage "mo:caffeineai-inference-client/Models/ChatCompletionRequestMessage";
import ChatCompletionRequestMessageOneOf "mo:caffeineai-inference-client/Models/ChatCompletionRequestMessageOneOf";
import ChatCompletionRequestMessageOneOf2 "mo:caffeineai-inference-client/Models/ChatCompletionRequestMessageOneOf2";
import ChatCompletionRequestMessageOneOf3 "mo:caffeineai-inference-client/Models/ChatCompletionRequestMessageOneOf3";
import Types "../types/chat";

module {
  let disclaimer = "This is general educational information only and does not replace professional advice. If you are worried about your health, please speak to a qualified professional.";

  func categoryLabel(category : Types.Category) : Text =
    switch category {
      case (#physical) "Physical Wellbeing";
      case (#mental) "Mental Wellbeing";
    };

  func systemPrompt(category : Types.Category) : Text =
    "You are the educational AI Helper for the public-awareness website 'Behind the Statistic'. "
    # "You are currently helping with the " # categoryLabel(category) # " category. "
    # "Answer questions about wellbeing problems in clear, plain, general-audience language. "
    # "You may explain concepts, simplify difficult information, explain terminology, summarise the website's information, and help the user find the relevant problem. "
    # "You must stay strictly within the educational scope of this website. "
    # "You must never present yourself as a doctor, psychologist, therapist, or emergency service, and you must never diagnose, prescribe, or give personalised medical advice. "
    # "For any health-related question, make clear that you provide general educational information only and that it does not replace professional advice. "
    # "If the question suggests an emergency or crisis, encourage the user to contact local emergency services or a qualified professional immediately. "
    # "Keep replies concise, warm, and respectful.";

  func userMessage(content : Text) : ChatCompletionRequestMessage.ChatCompletionRequestMessage =
    #user(ChatCompletionRequestMessageOneOf2.JSON.init({
      content = #string(content);
      role = #user;
    }));

  func assistantMessage(content : Text) : ChatCompletionRequestMessage.ChatCompletionRequestMessage =
    #assistant({
      ChatCompletionRequestMessageOneOf3.JSON.init({ role = #assistant }) with
      content = ?#string(content);
    });

  func systemMessage(content : Text) : ChatCompletionRequestMessage.ChatCompletionRequestMessage =
    #system_(ChatCompletionRequestMessageOneOf.JSON.init({
      content = #string(content);
      role = #system_;
    }));

  func historyMessage(m : Types.ChatMessage) : ChatCompletionRequestMessage.ChatCompletionRequestMessage =
    switch (m.role) {
      case (#user) userMessage(m.content);
      case (#assistant) assistantMessage(m.content);
    };

  /// Answer an educational question grounded in the site's own content.
  /// Always frames the reply as general educational information only.
  public func askHelper<system>(
    category : Types.Category,
    question : Text,
    history : [Types.ChatMessage],
  ) : async* Types.ChatResult {
    if (question.trim(#char ' ').size() == 0) return #err(#emptyQuestion);
    let messages = do {
      let buf : [ChatCompletionRequestMessage.ChatCompletionRequestMessage] = [systemMessage(systemPrompt(category))];
      let prior = history.map(historyMessage);
      buf.concat(prior).concat([userMessage(question)]);
    };
    let req = ChatCompletionRequest.JSON.init({
      messages;
      model = "router";
    });
    // `fromEnv<system>()` traps when the platform has not provisioned inference
    // credentials. It is called inside the `try` so that condition becomes a
    // graceful `#err` result the frontend can retry, never an IC0503 reject.
    try {
      let config = fromEnv<system>();
      let resp = await* ChatApi.createChatCompletion(config, req);
      if (resp.choices.size() == 0) {
        #err(#unavailable("The AI Helper returned no answer. Please try again."));
      } else {
        switch (resp.choices[0].message.content) {
          case (?text) {
            if (text.trim(#char ' ').size() == 0) {
              #err(#unavailable("The AI Helper returned an empty answer. Please try again."));
            } else {
              #ok(text # "\n\n" # disclaimer);
            };
          };
          case null #err(#unavailable("The AI Helper returned no text. Please try again."));
        };
      };
    } catch e {
      ignore e;
      #err(#unavailable("The AI Helper is temporarily unavailable. Please try again."));
    };
  };
};
