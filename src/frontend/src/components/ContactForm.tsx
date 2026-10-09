import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/use-backend";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useId, useState } from "react";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { name: "", email: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }
  if (!values.message.trim()) {
    errors.message = "Please write a short message.";
  } else if (values.message.trim().length < 10) {
    errors.message =
      "Please add a little more detail (at least 10 characters).";
  }
  return errors;
}

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useSubmitContact();

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    const captured = values;
    setValues(EMPTY);
    setSubmitted(false);

    mutation.mutate(
      {
        name: captured.name.trim(),
        email: captured.email.trim(),
        message: captured.message.trim(),
      },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "ok") {
            setSubmitted(true);
          } else {
            setValues((current) =>
              current.name === "" && current.message === ""
                ? captured
                : current,
            );
            setErrors({ message: "Something went wrong. Please try again." });
          }
        },
        onError: () => {
          setValues((current) =>
            current.name === "" && current.message === "" ? captured : current,
          );
          setErrors({
            message:
              "We could not send your message just now. Please try again in a moment.",
          });
        },
      },
    );
  }

  const isPending = mutation.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-ocid="contact.form"
      className="rounded-3xl border border-border bg-card p-6 shadow-subtle sm:p-8"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor={nameId}>Name</Label>
          <Input
            id={nameId}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            data-ocid="contact.name_input"
            className="h-11 rounded-xl"
          />
          {errors.name ? (
            <p
              id={`${nameId}-error`}
              data-ocid="contact.name_error"
              className="text-sm font-medium text-destructive"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={emailId}>Email</Label>
          <Input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            data-ocid="contact.email_input"
            className="h-11 rounded-xl"
          />
          {errors.email ? (
            <p
              id={`${emailId}-error`}
              data-ocid="contact.email_error"
              className="text-sm font-medium text-destructive"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={messageId}>Message</Label>
          <Textarea
            id={messageId}
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            data-ocid="contact.message_input"
            className="rounded-xl"
          />
          {errors.message ? (
            <p
              id={`${messageId}-error`}
              data-ocid="contact.message_error"
              className="text-sm font-medium text-destructive"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            data-ocid="contact.submit_button"
            className="h-12 rounded-full px-7 text-base hover:-translate-y-0.5"
          >
            {isPending ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send aria-hidden="true" className="size-4" />
                Send message
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            We usually reply within a few days.
          </p>
        </div>
      </div>

      <div aria-live="polite" className="mt-4">
        {submitted ? (
          <div
            data-ocid="contact.success_state"
            className="flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-4"
          >
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-success"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Thank you — your message has been sent.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                We read every message and will get back to you as soon as we
                can.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
