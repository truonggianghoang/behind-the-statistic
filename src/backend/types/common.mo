module {
  /// The two top-level wellbeing categories. Every problem belongs to exactly one.
  public type Category = {
    #physical;
    #mental;
  };

  /// A discreet citation for a problem or a real-life example.
  public type Source = {
    organisation : Text;
    title : Text;
    url : Text;
  };

  /// A stable, URL-safe identifier used for frontend routing.
  public type Slug = Text;

  /// Milliseconds since the Unix epoch.
  public type Timestamp = Nat;
};
