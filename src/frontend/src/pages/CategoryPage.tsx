import { type Category, Category as CategoryEnum } from "@/backend";
import { AiHelper } from "@/components/AiHelper";
import { ProblemCard } from "@/components/ProblemCard";
import { RealLifeExamples } from "@/components/RealLifeExamples";
import { Skeleton } from "@/components/ui/skeleton";
import { useProblems } from "@/hooks/use-backend";
import { CATEGORIES, categoryLabel } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass } from "lucide-react";

interface CategoryPageProps {
  category: Category;
}

const CATEGORY_INTROS: Record<Category, string> = {
  [CategoryEnum.physical]:
    "The body keeps a record of how we live. Sleep, movement, weight and energy are not separate problems — they are signals worth understanding without blame or shame.",
  [CategoryEnum.mental]:
    "The mind carries what life asks of it. Anxiety, loneliness, low mood and stress are common human experiences, and understanding them is the first step toward responding with care.",
};

export function CategoryPage({ category }: CategoryPageProps) {
  const { data: problems, isLoading } = useProblems(category);
  const items = problems ?? [];
  const meta = CATEGORIES.find((entry) => entry.key === category);
  const other = CATEGORIES.find((entry) => entry.key !== category);

  return (
    <>
      <section
        aria-labelledby="category-heading"
        data-ocid="category.hero_section"
        className="border-b border-border bg-gradient-warm"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-muted-foreground"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  to="/issues"
                  data-ocid="category.breadcrumb_link"
                  className="underline-offset-4 transition-smooth hover:text-primary hover:underline"
                >
                  Understanding the Issues
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-foreground">
                {categoryLabel(category)}
              </li>
            </ol>
          </nav>

          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">
            {categoryLabel(category)}
          </p>
          <h1
            id="category-heading"
            className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl"
          >
            {categoryLabel(category)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {CATEGORY_INTROS[category]}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#information"
              data-ocid="category.jump_information_link"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-smooth hover:-translate-y-0.5"
            >
              <BookOpen aria-hidden="true" className="size-4" />
              Read the information
            </a>
            <a
              href="#ai-helper"
              data-ocid="category.jump_helper_link"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-smooth hover:-translate-y-0.5"
            >
              <Compass aria-hidden="true" className="size-4" />
              Ask the AI Helper
            </a>
          </div>
        </div>
      </section>

      <section
        id="information"
        aria-labelledby="information-heading"
        data-ocid="category.information_section"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Information
            </p>
            <h2
              id="information-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              {meta?.blurb ? "What this section covers" : "The topics"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {meta?.blurb}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading topics…"
              : `${items.length} ${items.length === 1 ? "topic" : "topics"}`}
          </p>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {Array.from({ length: 6 }, (_, i) => `problem-skeleton-${i}`).map(
                (id) => (
                  <div
                    key={id}
                    className="overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <Skeleton className="aspect-[4/3] w-full rounded-none" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="mt-3 h-4 w-full" />
                      <Skeleton className="mt-2 h-4 w-5/6" />
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {items.map((problem, index) => (
                <ProblemCard
                  key={problem.slug}
                  problem={problem}
                  eyebrow={index === 0 ? "Lead story" : undefined}
                  featured={index === 0}
                />
              ))}
            </div>
          ) : (
            <p
              data-ocid="category.information_empty_state"
              className="rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-sm text-muted-foreground"
            >
              Topics for this category are being prepared. In the meantime,{" "}
              <Link
                to="/issues"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                browse all issues
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      <div id="ai-helper" className="scroll-mt-20">
        <AiHelper category={category} />
      </div>

      <RealLifeExamples category={category} />

      {other ? (
        <section
          aria-labelledby="other-category-heading"
          data-ocid="category.other_section"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-card p-8 shadow-subtle md:p-10">
            <div className="max-w-xl">
              <h2
                id="other-category-heading"
                className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                Continue with {other.label}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Physical and mental wellbeing are two sides of the same person.
                Explore the other category to see how they connect.
              </p>
            </div>
            <Link
              to={other.path}
              data-ocid="category.other_link"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-smooth hover:-translate-y-0.5"
            >
              Explore {other.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
