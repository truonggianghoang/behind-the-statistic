import Map "mo:core/Map";
import Types "../types/content";

module {
  /// Render a category variant as a stable text label for OQL columns.
  public func categoryText(category : Types.Category) : Text =
    switch category {
      case (#physical) "physical";
      case (#mental) "mental";
    };

  /// Return the full problem catalogue, optionally filtered by category.
  public func listProblems(problems : Map.Map<Nat, Types.Problem>, category : ?Types.Category) : [Types.Problem] {
    let all = problems.values().toArray();
    switch category {
      case null all;
      case (?c) all.filter(func p = p.category == c);
    };
  };

  /// Return a single problem by its stable slug.
  public func getProblemBySlug(problems : Map.Map<Nat, Types.Problem>, slug : Types.Slug) : ?Types.Problem {
    problems.values().find(func p = p.slug == slug);
  };

  /// Return the real-life examples for a category.
  public func listExamples(examples : Map.Map<Nat, Types.RealLifeExample>, category : Types.Category) : [Types.RealLifeExample] {
    examples.values().toArray().filter(func e = e.category == category);
  };

  /// Return the homepage featured-issue strip.
  public func listFeaturedIssues(featured : Map.Map<Nat, Types.FeaturedIssue>) : [Types.FeaturedIssue] {
    featured.values().toArray();
  };

  /// Return the static site content (story + contact placeholders).
  public func getSiteContent(content : Types.SiteContent) : Types.SiteContent {
    content;
  };
};
