import Map "mo:core/Map";
import Types "../types/content";

module {
  // Common synonyms so a plain-language search term still finds the right
  // problem. Each entry maps a search term to the slug it should also match.
  let synonyms : [(Text, Text)] = [
    ("insomnia", "sleep-problems"),
    ("sleep problems", "sleep-problems"),
    ("sleep problem", "sleep-problems"),
    ("sleeplessness", "sleep-problems"),
    ("trouble sleeping", "sleep-problems"),
    ("burnout", "burnout"),
    ("burn out", "burnout"),
    ("burn-out", "burnout"),
    ("stress", "stress"),
    ("stressed", "stress"),
    ("overweight", "obesity"),
    ("obese", "obesity"),
    ("weight", "obesity"),
    ("exercise", "physical-inactivity"),
    ("inactivity", "physical-inactivity"),
    ("sedentary", "physical-inactivity"),
    ("diet", "poor-nutrition"),
    ("nutrition", "poor-nutrition"),
    ("eating", "poor-nutrition"),
    ("diabetes", "type-2-diabetes-risk"),
    ("blood sugar", "type-2-diabetes-risk"),
    ("heart", "heart-disease-risk"),
    ("cardiovascular", "heart-disease-risk"),
    ("anxious", "anxiety"),
    ("panic", "anxiety"),
    ("worried", "anxiety"),
    ("depressed", "depression"),
    ("low mood", "depression"),
    ("sadness", "depression"),
    ("lonely", "loneliness"),
    ("isolated", "loneliness"),
    ("isolation", "loneliness"),
    ("social media", "social-media-self-esteem"),
    ("self-esteem", "social-media-self-esteem"),
    ("self esteem", "social-media-self-esteem"),
    ("comparison", "social-media-self-esteem"),
  ];

  // Higher score = more relevant. 0 means no match at all.
  // Ranking: exact title > title contains > summary contains >
  // section body contains > synonym match.
  func score(problem : Types.Problem, term : Text) : Nat {
    if (term == "") return 0;
    let t = term.toLower();
    let title = problem.title.toLower();
    if (title == t) return 5;
    if (title.contains(#text t)) return 4;
    if (problem.summary.toLower().contains(#text t)) return 3;
    var inSections = false;
    for (section in problem.sections.values()) {
      if (section.heading.toLower().contains(#text t) or section.body.toLower().contains(#text t)) {
        inSections := true;
      };
    };
    if (inSections) return 2;
    // Synonym match: the term maps to this problem's slug.
    for ((key, slug) in synonyms.values()) {
      if (key == t and slug == problem.slug) return 1;
    };
    0;
  };

  /// Search the problem catalogue across both categories by free-text term.
  /// Matches title, summary and section text, plus common synonyms, and
  /// returns matches ordered by relevance (best match first). Ties are
  /// broken by slug so the ordering is stable.
  public func searchProblems(problems : Map.Map<Nat, Types.Problem>, term : Text) : [Types.Problem] {
    let scored = problems.values().toArray().filterMap(
      func p {
        let s = score(p, term);
        if (s == 0) { null } else { ?(s, p) };
      }
    );
    let ranked = scored.sort(
      func (a, b) {
        if (a.0 > b.0) { #less }
        else if (a.0 < b.0) { #greater }
        else { a.1.slug.compare(b.1.slug) };
      }
    );
    ranked.map(func entry = entry.1);
  };
};
