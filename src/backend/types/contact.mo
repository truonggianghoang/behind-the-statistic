import Common "common";

module {
  public type Timestamp = Common.Timestamp;

  /// A stored contact-form submission.
  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Timestamp;
  };

  /// The outcome of a contact-form submission.
  public type ContactResult = {
    #ok : { id : Nat };
    #err : ContactError;
  };

  public type ContactError = {
    #missingName;
    #missingEmail;
    #missingMessage;
    #invalidEmail;
  };
};
