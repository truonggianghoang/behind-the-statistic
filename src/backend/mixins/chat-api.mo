import Types "../types/chat";
import ChatLib "../lib/chat";

mixin () {
  /// Educational AI Helper reply for a category, grounded in site content.
  public shared func askHelper(
    category : Types.Category,
    question : Text,
    history : [Types.ChatMessage],
  ) : async Types.ChatResult {
    await* ChatLib.askHelper<system>(category, question, history);
  };
};
