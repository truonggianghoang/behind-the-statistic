import { Category } from "@/backend";

export const SITE_NAME = "Behind the Statistic";
export const SITE_TAGLINE = "Real people. Real struggles. Real understanding.";

export const HERO_IMAGE =
  "/assets/generated/hero-conversation.dim_1200x900.jpg";
export const HERO_IMAGE_ALT =
  "A small, diverse group of adults seated in a circle in a sunlit community room, listening attentively as one person speaks.";

/** Shown whenever a content image is missing or fails to load. */
export const FALLBACK_IMAGE = "/assets/images/placeholder.svg";

/**
 * Swap a broken image for the shared placeholder exactly once, so a missing
 * asset never renders the browser's broken-image icon.
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
): void {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = FALLBACK_IMAGE;
}

export interface NavItem {
  label: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Understanding the Issues", to: "/issues" },
  { label: "Why This Matters", to: "/why-this-matters" },
  { label: "Get in Touch", to: "/get-in-touch" },
];

export interface CategoryMeta {
  key: Category;
  label: string;
  path: string;
  blurb: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    key: Category.physical,
    label: "Physical Wellbeing",
    path: "/issues/physical",
    blurb:
      "How the body carries strain — sleep, weight, energy and the everyday habits that shape long-term health.",
  },
  {
    key: Category.mental,
    label: "Mental Wellbeing",
    path: "/issues/mental",
    blurb:
      "How the mind responds to pressure — anxiety, loneliness, low mood and the quiet weight of stress.",
  },
];

export function categoryLabel(category: Category): string {
  return category === Category.mental
    ? "Mental Wellbeing"
    : "Physical Wellbeing";
}

export function categoryPath(category: Category): string {
  return category === Category.mental ? "/issues/mental" : "/issues/physical";
}

export function problemPath(category: Category, slug: string): string {
  return `/issues/${category}/${slug}`;
}

export const CRISIS_NOTE =
  "If you or someone you know is in crisis, please reach out to a qualified professional or a local emergency service right away. This site offers general educational information only and is not a substitute for professional care.";

export const EDUCATIONAL_DISCLAIMER =
  "Behind the Statistic is an educational resource. It does not provide medical advice, diagnosis or treatment, and it never replaces a conversation with a qualified professional.";
