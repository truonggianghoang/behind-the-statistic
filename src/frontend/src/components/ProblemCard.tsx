import type { Problem } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { categoryLabel, handleImageError } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface ProblemCardProps {
  problem: Problem;
  /** Optional editorial position label, e.g. "Lead story". */
  eyebrow?: string;
  /** Render the larger lead-story treatment. */
  featured?: boolean;
}

export function ProblemCard({
  problem,
  eyebrow,
  featured = false,
}: ProblemCardProps) {
  return (
    <article
      data-ocid={`category.problem_card.${problem.slug}`}
      className="group h-full"
    >
      <Link
        to="/issues/$category/$slug"
        params={{ category: problem.category, slug: problem.slug }}
        data-ocid={`category.problem_link.${problem.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated"
      >
        <div className="relative overflow-hidden">
          <img
            src={problem.heroImage}
            alt={`Illustration for the topic “${problem.title}”`}
            width={featured ? 1200 : 800}
            height={featured ? 675 : 500}
            loading="lazy"
            onError={handleImageError}
            className={
              featured
                ? "aspect-[16/9] w-full object-cover transition-smooth group-hover:scale-[1.03]"
                : "aspect-[4/3] w-full object-cover transition-smooth group-hover:scale-[1.03]"
            }
          />
          <Badge
            variant="outline"
            className="absolute left-4 top-4 rounded-full border-accent/30 bg-card/90 text-accent backdrop-blur"
          >
            {categoryLabel(problem.category)}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h3
            className={
              featured
                ? "mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl"
                : "mt-2 font-display text-xl font-bold leading-tight tracking-tight text-foreground"
            }
          >
            {problem.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {problem.summary}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-smooth group-hover:gap-2.5">
            Read the full story
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
