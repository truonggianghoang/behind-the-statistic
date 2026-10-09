import type { Source } from "@/backend";
import { ExternalLink, Library } from "lucide-react";

interface ProblemSourcesProps {
  sources: Source[];
}

export function ProblemSources({ sources }: ProblemSourcesProps) {
  if (sources.length === 0) return null;

  return (
    <section
      aria-labelledby="sources-heading"
      data-ocid="problem.sources_section"
      className="mt-14 border-t border-border pt-8"
    >
      <div className="flex items-center gap-2.5">
        <Library aria-hidden="true" className="size-4 text-muted-foreground" />
        <h2
          id="sources-heading"
          className="font-display text-lg font-bold tracking-tight text-foreground"
        >
          Reliable sources
        </h2>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        The organisations below informed this article. They are listed for
        reference and further reading.
      </p>
      <ol className="mt-5 flex flex-col gap-3">
        {sources.map((source, index) => (
          <li
            key={`${source.organisation}-${source.url}`}
            data-ocid={`problem.source_item.${index + 1}`}
            className="flex flex-col gap-0.5 rounded-lg border border-border bg-muted/30 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-2"
          >
            <span className="text-sm font-semibold text-foreground">
              {source.organisation}
            </span>
            <span
              aria-hidden="true"
              className="hidden text-muted-foreground sm:inline"
            >
              ·
            </span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`problem.source_link.${index + 1}`}
              className="group inline-flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-smooth hover:text-primary hover:decoration-primary"
            >
              <span className="min-w-0 break-words">{source.title}</span>
              <ExternalLink
                aria-hidden="true"
                className="size-3.5 shrink-0 opacity-70 transition-smooth group-hover:opacity-100"
              />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
