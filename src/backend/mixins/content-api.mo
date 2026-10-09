import Map "mo:core/Map";
import Types "../types/content";
import ContentLib "../lib/content";

mixin (
  problems : Map.Map<Nat, Types.Problem>,
  examples : Map.Map<Nat, Types.RealLifeExample>,
  featured : Map.Map<Nat, Types.FeaturedIssue>,
  siteContent : Types.SiteContent,
) {
  /// Full problem catalogue, optionally filtered by category.
  public query func listProblems(category : ?Types.Category) : async [Types.Problem] {
    ContentLib.listProblems(problems, category);
  };

  /// A single problem by its stable slug.
  public query func getProblem(slug : Types.Slug) : async ?Types.Problem {
    ContentLib.getProblemBySlug(problems, slug);
  };

  /// Real-life examples for a category.
  public query func listExamples(category : Types.Category) : async [Types.RealLifeExample] {
    ContentLib.listExamples(examples, category);
  };

  /// Homepage featured-issue strip.
  public query func listFeaturedIssues() : async [Types.FeaturedIssue] {
    ContentLib.listFeaturedIssues(featured);
  };

  /// Static site content: story and contact placeholders.
  public query func getSiteContent() : async Types.SiteContent {
    ContentLib.getSiteContent(siteContent);
  };
};
