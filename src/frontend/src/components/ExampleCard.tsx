import type { RealLifeExample } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

interface ExampleCardProps {
  example: RealLifeExample;
  /** Zero-based position, used for stable deterministic markers. */
  index: number;
}

export function ExampleCard({ example, index }: ExampleCardProps) {
  return (
    <article
      data-ocid={`examples.card.${index + 1}`}
      className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated md:p-8"
    >
      <Quote aria-hidden="true" className="size-7 text-accent/70" />

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-bold text-primary">
          {example.person.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="font-display text-lg font-bold tracking-tight text-foreground">
            {example.person}
          </p>
          <p className="text-xs text-muted-foreground">A real-life account</p>
        </div>
      </div>

      <Badge
        variant="outline"
        className="mt-5 w-fit rounded-full border-accent/30 bg-accent/10 text-accent"
      >
        {example.problem}
      </Badge>

      <dl className="mt-6 flex flex-1 flex-col gap-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Their situation
          </dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90">
            {example.situation}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How it affected their life
          </dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90">
            {example.impact}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Their journey
          </dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90">
            {example.journey}
          </dd>
        </div>
      </dl>

      <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground/80">Source: </span>
        {example.source.url ? (
          <a
            href={example.source.url}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 transition-smooth hover:text-primary hover:underline"
          >
            {example.source.organisation} — {example.source.title}
          </a>
        ) : (
          <span>
            {example.source.organisation} — {example.source.title}
          </span>
        )}
      </p>
    </article>
  );
}
