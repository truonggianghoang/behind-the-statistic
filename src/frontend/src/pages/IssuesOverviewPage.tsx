import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProblems } from "@/hooks/use-backend";
import { CATEGORIES, categoryLabel, problemPath } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, HeartHandshake, Mail } from "lucide-react";

const SECTION_LINKS = [
  {
    to: "/why-this-matters",
    icon: HeartHandshake,
    title: "Why This Matters",
    description: "The purpose behind this project and the people it is for.",
  },
  {
    to: "/get-in-touch",
    icon: Mail,
    title: "Get in Touch",
    description: "Share feedback, ask a question or suggest a topic.",
  },
] as const;

export function IssuesOverviewPage() {
  const { data: problems, isLoading } = useProblems(null);

  return (
    <>
      <section
        aria-labelledby="issues-heading"
        data-ocid="issues.hero_section"
        className="border-b border-border bg-gradient-warm"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Understanding the Issues
          </p>
          <h1
            id="issues-heading"
            className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl"
          >
            Two sides of the same person
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Physical and mental wellbeing are not separate stories. Explore each
            category to find clear explanations, real-life examples and the
            sources behind them.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="categories-heading"
        data-ocid="issues.categories_section"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        <h2 id="categories-heading" className="sr-only">
          Categories
        </h2>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {CATEGORIES.map((category) => {
            const items = (problems ?? []).filter(
              (problem) => problem.category === category.key,
            );
            return (
              <Card
                key={category.key}
                data-ocid={`issues.category_card.${category.key}`}
                className="rounded-2xl border-border bg-card shadow-subtle transition-smooth hover:shadow-elevated"
              >
                <CardContent className="flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <BookOpen aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {category.label}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {category.blurb}
                  </p>

                  <div className="mt-6 flex-1">
                    {isLoading ? (
                      <div className="flex flex-col gap-2">
                        {Array.from(
                          { length: 3 },
                          (_, i) => `cat-skeleton-${category.key}-${i}`,
                        ).map((id) => (
                          <Skeleton
                            key={id}
                            className="h-10 w-full rounded-lg"
                          />
                        ))}
                      </div>
                    ) : items.length > 0 ? (
                      <ul className="flex flex-col gap-2">
                        {items.map((problem) => (
                          <li key={problem.slug}>
                            <Link
                              to="/issues/$category/$slug"
                              params={{
                                category: problem.category,
                                slug: problem.slug,
                              }}
                              data-ocid={`issues.problem_link.${problem.slug}`}
                              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-smooth hover:border-primary/40 hover:bg-muted/60"
                            >
                              <span className="min-w-0 truncate font-medium text-foreground">
                                {problem.title}
                              </span>
                              <ArrowRight
                                aria-hidden="true"
                                className="size-4 shrink-0 text-muted-foreground"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        data-ocid={`issues.category_empty_state.${category.key}`}
                        className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
                      >
                        Topics for this category are being prepared.
                      </p>
                    )}
                  </div>

                  <Link
                    to={category.path}
                    data-ocid={`issues.category_open_link.${category.key}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-smooth hover:gap-2.5 hover:underline"
                  >
                    Explore {category.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="more-heading"
        data-ocid="issues.more_section"
        className="border-t border-border bg-muted/40"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <h2
            id="more-heading"
            className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          >
            Keep exploring
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {SECTION_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`issues.more_link.${link.to.replace(/\//g, "")}`}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold tracking-tight text-foreground">
                      {link.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {link.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
