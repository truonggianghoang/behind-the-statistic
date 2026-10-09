import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import ContentTypes "types/content";
import ContactTypes "types/contact";
import ContentApi "mixins/content-api";
import SearchApi "mixins/search-api";
import ContactApi "mixins/contact-api";
import ChatApi "mixins/chat-api";
import ApiDocMixin "mixins/api-doc";
import ContentLib "lib/content";

actor {
  let accessControlState : AccessControl.AccessControlState;
  let problems : Map.Map<Nat, ContentTypes.Problem>;
  let examples : Map.Map<Nat, ContentTypes.RealLifeExample>;
  let featured : Map.Map<Nat, ContentTypes.FeaturedIssue>;
  let siteContent : ContentTypes.SiteContent;
  let submissions : Map.Map<Nat, ContactTypes.ContactSubmission>;
  let contactState : { var nextId : Nat };

  include MixinAuthorization(accessControlState, null);
  include ContentApi(problems, examples, featured, siteContent);
  include SearchApi(problems);
  include ContactApi(submissions, contactState);
  include ChatApi();
  include ApiDocMixin();
  include Expose({
    entities = [
      problems.toEntityManual("problem", "Problem", "id")
        .sample({
          id = 0;
          slug = "";
          category = #physical;
          title = "";
          summary = "";
          heroImage = "";
          sections = [];
          sources = [];
        })
        .payload("id", func p = p.id)
        .payload("slug", func p = p.slug)
        .payload("category", func p = ContentLib.categoryText(p.category))
        .payload("title", func p = p.title)
        .payload("summary", func p = p.summary)
        .payload("heroImage", func p = p.heroImage)
        .payload("sectionCount", func p = p.sections.size())
        .payload("sourceCount", func p = p.sources.size())
        .public_()
        .build(),
      examples.toEntityManual("example", "RealLifeExample", "id")
        .sample({
          id = 0;
          category = #physical;
          person = "";
          situation = "";
          problem = "";
          impact = "";
          journey = "";
          source = { organisation = ""; title = ""; url = "" };
        })
        .payload("id", func e = e.id)
        .payload("category", func e = ContentLib.categoryText(e.category))
        .payload("person", func e = e.person)
        .payload("situation", func e = e.situation)
        .payload("problem", func e = e.problem)
        .payload("impact", func e = e.impact)
        .payload("journey", func e = e.journey)
        .flatten(func e = e.source)
        .public_()
        .build(),
      featured.toEntityManual("featuredIssue", "FeaturedIssue", "slug")
        .sample({ slug = ""; category = #physical; title = ""; summary = ""; heroImage = "" })
        .payload("slug", func f = f.slug)
        .payload("category", func f = ContentLib.categoryText(f.category))
        .payload("title", func f = f.title)
        .payload("summary", func f = f.summary)
        .payload("heroImage", func f = f.heroImage)
        .public_()
        .build(),
      submissions.toEntity("contactSubmission", "ContactSubmission", "id")
        .sample({ id = 0; name = ""; email = ""; message = ""; submittedAt = 0 })
        .controllerOnly()
        .build(),
      Entity.manual<ContentTypes.SiteContent>(
        "siteContent",
        func () = [siteContent].values(),
        "SiteContent",
        "siteName",
      )
        .sample({
          siteName = "";
          tagline = "";
          introduction = "";
          whyThisMatters = { heading = ""; paragraphs = [] };
          contactDetails = { createdBy = ""; email = ""; organisation = ""; location = ""; project = "" };
        })
        .payload("siteName", func s = s.siteName)
        .payload("tagline", func s = s.tagline)
        .payload("introduction", func s = s.introduction)
        .payload("whyHeading", func s = s.whyThisMatters.heading)
        .payload("whyParagraphCount", func s = s.whyThisMatters.paragraphs.size())
        .flatten(func s = s.contactDetails)
        .public_()
        .build(),
    ];
  });
};
