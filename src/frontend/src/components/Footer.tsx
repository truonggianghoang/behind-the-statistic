import {
  CRISIS_NOTE,
  EDUCATIONAL_DISCLAIMER,
  NAV_ITEMS,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="max-w-md">
            <p className="font-display text-xl font-bold tracking-tight text-foreground">
              {SITE_NAME}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{SITE_TAGLINE}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {EDUCATIONAL_DISCLAIMER}
            </p>
          </div>

          <nav aria-label="Footer" className="md:justify-self-end">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    data-ocid={`footer.${item.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                    className="text-sm text-foreground/80 underline-offset-4 transition-smooth hover:text-primary hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex gap-3 rounded-2xl border border-accent/25 bg-accent/5 p-5">
          <HeartHandshake
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-accent"
          />
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              A note on support
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {CRISIS_NOTE}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground/80 underline-offset-4 transition-smooth hover:text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
