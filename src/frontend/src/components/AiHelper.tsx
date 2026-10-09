import {
  type Category,
  type ChatMessage,
  Variant_user_assistant,
} from "@/backend";
import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryLabel } from "@/lib/site";
import { useActor } from "@caffeineai/core-infrastructure";
import { Bot, Send, ShieldAlert, Sparkles, User } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface AiHelperProps {
  category: Category;
}

interface DisplayMessage {
  id: string;
  role: Variant_user_assistant;
  content: string;
}

const STARTER_PROMPTS = [
  "Explain this in simple terms",
  "What are the common warning signs?",
  "How can I support someone I care about?",
  "Which topics should I read next?",
];

function buildGreeting(category: Category): string {
  return `Hello — I'm the ${categoryLabel(
    category,
  )} helper. I can explain concepts, simplify terminology, summarise what's on this site, and point you to the most relevant topic pages. I give general educational information only; I'm not a doctor, psychologist, therapist or emergency service.`;
}

export function AiHelper({ category }: AiHelperProps) {
  const { actor } = useActor(createActor);
  const inputId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<DisplayMessage[]>(() => [
    {
      id: "greeting",
      role: Variant_user_assistant.assistant,
      content: buildGreeting(category),
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep the newest message in view as the conversation grows.
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message/typing changes
  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, isSending]);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isSending) return;

    const userMessage: DisplayMessage = {
      id: `user-${Date.now()}`,
      role: Variant_user_assistant.user,
      content: trimmed,
    };
    const history: ChatMessage[] = messages
      .filter((message) => message.id !== "greeting")
      .map((message) => ({ role: message.role, content: message.content }));

    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setError(null);
    setIsSending(true);

    try {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.askHelper(category, trimmed, history);
      if (result.__kind__ === "ok") {
        setMessages((current) => [
          ...current,
          {
            id: `assistant-${Date.now()}`,
            role: Variant_user_assistant.assistant,
            content: result.ok,
          },
        ]);
      } else {
        setError(
          result.err.__kind__ === "emptyQuestion"
            ? "Please type a question before sending."
            : "The helper is unavailable right now. Please try again in a moment.",
        );
      }
    } catch {
      setError(
        "Something went wrong reaching the helper. Please try again in a moment.",
      );
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  return (
    <section
      aria-labelledby="ai-helper-heading"
      data-ocid="ai_helper.section"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <Sparkles aria-hidden="true" className="size-4" />
          AI Helper
        </p>
        <h2
          id="ai-helper-heading"
          className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          Ask about {categoryLabel(category).toLowerCase()}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          A patient, plain-language guide to the topics on this page. Ask it to
          explain a term, simplify a section, or suggest where to read next.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-subtle">
          <div
            ref={scrollRef}
            data-ocid="ai_helper.message_list"
            className="flex max-h-[28rem] min-h-[20rem] flex-col gap-4 overflow-y-auto p-5 sm:p-6"
          >
            {messages.map((message) => {
              const isUser = message.role === Variant_user_assistant.user;
              return (
                <div
                  key={message.id}
                  data-ocid={`ai_helper.message.${message.id}`}
                  className={
                    isUser
                      ? "flex items-start justify-end gap-3"
                      : "flex items-start gap-3"
                  }
                >
                  {!isUser ? (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bot aria-hidden="true" className="size-4" />
                    </span>
                  ) : null}
                  <p
                    className={
                      isUser
                        ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground"
                        : "max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-foreground"
                    }
                  >
                    {message.content}
                  </p>
                  {isUser ? (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <User aria-hidden="true" className="size-4" />
                    </span>
                  ) : null}
                </div>
              );
            })}

            {isSending ? (
              <div
                data-ocid="ai_helper.typing_indicator"
                className="flex items-center gap-3"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot aria-hidden="true" className="size-4" />
                </span>
                <span className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                  <span className="sr-only">The helper is typing</span>
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </span>
              </div>
            ) : null}
          </div>

          <div className="border-t border-border p-4 sm:p-5">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <label htmlFor={inputId} className="sr-only">
                Ask the {categoryLabel(category)} helper a question
              </label>
              <Input
                id={inputId}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask a question about this category…"
                data-ocid="ai_helper.input"
                className="h-12 rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send question"
                data-ocid="ai_helper.send_button"
                disabled={isSending || draft.trim().length === 0}
                className="size-12 shrink-0 rounded-full"
              >
                <Send aria-hidden="true" className="size-4" />
              </Button>
            </form>

            <div aria-live="polite" className="mt-3">
              {error ? (
                <p
                  data-ocid="ai_helper.error_state"
                  className="text-sm text-destructive"
                >
                  {error}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Try asking
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void send(prompt)}
                  disabled={isSending}
                  data-ocid={`ai_helper.starter.${prompt
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "_")
                    .replace(/^_|_$/g, "")}`}
                  className="rounded-xl border border-border bg-background px-4 py-2.5 text-left text-sm font-medium text-foreground transition-smooth hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 rounded-2xl border border-accent/25 bg-accent/5 p-5">
            <ShieldAlert
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-accent"
            />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Educational information only
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                This helper is not a doctor, psychologist, therapist or
                emergency service. It cannot diagnose or treat anything. For
                anything concerning your health, please speak with a qualified
                professional. If you are in crisis, contact a local emergency
                service right away.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
