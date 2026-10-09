import type {
  Category,
  ChatMessage,
  ChatResult,
  ContactResult,
  FeaturedIssue,
  Problem,
  RealLifeExample,
  SiteContent,
} from "@/backend";
import { Category as CategoryEnum } from "@/backend";
import type { backendInterface } from "@/backend";

export const SITE_CONTENT: SiteContent = {
  siteName: "Behind the Statistic",
  tagline: "Real people. Real struggles. Real understanding.",
  introduction:
    "Behind every statistic is a real person. This website explores the physical and mental wellbeing problems that affect people around us.",
  whyThisMatters: {
    heading: "Why This Matters",
    paragraphs: [
      "This project began as part of a Duke of Edinburgh's Bronze Award.",
      "Around us, people struggle with their physical and mental health in ways that are easy to overlook.",
    ],
  },
  contactDetails: {
    createdBy: "[Your Name]",
    email: "[Your Email]",
    organisation: "[School / Organisation — optional]",
    location: "[Location — optional]",
    project: "Duke of Edinburgh's Bronze Award",
  },
};

function makeProblem(
  overrides: Partial<Problem> & Pick<Problem, "slug" | "title" | "category">,
): Problem {
  return {
    id: 0n,
    heroImage: "/images/problems/placeholder.jpg",
    summary: `A summary of ${overrides.title}.`,
    sections: [
      { heading: "What is it?", body: "An explanation." },
      { heading: "Why does it matter?", body: "It matters a great deal." },
      {
        heading: "Causes / contributing factors",
        body: "There is no single cause.",
      },
      { heading: "Effects", body: "It affects many parts of life." },
      { heading: "Who can be affected?", body: "Anyone can be affected." },
      {
        heading: "Impact on everyday life",
        body: "It can shape ordinary days.",
      },
      { heading: "What can help?", body: "Support and small steps help." },
      {
        heading: "How can others support someone experiencing it?",
        body: "Listen without judgement.",
      },
    ],
    sources: [
      {
        organisation: "World Health Organization",
        title: "Reference",
        url: "https://www.who.int/",
      },
    ],
    ...overrides,
  };
}

export const ANXIETY = makeProblem({
  id: 6n,
  slug: "anxiety",
  title: "Anxiety",
  category: CategoryEnum.mental,
});

export const OBESITY = makeProblem({
  id: 0n,
  slug: "obesity",
  title: "Obesity",
  category: CategoryEnum.physical,
});

export const PROBLEMS: Problem[] = [OBESITY, ANXIETY];

export const FEATURED: FeaturedIssue[] = [
  {
    slug: "anxiety",
    category: CategoryEnum.mental,
    title: "Anxiety",
    summary: "When worry stops being occasional.",
    heroImage: "/images/problems/anxiety.jpg",
  },
  {
    slug: "obesity",
    category: CategoryEnum.physical,
    title: "Obesity",
    summary: "A complex condition.",
    heroImage: "/images/problems/obesity.jpg",
  },
];

export const EXAMPLES: RealLifeExample[] = [
  {
    id: 0n,
    category: CategoryEnum.mental,
    person: "A young person supported by a charity",
    situation:
      "Constant comparison left them feeling their life was not good enough.",
    problem: "Social media & self-esteem",
    impact: "They withdrew from friends and slept poorly.",
    journey:
      "With support, they reduced their time online and rebuilt offline interests.",
    source: {
      organisation: "Mind",
      title: "Social media and mental health",
      url: "https://www.mind.org.uk/",
    },
  },
];

export interface ActorMockOptions {
  siteContent?: SiteContent;
  problems?: Problem[];
  featured?: FeaturedIssue[];
  examples?: RealLifeExample[];
  search?: (term: string) => Problem[];
  askHelper?: (
    category: Category,
    question: string,
    history: ChatMessage[],
  ) => ChatResult;
  submitContact?: (
    name: string,
    email: string,
    message: string,
  ) => ContactResult;
}

/**
 * A typed local actor mock. It implements the generated `backendInterface` so
 * the frontend consumer contract is checked at compile time, and every method
 * resolves locally with no network.
 */
export function createActorMock(
  options: ActorMockOptions = {},
): backendInterface {
  const problems = options.problems ?? PROBLEMS;
  const search =
    options.search ??
    ((term: string) => {
      const t = term.trim().toLowerCase();
      if (!t) return [];
      return problems.filter(
        (p) =>
          p.title.toLowerCase().includes(t) ||
          p.slug.toLowerCase().includes(t) ||
          p.summary.toLowerCase().includes(t),
      );
    });

  return {
    _initialize_access_control: async () => undefined,
    _internet_identity_sign_in_finish: async () => ({
      __kind__: "ok",
      ok: null,
    }),
    _internet_identity_sign_in_start: async () => new Uint8Array(),
    askHelper: async (category, question, history) =>
      options.askHelper
        ? options.askHelper(category, question, history)
        : {
            __kind__: "ok",
            ok: `Here is an educational answer about ${question}.\n\nThis is general educational information only and does not replace professional advice.`,
          },
    assignCallerUserRole: async () => undefined,
    execute: async () => ({ hasMore: false, rows: [] }),
    getApiDoc: async () => "# API",
    getCallerUserRole: async () => "guest" as never,
    getProblem: async (slug) => problems.find((p) => p.slug === slug) ?? null,
    getSiteContent: async () => options.siteContent ?? SITE_CONTENT,
    isCallerAdmin: async () => false,
    listExamples: async (category) =>
      (options.examples ?? EXAMPLES).filter((e) => e.category === category),
    listFeaturedIssues: async () => options.featured ?? FEATURED,
    listProblems: async (category) =>
      category === null
        ? problems
        : problems.filter((p) => p.category === category),
    schema: async () => "{}",
    searchProblems: async (term) => search(term),
    submitContact: async (name, email, message) =>
      options.submitContact
        ? options.submitContact(name, email, message)
        : { __kind__: "ok", ok: { id: 1n } },
  };
}
