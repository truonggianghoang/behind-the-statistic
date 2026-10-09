import type { Category } from "@/backend";
import { ProblemSources } from "@/components/ProblemSources";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProblem, useProblems } from "@/hooks/use-backend";
import {
  CRISIS_NOTE,
  categoryLabel,
  categoryPath,
  handleImageError,
} from "@/lib/site";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  HeartHandshake,
  Info,
} from "lucide-react";

export function ProblemPage() {
  const { category, slug } = useParams({
    from: "/issues/$category/$slug",
  });
  const categoryKey = category as Category;
  const { data: problem, isLoading } = useProblem(slug);
  const { data: siblings } = useProblems(categoryKey);

  const related = (siblings ?? []).filter((item) => item.slug !== slug);

  if (isLoading) {
    return (
      <div
        data-ocid="problem.loading_state"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <Skeleton className="h-4 w-40 rounded-full" />
        <Skeleton className="mt-6 h-10 w-3/4" />
        <Skeleton className="mt-4 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-2/3" />
        <Skeleton className="mt-10 aspect-[16/9] w-full rounded-2xl" />
        <div className="mt-10 flex flex-col gap-3">
          {Array.from({ length: 5 }, (_, i) => `problem-skeleton-${i}`).map(
            (id) => (
              <Skeleton key={id} className="h-4 w-full" />
            ),
          )}
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <section
        aria-labelledby="problem-not-found-heading"
        data-ocid="problem.not_found_state"
        className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Compass aria-hidden="true" className="size-8" />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">
          Topic not found
        </p>
        <h1
          id="problem-not-found-heading"
          className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          We couldn&apos;t find that topic
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          The link may be out of date, or this topic may have been renamed.
          Let&apos;s get you back to the category you were exploring.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            data-ocid="problem.back_to_category_button"
            className="h-12 rounded-full px-7 text-base hover:-translate-y-0.5"
          >
            <Link to={categoryPath(categoryKey)}>
              <ArrowLeft className="size-4" />
              Back to {categoryLabel(categoryKey)}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            data-ocid="problem.browse_all_button"
            className="h-12 rounded-full border-border bg-background px-7 text-base hover:-translate-y-0.5"
          >
            <Link to="/issues">Browse all issues</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <article data-ocid="problem.page">
      <header
        data-ocid="problem.hero_section"
        className="border-b border-border bg-gradient-warm"
      >
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            data-ocid="problem.breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          >
            <Link
              to="/issues"
              data-ocid="problem.breadcrumb_issues_link"
              className="underline-offset-4 transition-smooth hover:text-primary hover:underline"
            >
              Understanding the Issues
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              to={categoryPath(problem.category)}
              data-ocid="problem.breadcrumb_category_link"
              className="underline-offset-4 transition-smooth hover:text-primary hover:underline"
            >
              {categoryLabel(problem.category)}
            </Link>
          </nav>

          <Badge
            variant="outline"
            data-ocid="problem.category_badge"
            className="mt-6 w-fit rounded-full border-accent/30 bg-accent/10 text-accent"
          >
            {categoryLabel(problem.category)}
          </Badge>

          <h1
            id="problem-heading"
            className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            {problem.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {problem.summary}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {problem.heroImage ? (
          <figure
            data-ocid="problem.hero_figure"
            className="-mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-elevated md:-mt-8"
          >
            <img
              src={problem.heroImage}
              alt={`Illustration for ${problem.title}`}
              width={1200}
              height={675}
              loading="eager"
              onError={handleImageError}
              className="aspect-[16/9] w-full object-cover"
            />
          </figure>
        ) : null}

        <div className="mt-12 flex flex-col gap-12 md:mt-16">
          {problem.sections.map((section, index) => (
            <section
              key={section.heading}
              data-ocid={`problem.section.${index + 1}`}
              aria-labelledby={`problem-section-${index + 1}`}
            >
              <h2
                id={`problem-section-${index + 1}`}
                className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.body
                  .split(/\n{2,}/)
                  .map((paragraph) => paragraph.trim())
                  .filter((paragraph) => paragraph.length > 0)
                  .map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-base leading-relaxed text-foreground/90 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <aside
          data-ocid="problem.crisis_note"
          className="mt-14 flex gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Info aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
              If this feels close to home
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {CRISIS_NOTE}
            </p>
          </div>
        </aside>

        <ProblemSources sources={problem.sources} />
      </div>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-heading"
          data-ocid="problem.related_section"
          className="mt-16 border-t border-border bg-muted/40"
        >
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
            <div className="flex items-center gap-2.5">
              <BookOpen
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <h2
                id="related-heading"
                className="font-display text-xl font-bold tracking-tight text-foreground"
              >
                More in {categoryLabel(problem.category)}
              </h2>
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    to="/issues/$category/$slug"
                    params={{ category: item.category, slug: item.slug }}
                    data-ocid={`problem.related_link.${item.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold tracking-tight text-foreground">
                        {item.title}
                      </span>
                      <span className="mt-1 block truncate text-sm text-muted-foreground">
                        {item.summary}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground transition-smooth group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={categoryPath(problem.category)}
              data-ocid="problem.back_to_category_link"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-smooth hover:gap-2.5 hover:underline"
            >
              <ArrowLeft className="size-4" />
              Back to {categoryLabel(problem.category)}
            </Link>
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
          <Link
            to={categoryPath(problem.category)}
            data-ocid="problem.back_to_category_link"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-smooth hover:gap-2.5 hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to {categoryLabel(problem.category)}
          </Link>
        </div>
      )}

      <section
        aria-labelledby="problem-closing-heading"
        data-ocid="problem.closing_section"
        className="mx-auto max-w-3xl px-4 pb-20 pt-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <HeartHandshake aria-hidden="true" className="size-5" />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Understanding is the first step. Sharing it is the next.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            data-ocid="problem.get_in_touch_button"
            className="h-11 shrink-0 rounded-full px-6 text-sm hover:-translate-y-0.5"
          >
            <Link to="/get-in-touch">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
