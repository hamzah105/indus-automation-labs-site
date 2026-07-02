"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">
          Name
          <input
            required
            name="name"
            className="rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyanGlow"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Email
          <input
            required
            type="email"
            name="email"
            className="rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyanGlow"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300 sm:col-span-2">
          Company
          <input
            name="company"
            className="rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyanGlow"
            placeholder="Business name"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300 sm:col-span-2">
          Message
          <textarea
            required
            name="message"
            rows={5}
            className="resize-none rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyanGlow"
            placeholder="Tell us about your business automation needs"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-cyanGlow px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-white"
      >
        Send inquiry
      </button>
      {submitted ? (
        <p className="mt-5 rounded-2xl border border-mint/25 bg-mint/10 p-4 text-sm leading-6 text-mint">
          Thank you. Please email {site.email} directly while our contact system is being configured.
        </p>
      ) : null}
    </form>
  );
}
