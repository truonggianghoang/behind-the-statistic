import Map "mo:core/Map";
import EmailClient "mo:caffeineai-email/emailClient";
import Types "../types/contact";
import ContactLib "../lib/contact";

mixin (
  submissions : Map.Map<Nat, Types.ContactSubmission>,
  state : { var nextId : Nat },
) {
  // The site owner's address that receives every contact-form message.
  transient let recipientEmail = "truong-giang_hoang@bvishanoi.com";

  /// Validate and store a contact-form submission, then deliver it by email to
  /// the site owner. Email delivery is best-effort: a delivery failure never
  /// discards an already-stored submission.
  public shared func submitContact(name : Text, email : Text, message : Text) : async Types.ContactResult {
    let result = ContactLib.submitContact(submissions, state, name, email, message);
    switch (result) {
      case (#ok({ id })) {
        let trimmedName = name.trim(#char ' ');
        let trimmedEmail = email.trim(#char ' ');
        let trimmedMessage = message.trim(#char ' ');
        // Best-effort delivery: the integrations canister may be unconfigured
        // (its call traps) or the send may return #err. Either way the
        // submission is already stored and #ok must still be returned.
        try {
          ignore await EmailClient.sendServiceEmail(
            "no-reply",
            [recipientEmail],
            "New contact message from " # trimmedName,
            "A new message was submitted through the Get in Touch form.\n\n" #
            "Name: " # trimmedName # "\n" #
            "Email: " # trimmedEmail # "\n" #
            "Message:\n" # trimmedMessage # "\n\n" #
            "Submission reference: " # id.toText(),
          );
        } catch (_) {};
      };
      case (#err(_)) {};
    };
    result;
  };
};
