import Common "common";

module {
  public type Category = Common.Category;
  public type Source = Common.Source;
  public type Slug = Common.Slug;

  /// One ordered section of a problem's article.
  public type ArticleSection = {
    heading : Text;
    body : Text;
  };

  /// A wellbeing problem, as returned by the public read endpoints.
  public type Problem = {
    id : Nat;
    slug : Slug;
    category : Category;
    title : Text;
    summary : Text;
    heroImage : Text;
    sections : [ArticleSection];
    sources : [Source];
  };

  /// A real-life example of someone affected by a problem.
  public type RealLifeExample = {
    id : Nat;
    category : Category;
    person : Text;
    situation : Text;
    problem : Text;
    impact : Text;
    journey : Text;
    source : Source;
  };

  /// A featured issue shown in the homepage preview strip.
  public type FeaturedIssue = {
    slug : Slug;
    category : Category;
    title : Text;
    summary : Text;
    heroImage : Text;
  };

  /// The "Why This Matters" project story.
  public type WhyThisMatters = {
    heading : Text;
    paragraphs : [Text];
  };

  /// Editable placeholder details for the "Get in Touch" page.
  public type ContactDetails = {
    createdBy : Text;
    email : Text;
    organisation : Text;
    location : Text;
    project : Text;
  };

  /// All static site content served to the frontend.
  public type SiteContent = {
    siteName : Text;
    tagline : Text;
    introduction : Text;
    whyThisMatters : WhyThisMatters;
    contactDetails : ContactDetails;
  };
};
