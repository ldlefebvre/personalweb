import { useEffect, useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [token, setToken] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);

  // Render Cloudflare Turnstile only when a site key is configured.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !widgetRef.current) return;
    const id = "cf-turnstile-script";
    const renderWidget = () => {
      if (window.turnstile && widgetRef.current && !widgetRef.current.hasChildNodes()) {
        window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      }
    };
    if (window.turnstile) {
      renderWidget();
    } else if (!document.getElementById(id)) {
      window.onTurnstileLoad = renderWidget;
      const s = document.createElement("script");
      s.id = id;
      s.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
  }, []);

  function validate(data: { name: string; email: string; message: string }): FieldErrors {
    const e: FieldErrors = {};
    if (!data.name.trim()) e.name = "Please enter your name.";
    if (!data.email.trim()) e.email = "Please enter your email.";
    else if (!EMAIL_RE.test(data.email)) e.email = "That doesn't look like a valid email.";
    if (!data.message.trim()) e.message = "Please enter a message.";
    else if (data.message.trim().length < 10) e.message = "A little more detail, please (10+ characters).";
    return e;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    // Honeypot — bots fill this hidden field; humans never see it.
    if ((fd.get("company") as string)?.trim()) {
      setStatus("success"); // silently no-op for bots
      form.reset();
      return;
    }

    const data = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      message: (fd.get("message") as string) ?? "",
    };

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("idle");
      return;
    }

    if (TURNSTILE_SITE_KEY && !token) {
      setStatus("error");
      setServerMessage("Please complete the verification challenge.");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
      setToken("");
      window.turnstile?.reset();
    } catch (err) {
      setStatus("error");
      setServerMessage(err instanceof Error ? err.message : "Something went wrong.");
      window.turnstile?.reset();
      setToken("");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="surface-card flex flex-col items-center justify-center gap-3 p-10 text-center"
      >
        <div className="grid size-14 place-items-center rounded-full bg-accent-soft text-primary">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-text">Message sent — thank you!</h3>
        <p className="max-w-sm text-text-muted">
          I'll get back to you as soon as I can. In the meantime, feel free to connect on LinkedIn.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-primary underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-text placeholder:text-text-subtle transition-colors focus-visible:border-primary focus-visible:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="surface-card flex flex-col gap-5 p-6 sm:p-8"
    >
      {/* Honeypot: visually hidden, off-screen, not announced */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-text">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputCls}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
          />
          {errors.name && (
            <p id="cf-name-error" className="mt-1.5 text-sm text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-text">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
          />
          {errors.email && (
            <p id="cf-email-error" className="mt-1.5 text-sm text-danger">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-text">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          className={`${inputCls} resize-y`}
          placeholder="Tell me about your team, role, or project…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
        />
        {errors.message && (
          <p id="cf-message-error" className="mt-1.5 text-sm text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {TURNSTILE_SITE_KEY && <div ref={widgetRef} className="min-h-[65px]" />}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-ink shadow-glow-soft transition-all duration-200 hover:bg-primary-strong hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="text-sm">
          {status === "error" && <span className="text-danger">{serverMessage}</span>}
        </p>
      </div>
    </form>
  );
}
