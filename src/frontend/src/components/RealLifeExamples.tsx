import type { Category } from "@/backend";
import { ExampleCard } from "@/components/ExampleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useExamples } from "@/hooks/use-backend";
import { categoryLabel } from "@/lib/site";
import { HeartHandshake } from "lucide-react";

interface RealLifeExamplesProps {
  category: Category;
}

export function RealLifeExamples({ category }: RealLifeExamplesProps) {
  const { data: examples, isLoading } = useExamples(category);
  const items = examples ?? [];

  return (
    <section
      aria-labelledby="examples-heading"
      data-ocid="examples.section"
      className="border-y border-border bg-muted/40 grain"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <HeartHandshake aria-hidden="true" className="size-4" />
            Real-Life Examples
          </p>
          <h2
            id="examples-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Behind every statistic is a real person
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            These accounts are shared with care and without sensation. They
            describe what {categoryLabel(category).toLowerCase()} struggles can
            look like in an ordinary life — and how people find their way
            through.
          </p>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {Array.from({ length: 2 }, (_, i) => `example-skeleton-${i}`).map(
                (id) => (
                  <div
                    key={id}
                    className="rounded-2xl border border-border bg-card p-6 md:p-8"
                  >
                    <Skeleton className="size-7 rounded-md" />
                    <div className="mt-5 flex items-center gap-3">
                      <Skeleton className="size-11 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="mt-2 h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="mt-5 h-6 w-28 rounded-full" />
                    <Skeleton className="mt-6 h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-5/6" />
                    <Skeleton className="mt-2 h-4 w-4/6" />
                  </div>
                ),
              )}
            </div>
          ) : items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {items.map((example, index) => (
                <ExampleCard
                  key={example.id.toString()}
                  example={example}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <p
              data-ocid="examples.empty_state"
              className="rounded-2xl border border-dashed border-border bg-card/60 p-6 text-sm text-muted-foreground"
            >
              Real-life accounts for this category are being prepared with the
              care they deserve. In the meantime, explore the information
              section above.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
