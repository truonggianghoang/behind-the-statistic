import { ContactForm } from "@/components/ContactForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useSiteContent } from "@/hooks/use-backend";
import { CRISIS_NOTE, EDUCATIONAL_DISCLAIMER } from "@/lib/site";
import { Award, Mail, MapPin, School, User } from "lucide-react";

const REAL_DETAILS = {
  createdBy: "Hoang Truong Giang",
  email: "truong-giang_hoang@bvishanoi.com",
  organisation: "British Vietnamese International School",
  location: "Vietnam, Hanoi",
  project: "Duke of Edinburgh's Bronze Award",
};

const PLACEHOLDER_PATTERN = /^\[.*\]$/;

function pick(value: string | undefined, fallback: string): string {
  if (!value || PLACEHOLDER_PATTERN.test(value.trim())) {
    return fallback;
  }
  return value;
}

function resolveDetails(
  backend: Partial<typeof REAL_DETAILS> | undefined,
): typeof REAL_DETAILS {
  return {
    createdBy: pick(backend?.createdBy, REAL_DETAILS.createdBy),
    email: pick(backend?.email, REAL_DETAILS.email),
    organisation: pick(backend?.organisation, REAL_DETAILS.organisation),
    location: pick(backend?.location, REAL_DETAILS.location),
    project: pick(backend?.project, REAL_DETAILS.project),
  };
}

export function GetInTouchPage() {
  const { data: content, isLoading } = useSiteContent();
  const details = resolveDetails(content?.contactDetails);

  const detailRows = [
    { icon: User, label: "Created by", value: details.createdBy },
    { icon: Mail, label: "Email", value: details.email },
    {
      icon: School,
      label: "School / Organisation",
      value: details.organisation,
    },
    { icon: MapPin, label: "Location", value: details.location },
    { icon: Award, label: "Project", value: details.project },
  ];

  return (
    <>
      <section
        aria-labelledby="contact-heading"
        data-ocid="contact.hero_section"
        className="border-b border-border bg-gradient-warm"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Get in Touch
          </p>
          <h1
            id="contact-heading"
            className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl"
          >
            Questions, feedback or a story to share?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            This project grows through conversation. Whether you have a
            correction, a suggestion or simply want to say hello, your message
            is welcome.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="contact-form-heading"
        data-ocid="contact.main_section"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h2
              id="contact-form-heading"
              className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            >
              Send a message
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Fill in the form below and we will get back to you. All fields are
              required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside
            aria-labelledby="contact-details-heading"
            data-ocid="contact.details_panel"
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl border border-border bg-muted/40 p-6 sm:p-8">
              <h2
                id="contact-details-heading"
                className="font-display text-xl font-bold tracking-tight text-foreground"
              >
                Project details
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                This project was created as part of the Duke of Edinburgh's
                Bronze Award. Reach out any time using the details below.
              </p>

              <dl className="mt-6 flex flex-col gap-5">
                {isLoading
                  ? Array.from(
                      { length: 5 },
                      (_, i) => `contact-detail-skeleton-${i}`,
                    ).map((id) => (
                      <div key={id} className="flex items-start gap-3">
                        <Skeleton className="size-9 shrink-0 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-3 w-24 rounded-md" />
                          <Skeleton className="mt-2 h-4 w-40 rounded-md" />
                        </div>
                      </div>
                    ))
                  : detailRows.map((row) => {
                      const Icon = row.icon;
                      return (
                        <div
                          key={row.label}
                          data-ocid={`contact.detail.${row.label
                            .toLowerCase()
                            .replace(/[^a-z]+/g, "_")}`}
                          className="flex items-start gap-3"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon aria-hidden="true" className="size-4" />
                          </span>
                          <div className="min-w-0">
                            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {row.label}
                            </dt>
                            <dd className="mt-0.5 break-words text-sm font-medium text-foreground">
                              {row.value}
                            </dd>
                          </div>
                        </div>
                      );
                    })}
              </dl>
            </div>

            <div
              data-ocid="contact.educational_note"
              className="rounded-3xl border border-accent/25 bg-accent/5 p-6 sm:p-8"
            >
              <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                An important note
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {EDUCATIONAL_DISCLAIMER}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {CRISIS_NOTE}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
