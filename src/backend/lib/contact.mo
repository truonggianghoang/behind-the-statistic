import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Types "../types/contact";

module {
  // A deliberately permissive but well-formed check: exactly one '@', a
  // non-empty local part, and a domain with a dot and no spaces.
  func isWellFormedEmail(email : Text) : Bool {
    let trimmed = email.trim(#char ' ');
    if (trimmed.size() == 0) return false;
    if (trimmed.contains(#char ' ')) return false;
    let parts = trimmed.split(#char '@').toArray();
    if (parts.size() != 2) return false;
    let local = parts[0];
    let domain = parts[1];
    if (local.size() == 0 or domain.size() == 0) return false;
    if (not domain.contains(#char '.')) return false;
    if (domain.startsWith(#char '.') or domain.endsWith(#char '.')) return false;
    true;
  };

  /// Validate and store a contact-form submission.
  public func submitContact(
    submissions : Map.Map<Nat, Types.ContactSubmission>,
    state : { var nextId : Nat },
    name : Text,
    email : Text,
    message : Text,
  ) : Types.ContactResult {
    if (name.trim(#char ' ').size() == 0) return #err(#missingName);
    if (email.trim(#char ' ').size() == 0) return #err(#missingEmail);
    if (message.trim(#char ' ').size() == 0) return #err(#missingMessage);
    if (not isWellFormedEmail(email)) return #err(#invalidEmail);
    let id = state.nextId;
    state.nextId := id + 1;
    submissions.add(id, {
      id;
      name = name.trim(#char ' ');
      email = email.trim(#char ' ');
      message = message.trim(#char ' ');
      submittedAt = (Time.now() / 1_000_000).toNat();
    });
    #ok({ id });
  };
};
