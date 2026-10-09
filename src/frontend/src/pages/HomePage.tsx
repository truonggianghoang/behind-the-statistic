import { QuickSearch } from "@/components/QuickSearch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedIssues, useSiteContent } from "@/hooks/use-backend";
import {
  HERO_IMAGE,
  HERO_IMAGE_ALT,
  SITE_NAME,
  SITE_TAGLINE,
  categoryLabel,
  problemPath,
} from "@/lib/site";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  Mail,
  Sparkles,
} from "lucide-react";

const NAV_CARDS = [
  {
    to: "/issues",
    icon: BookOpen,
    title: "Understanding the Issues",
    description:
      "Plain-language explanations of physical and mental wellbeing, with real-life examples and cited sources.",
  },
  {
    to: "/why-this-matters",
    icon: HeartHandshake,
    title: "Why This Matters",
    description:
      "The story behind this project and why turning statistics back into people changes how we respond.",
  },
  {
    to: "/get-in-touch",
    icon: Mail,
    title: "Get in Touch",
    description:
      "Questions, feedback or a story to share? Reach out and help this resource grow with care.",
  },
] as const;

export function HomePage() {
  const { data: content } = useSiteContent();
  const { data: featured, isLoading } = useFeaturedIssues();

  const siteName = content?.siteName || SITE_NAME;
  const tagline = content?.tagline || SITE_TAGLINE;
  const introduction =
    content?.introduction ||
    "Every number in a report is a person with a life, a history and a reason. This site slows the statistics down and looks at the human beings behind them — with honesty, warmth and no judgement.";

  return (
    <>
      <section
        aria-labelledby="hero-heading"
        data-ocid="home.hero_section"
        className="relative overflow-hidden bg-gradient-warm"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/10 blur-3xl motion-safe:animate-float"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 pt-16 sm:px-6 md:grid-cols-2 md:pt-20 lg:px-8">
          <div className="motion-safe:animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Public awareness, told with care
            </p>
            <h1
              id="hero-heading"
              className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl"
            >
              {siteName}
            </h1>
            <p className="mt-5 font-display text-xl italic text-primary md:text-2xl">
              {tagline}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {introduction}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                data-ocid="home.explore_issues_button"
                className="h-12 rounded-full px-7 text-base hover:-translate-y-0.5"
              >
                <Link to="/issues">
                  Explore the Issues
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                data-ocid="home.why_matters_button"
                className="h-12 rounded-full border-border bg-card px-7 text-base hover:-translate-y-0.5"
              >
                <Link to="/why-this-matters">Why This Matters</Link>
              </Button>
            </div>
          </div>

          <div className="relative motion-safe:animate-fade-up">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
              <img
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                width={1200}
                height={900}
                loading="eager"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-subtle sm:flex">
              <Sparkles aria-hidden="true" className="size-4 text-accent" />
              <span className="text-xs font-medium text-foreground">
                Real stories, not just numbers
              </span>
            </div>
          </div>
        </div>
      </section>

      <QuickSearch />

      <section
        aria-labelledby="explore-heading"
        data-ocid="home.nav_cards_section"
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="max-w-2xl">
          <h2
            id="explore-heading"
            className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Where would you like to begin?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Three ways into the same idea: that understanding people is the
            first step toward understanding the problem.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {NAV_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.to}
                data-ocid={`home.nav_card.${card.to.replace(/\//g, "")}`}
                className="group rounded-2xl border-border bg-card shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated"
              >
                <CardContent className="flex h-full flex-col gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                  <Link
                    to={card.to}
                    data-ocid={`home.nav_card_link.${card.to.replace(/\//g, "")}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-smooth group-hover:gap-2.5 hover:underline"
                  >
                    Open
                    <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="featured-heading"
        data-ocid="home.featured_section"
        className="border-y border-border bg-muted/40 grain"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Featured issues
              </p>
              <h2
                id="featured-heading"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
              >
                Start with what people search for most
              </h2>
            </div>
            <Link
              to="/issues"
              data-ocid="home.view_all_issues_link"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-smooth hover:gap-2.5 hover:underline"
            >
              View all issues
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from(
                  { length: 4 },
                  (_, i) => `featured-skeleton-${i}`,
                ).map((id) => (
                  <div
                    key={id}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="mt-4 h-6 w-3/4" />
                    <Skeleton className="mt-3 h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-2/3" />
                  </div>
                ))
              : (featured ?? []).map((issue) => (
                  <Link
                    key={issue.slug}
                    to="/issues/$category/$slug"
                    params={{ category: issue.category, slug: issue.slug }}
                    data-ocid={`home.featured_card.${issue.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated"
                  >
                    <Badge
                      variant="outline"
                      className="w-fit rounded-full border-accent/30 bg-accent/10 text-accent"
                    >
                      {categoryLabel(issue.category)}
                    </Badge>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
                      {issue.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {issue.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-smooth group-hover:gap-2.5">
                      Read more
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                ))}
          </div>

          {!isLoading && (featured?.length ?? 0) === 0 ? (
            <p
              data-ocid="home.featured_empty_state"
              className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 p-6 text-sm text-muted-foreground"
            >
              Featured topics are being prepared. In the meantime,{" "}
              <Link
                to="/issues"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                browse the full catalogue
              </Link>
              .
            </p>
          ) : null}
        </div>
      </section>

      <section
        aria-labelledby="closing-heading"
        data-ocid="home.closing_section"
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="rounded-3xl border border-border bg-card p-8 shadow-subtle md:p-12">
          <div className="max-w-2xl">
            <h2
              id="closing-heading"
              className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              Behind every statistic is someone you might know
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Understanding is not about pity. It is about recognising the
              person in the number — and responding with the same care we would
              want for ourselves.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                data-ocid="home.closing_explore_button"
                className="h-12 rounded-full px-7 text-base hover:-translate-y-0.5"
              >
                <Link to="/issues">Explore the Issues</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                data-ocid="home.closing_contact_button"
                className="h-12 rounded-full border-border bg-background px-7 text-base hover:-translate-y-0.5"
              >
                <Link to="/get-in-touch">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
