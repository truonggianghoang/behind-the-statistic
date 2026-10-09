import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSiteContent } from "@/hooks/use-backend";
import { SITE_NAME } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Quote } from "lucide-react";

const FALLBACK_HEADING = "Why this project exists";

const FALLBACK_PARAGRAPHS = [
  "This site began as part of a Duke of Edinburgh's Bronze Award project, but the reason it exists goes well beyond the award itself. The award gave the idea a starting point and a deadline; the subject gave it a purpose that kept growing.",
  "Many problems go unnoticed, not because people do not care, but because they are easy to look past. Someone can be struggling quietly while the people around them see only the ordinary surface of a day. That gap between how things look and how they feel is where misunderstanding grows.",
  "Statistics are useful. They show the scale of a problem and prove that it is real and shared. But a number cannot show what it is like to live with something, or why a person might not ask for help. Stories do that. They turn a figure back into a person with a name, a history and a reason.",
  "That is what this site is for: awareness, empathy, understanding and conversation. Not to diagnose, not to alarm, and not to pretend there are simple answers — but to make it a little easier to notice, to listen and to talk honestly about wellbeing.",
];

export function WhyThisMattersPage() {
  const { data: content, isLoading } = useSiteContent();

  const heading = content?.whyThisMatters?.heading || FALLBACK_HEADING;
  const paragraphs =
    content?.whyThisMatters?.paragraphs &&
    content.whyThisMatters.paragraphs.length > 0
      ? content.whyThisMatters.paragraphs
      : FALLBACK_PARAGRAPHS;

  return (
    <>
      <section
        aria-labelledby="why-heading"
        data-ocid="why.hero_section"
        className="border-b border-border bg-gradient-warm"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Why This Matters
          </p>
          <h1
            id="why-heading"
            className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl"
          >
            {heading}
          </h1>
          <p className="mt-6 max-w-2xl font-display text-xl italic leading-relaxed text-primary md:text-2xl">
            Behind every statistic is a person whose story rarely gets told.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="story-heading"
        data-ocid="why.story_section"
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <h2 id="story-heading" className="sr-only">
          The story behind {SITE_NAME}
        </h2>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }, (_, i) => `why-skeleton-${i}`).map(
              (id) => (
                <Skeleton key={id} className="h-5 w-full rounded-md" />
              ),
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
              {paragraphs[0]}
            </p>
            {paragraphs.slice(1).map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <figure className="mt-12 rounded-3xl border border-accent/25 bg-accent/5 p-8 md:p-10">
          <Quote aria-hidden="true" className="size-7 text-accent" />
          <blockquote className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
            Understanding is not about pity. It is about recognising the person
            in the number — and responding with the same care we would want for
            ourselves.
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            The idea behind {SITE_NAME}
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="purpose-heading"
        data-ocid="why.purpose_section"
        className="border-y border-border bg-muted/40 grain"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <h2
            id="purpose-heading"
            className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            What this site is trying to do
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Awareness",
                body: "Make problems that are easy to overlook visible, in plain and honest language.",
              },
              {
                title: "Empathy",
                body: "Put the human experience back at the centre, so a number never stands alone.",
              },
              {
                title: "Understanding",
                body: "Explain what people actually go through, without judgement or simplification.",
              },
              {
                title: "Conversation",
                body: "Give people a starting point to talk about wellbeing with the people around them.",
              },
            ].map((item) => (
              <div
                key={item.title}
                data-ocid={`why.purpose_card.${item.title.toLowerCase()}`}
                className="rounded-2xl border border-border bg-card p-6 shadow-subtle"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="why-closing-heading"
        data-ocid="why.closing_section"
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="rounded-3xl border border-border bg-card p-8 shadow-subtle md:p-12">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <HeartHandshake aria-hidden="true" className="size-6" />
          </span>
          <h2
            id="why-closing-heading"
            className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Start with one story
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            The best way to understand why this matters is to read about the
            people behind the numbers. Explore the issues, or reach out if you
            have something to add.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              data-ocid="why.explore_issues_button"
              className="h-12 rounded-full px-7 text-base hover:-translate-y-0.5"
            >
              <Link to="/issues">
                Explore the Issues
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              data-ocid="why.contact_button"
              className="h-12 rounded-full border-border bg-background px-7 text-base hover:-translate-y-0.5"
            >
              <Link to="/get-in-touch">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
