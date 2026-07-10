"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 sm:p-8" aria-label="Business inquiry form">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyanGlow">Send an inquiry</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-white">Tell us what you want to automate.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">This form is a website preview; email remains the active support channel.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">
          Name
          <input
            required
            name="name"
            className="rounded-2xl border border-white/[0.12] bg-white/[0.045] px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyanGlow/70 focus:ring-2 focus:ring-cyanGlow/20"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Email
          <input
            required
            type="email"
            name="email"
            className="rounded-2xl border border-white/[0.12] bg-white/[0.045] px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyanGlow/70 focus:ring-2 focus:ring-cyanGlow/20"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300 sm:col-span-2">
          Company
          <input
            name="company"
            className="rounded-2xl border border-white/[0.12] bg-white/[0.045] px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyanGlow/70 focus:ring-2 focus:ring-cyanGlow/20"
            placeholder="Business name"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300 sm:col-span-2">
          Message
          <textarea
            required
            name="message"
            rows={5}
            className="min-h-36 resize-y rounded-2xl border border-white/[0.12] bg-white/[0.045] px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyanGlow/70 focus:ring-2 focus:ring-cyanGlow/20"
            placeholder="Tell us about your business automation needs"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-cyan-200/30 bg-gradient-to-r from-cyanGlow to-electric px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:from-white hover:to-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyanGlow sm:w-auto"
      >
        Send inquiry <Icon name="arrow" className="h-4 w-4" />
      </button>
      {submitted ? (
        <p role="status" aria-live="polite" className="mt-5 rounded-2xl border border-mint/25 bg-mint/[0.08] p-4 text-sm leading-6 text-mint">
          Thank you. Please email {site.email} directly while our contact system is being configured.
        </p>
      ) : null}
    </form>
  );
}
