import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ArticleSection {
    body: string;
    heading: string;
}
export interface Cell {
    value: Value;
    name: string;
}
export type ChatError = {
    __kind__: "emptyQuestion";
    emptyQuestion: null;
} | {
    __kind__: "unavailable";
    unavailable: string;
};
export interface ChatMessage {
    content: string;
    role: Variant_user_assistant;
}
export type ChatResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: ChatError;
};
export interface ContactDetails {
    createdBy: string;
    email: string;
    location: string;
    organisation: string;
    project: string;
}
export type ContactResult = {
    __kind__: "ok";
    ok: {
        id: bigint;
    };
} | {
    __kind__: "err";
    err: ContactError;
};
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface FeaturedIssue {
    title: string;
    slug: Slug;
    heroImage: string;
    summary: string;
    category: Category;
}
export interface Problem {
    id: bigint;
    title: string;
    slug: Slug;
    heroImage: string;
    summary: string;
    category: Category;
    sources: Array<Source>;
    sections: Array<ArticleSection>;
}
export interface RealLifeExample {
    id: bigint;
    impact: string;
    source: Source;
    person: string;
    journey: string;
    category: Category;
    problem: string;
    situation: string;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface SiteContent {
    tagline: string;
    siteName: string;
    introduction: string;
    whyThisMatters: WhyThisMatters;
    contactDetails: ContactDetails;
}
export type Slug = string;
export interface Source {
    url: string;
    title: string;
    organisation: string;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface WhyThisMatters {
    paragraphs: Array<string>;
    heading: string;
}
export enum Category {
    mental = "mental",
    physical = "physical"
}
export enum ContactError {
    invalidEmail = "invalidEmail",
    missingEmail = "missingEmail",
    missingName = "missingName",
    missingMessage = "missingMessage"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_user_assistant {
    user = "user",
    assistant = "assistant"
}
export interface backendInterface {
    /**
     * / Educational AI Helper reply for a category, grounded in site content.
     */
    askHelper(category: Category, question: string, history: Array<ChatMessage>): Promise<ChatResult>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    execute(qJson: string): Promise<Result>;
    /**
     * / Static Markdown documentation of the backend's public API.
     */
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / A single problem by its stable slug.
     */
    getProblem(slug: Slug): Promise<Problem | null>;
    /**
     * / Static site content: story and contact placeholders.
     */
    getSiteContent(): Promise<SiteContent>;
    isCallerAdmin(): Promise<boolean>;
    /**
     * / Real-life examples for a category.
     */
    listExamples(category: Category): Promise<Array<RealLifeExample>>;
    /**
     * / Homepage featured-issue strip.
     */
    listFeaturedIssues(): Promise<Array<FeaturedIssue>>;
    /**
     * / Full problem catalogue, optionally filtered by category.
     */
    listProblems(category: Category | null): Promise<Array<Problem>>;
    schema(): Promise<string>;
    /**
     * / Free-text search across both Physical and Mental Wellbeing problems.
     */
    searchProblems(term: string): Promise<Array<Problem>>;
    /**
     * / Validate and store a contact-form submission, then deliver it by email to
     * / the site owner. Email delivery is best-effort: a delivery failure never
     * / discards an already-stored submission.
     */
    submitContact(name: string, email: string, message: string): Promise<ContactResult>;
}
