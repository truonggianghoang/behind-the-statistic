mixin () {
  /// Static Markdown documentation of the backend's public API.
  public query func getApiDoc() : async Text {
    "# Behind the Statistic — Backend API\n\n" #
    "The backend serves the public-awareness website **Behind the Statistic**. It\n" #
    "stores the wellbeing problem catalogue, real-life examples, homepage featured\n" #
    "issues and static site content, and exposes read endpoints for the frontend, a\n" #
    "free-text search endpoint, a contact-form endpoint, and an educational AI\n" #
    "Helper chat endpoint.\n\n" #
    "All data is seeded once at canister initialisation from the migration chain.\n" #
    "There is no user-generated content beyond contact submissions.\n\n" #
    "## Authentication and authorization\n\n" #
    "- **Public read endpoints** (`listProblems`, `getProblem`, `listExamples`,\n" #
    "  `listFeaturedIssues`, `getSiteContent`, `searchProblems`) are open to\n" #
    "  everyone, including anonymous callers. No sign-in is required.\n" #
    "- **`submitContact`** is open to everyone, including anonymous callers. It\n" #
    "  validates and stores the submission and then delivers it by email to the\n" #
    "  site owner; it does not require a signed-in caller.\n" #
    "- **`askHelper`** is open to everyone, including anonymous callers. It calls\n" #
    "  Caffeine Inference with platform-provided credentials; no API key is ever\n" #
    "  requested, stored or returned.\n" #
    "- **`getApiDoc`** is a public query and requires no authentication.\n" #
    "- The app's frontend pins an Internet Identity derivation origin, published at\n" #
    "  `/.well-known/ii-derivation-origin` when available. An agent already holding\n" #
    "  the user's Internet Identity authorization derives the correct per-app\n" #
    "  principal against that origin (for example\n" #
    "  `icp identity link web <name> --app <host>`). Such a delegation acts with the\n" #
    "  user's full authority in this app until it expires.\n" #
    "- The backend does not gate any endpoint on registration, so there is no\n" #
    "  registration prerequisite for the public API.\n" #
    "- The OQL data-intelligence endpoints (`schema`, `execute`) enforce\n" #
    "  authorization **per entity**, not per endpoint. The problem catalogue,\n" #
    "  real-life examples, featured issues and site content are `#public_`\n" #
    "  (readable by anyone, including anonymous callers); contact submissions are\n" #
    "  `#controllerOnly` (readable only by the canister controller).\n\n" #
    "## Read endpoints\n\n" #
    "### `listProblems(category : ?Category) : async [Problem]`\n" #
    "Returns the full problem catalogue, optionally filtered by category. Pass\n" #
    "`null` for all problems, or `?variant { physical }` / `?variant { mental }`.\n" #
    "Each `Problem` carries `id`, `slug`, `category`, `title`, `summary`,\n" #
    "`heroImage`, the ordered `sections` (each `{ heading; body }`) and the discreet\n" #
    "`sources` list.\n\n" #
    "### `getProblem(slug : Slug) : async ?Problem`\n" #
    "Returns a single problem by its stable slug (for example `\"anxiety\"`), or\n" #
    "`null` if no problem has that slug. `Slug` is `Text`.\n\n" #
    "### `listExamples(category : Category) : async [RealLifeExample]`\n" #
    "Returns the real-life examples for one category. Each example carries `id`,\n" #
    "`category`, `person`, `situation`, `problem`, `impact`, `journey` and a\n" #
    "`source` reference.\n\n" #
    "### `listFeaturedIssues() : async [FeaturedIssue]`\n" #
    "Returns the homepage featured-issue strip. Each entry carries `slug`,\n" #
    "`category`, `title`, `summary` and `heroImage`.\n\n" #
    "### `getSiteContent() : async SiteContent`\n" #
    "Returns the static site content: `siteName`, `tagline`, `introduction`, the\n" #
    "`whyThisMatters` story (`heading` plus `paragraphs`), and the `contactDetails`\n" #
    "placeholders (`createdBy`, `email`, `organisation`, `location`, `project`).\n\n" #
    "### `searchProblems(term : Text) : async [Problem]`\n" #
    "Free-text search across **both** Physical and Mental Wellbeing problems.\n" #
    "Matching is case-insensitive and covers the title, summary and section text,\n" #
    "plus a set of common synonyms (for example `\"insomnia\"` matches\n" #
    "`sleep-problems`, `\"burnout\"` matches `burnout`, `\"overweight\"` matches\n" #
    "`obesity`). An empty term returns an empty list.\n\n" #
    "## Contact endpoint\n\n" #
    "### `submitContact(name : Text, email : Text, message : Text) : async ContactResult`\n" #
    "Validates and stores a contact-form submission, then sends the message by\n" #
    "email to the site owner's fixed address. All three fields must be\n" #
    "present (non-blank after trimming) and the email must be well formed (exactly\n" #
    "one `@`, a non-empty local part, and a domain containing a dot with no spaces).\n\n" #
    "Returns `variant { ok = record { id : nat } }` on success, or\n" #
    "`variant { err = variant { missingName | missingEmail | missingMessage | invalidEmail } }`\n" #
    "on validation failure. The stored submission records the trimmed values and a\n" #
    "`submittedAt` timestamp in milliseconds since the Unix epoch.\n\n" #
    "Email delivery is best-effort and happens only after a successful store: a\n" #
    "delivery failure does not change the returned `#ok` result and never discards\n" #
    "the stored submission. The send is wrapped so that an error result **or** a\n" #
    "trap from the email/integrations service (for example when it is\n" #
    "unconfigured) is caught and swallowed; `submitContact` still returns `#ok`\n" #
    "with the stored submission. The email is sent from the `no-reply` sender with\n" #
    "the submitter's name, email and message in the body.\n\n" #
    "## AI Helper endpoint\n\n" #
    "### `askHelper(category : Category, question : Text, history : [ChatMessage]) : async ChatResult`\n" #
    "Returns an educational reply grounded in the site's own content for the given\n" #
    "category. `history` is the prior conversation as `{ role : variant { user; assistant }; content : Text }`\n" #
    "entries; pass `[]` for a first question.\n\n" #
    "Every reply is framed as general educational information only and does not\n" #
    "replace professional advice. The helper never presents itself as a doctor,\n" #
    "psychologist, therapist or emergency service, and never diagnoses or prescribes.\n\n" #
    "Returns `variant { ok = text }` on success, where the text already includes the\n" #
    "educational disclaimer, or `variant { err = variant { emptyQuestion | unavailable : text } }`.\n" #
    "`emptyQuestion` means the question was blank. `unavailable` means the inference\n" #
    "service could not be reached or returned no usable answer; the frontend may\n" #
    "retry.\n\n" #
    "## Data intelligence (OQL)\n\n" #
    "The canister exposes the Caffeine Object Query Layer through two additional\n" #
    "methods, `schema()` and `execute(queryJson)`, which let the Data Intelligence\n" #
    "agent answer natural-language questions over the stored data. They are\n" #
    "generated by the `caffeineai-oql` `Expose` mixin and are not part of the\n" #
    "frontend's own API surface.\n\n" #
    "### `schema() : async Text`\n" #
    "Returns a JSON description of the queryable entities and their fields.\n\n" #
    "### `execute(queryJson : Text) : async Text`\n" #
    "Runs a JSON query against the entities and returns the matching rows as JSON.\n\n" #
    "The registered entities are:\n\n" #
    "- `problem` (primary key `id`) — the problem catalogue. Columns include\n" #
    "  `id`, `slug`, `category` (`physical` / `mental`), `title`, `summary`,\n" #
    "  `heroImage`, `sectionCount` and `sourceCount`. Public.\n" #
    "- `example` (primary key `id`) — the real-life examples. Columns include\n" #
    "  `id`, `category`, `person`, `situation`, `problem`, `impact`, `journey`,\n" #
    "  plus the flattened source fields `organisation`, `title` and `url`. Public.\n" #
    "- `featuredIssue` (primary key `slug`) — the homepage featured strip.\n" #
    "  Columns: `slug`, `category`, `title`, `summary`, `heroImage`. Public.\n" #
    "- `siteContent` (primary key `siteName`) — the single static site-content\n" #
    "  row. Columns: `siteName`, `tagline`, `introduction`, `whyHeading`,\n" #
    "  `whyParagraphCount`, plus the flattened contact fields `createdBy`,\n" #
    "  `email`, `organisation`, `location` and `project`. Public.\n" #
    "- `contactSubmission` (primary key `id`) — stored contact-form submissions.\n" #
    "  Columns: `id`, `name`, `email`, `message`, `submittedAt`. Controller-only.\n\n" #
    "## Units and encodings\n\n" #
    "- `Timestamp` is milliseconds since the Unix epoch, as `Nat`.\n" #
    "- `Slug` is `Text` and is URL-safe.\n" #
    "- `Category` is the variant `{ #physical; #mental }`.\n" #
    "- `Source` is `{ organisation : Text; title : Text; url : Text }`.\n" #
    "- Optional values are Candid `opt`; absent values are `null`.\n\n" #
    "## Lifecycle and polling\n\n" #
    "- All read endpoints are `query` calls and return immediately.\n" #
    "- `submitContact` and `askHelper` are update calls. `askHelper` performs an\n" #
    "  HTTP outcall to Caffeine Inference and can take several seconds; show a\n" #
    "  pending state and offer a retry on `unavailable`.\n" #
    "- Seed data is loaded exactly once at initialisation and never changes at\n" #
    "  runtime.\n\n" #
    "## Mutation retry safety\n\n" #
    "- `submitContact` is **not** idempotent: each successful call stores a new\n" #
    "  submission with a fresh `id` and sends a new email. Retrying a submission\n" #
    "  after a timeout may create a duplicate and a duplicate email.\n" #
    "- `askHelper` is read-only with respect to canister state; retrying is safe.\n\n" #
    "## Errors, traps and limits\n\n" #
    "- `submitContact` returns validation errors as data, never as a trap.\n" #
    "- `askHelper` returns inference failures as `#err(#unavailable(...))`, never as\n" #
    "  a trap.\n" #
    "- `getProblem` returns `null` for an unknown slug rather than trapping.\n" #
    "- The AI Helper is educational only. For serious health concerns, users are\n" #
    "  encouraged to seek appropriate professional help.\n";
  };
};
