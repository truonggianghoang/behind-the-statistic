import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Compass } from "lucide-react";

export function NotFoundPage() {
  return (
    <section
      aria-labelledby="not-found-heading"
      data-ocid="not_found.page"
      className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Compass aria-hidden="true" className="size-8" />
      </span>
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">
        Page not found
      </p>
      <h1
        id="not-found-heading"
        className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
      >
        This page has moved on
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
        The link you followed may be broken or the topic may have been renamed.
        Let&apos;s get you back to something useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          asChild
          size="lg"
          data-ocid="not_found.home_button"
          className="h-12 rounded-full px-7 text-base hover:-translate-y-0.5"
        >
          <Link to="/">
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          data-ocid="not_found.issues_button"
          className="h-12 rounded-full border-border bg-background px-7 text-base hover:-translate-y-0.5"
        >
          <Link to="/issues">Browse the issues</Link>
        </Button>
      </div>
    </section>
  );
}
