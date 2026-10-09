import Common "common";

module {
  public type Category = Common.Category;

  /// A single turn in the AI Helper conversation.
  public type ChatMessage = {
    role : { #user; #assistant };
    content : Text;
  };

  /// The outcome of an AI Helper request.
  public type ChatResult = {
    #ok : Text;
    #err : ChatError;
  };

  public type ChatError = {
    #emptyQuestion;
    #unavailable : Text;
  };
};
