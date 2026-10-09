import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchProblems } from "@/hooks/use-backend";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useId, useState } from "react";

const SUGGESTIONS = [
  "Anxiety",
  "Obesity",
  "Loneliness",
  "Sleep problems",
  "Stress",
];

export function QuickSearch() {
  const navigate = useNavigate();
  const inputId = useId();
  const [term, setTerm] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { data: results, isFetching } = useSearchProblems(submitted);

  function runSearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      setMessage("Type a topic to search, for example “anxiety” or “sleep”.");
      return;
    }
    setMessage(null);
    setSubmitted(trimmed);
  }

  // Route straight to the best match as soon as results arrive. The backend
  // returns the closest matches first, so the head of the list is the best
  // match. When nothing matches we stay on the page and show a friendly state.
  useEffect(() => {
    if (!submitted || isFetching) return;
    const best = results?.[0];
    if (!best) return;
    navigate({
      to: "/issues/$category/$slug",
      params: { category: best.category, slug: best.slug },
    });
  }, [submitted, isFetching, results, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runSearch(term);
  }

  function handleSuggestion(value: string) {
    setTerm(value);
    runSearch(value);
  }

  const hasSearched = submitted.length > 0 && !isFetching;
  const noResults = hasSearched && (results?.length ?? 0) === 0;

  return (
    <section
      aria-labelledby="quick-search-heading"
      data-ocid="search.section"
      className="relative z-10 mx-auto -mt-8 w-full max-w-3xl px-4 sm:px-6"
    >
      <div className="rounded-2xl border border-border bg-card p-5 shadow-elevated sm:p-6">
        <h2
          id="quick-search-heading"
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Find a topic
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-3 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor={inputId} className="sr-only">
            Search wellbeing topics
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id={inputId}
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search a topic — anxiety, loneliness, sleep…"
              data-ocid="search.input"
              className="h-12 rounded-full pl-10 text-base"
            />
          </div>
          <Button
            type="submit"
            data-ocid="search.submit_button"
            className="h-12 rounded-full px-6 text-base hover:-translate-y-0.5"
          >
            Search
          </Button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Popular:</span>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestion(suggestion)}
              data-ocid={`search.suggestion.${suggestion.toLowerCase().replace(/\s+/g, "_")}`}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80 transition-smooth hover:border-accent/40 hover:text-accent"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-4">
          {message ? (
            <p
              data-ocid="search.error_state"
              className="text-sm text-muted-foreground"
            >
              {message}
            </p>
          ) : null}

          {isFetching ? (
            <p
              data-ocid="search.loading_state"
              className="text-sm text-muted-foreground"
            >
              Searching…
            </p>
          ) : null}

          {noResults ? (
            <p
              data-ocid="search.empty_state"
              className="text-sm text-muted-foreground"
            >
              We couldn&apos;t find a topic matching “{submitted}”. Try another
              word, or browse{" "}
              <a
                href="/issues"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                all issues
              </a>
              .
            </p>
          ) : null}

          {hasSearched && (results?.length ?? 0) > 0 ? (
            <ul data-ocid="search.results_list" className="flex flex-col gap-2">
              {results?.map((problem) => (
                <li key={problem.slug}>
                  <button
                    type="button"
                    onClick={() =>
                      navigate({
                        to: "/issues/$category/$slug",
                        params: {
                          category: problem.category,
                          slug: problem.slug,
                        },
                      })
                    }
                    data-ocid={`search.result.${problem.slug}`}
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-smooth hover:border-primary/40 hover:bg-muted/60"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-foreground">
                        {problem.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {problem.summary}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-accent">
                      Open
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
