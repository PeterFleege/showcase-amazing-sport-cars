// src/components/content-sections/Contact.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Car } from "@/types/car";
import CarImage from "../ui/CarImage";
import Reveal from "../ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "peer w-full border-0 border-b border-bone/25 bg-transparent px-2 pb-1 mt-6 pt-0.5 text-bone outline-none transition-colors placeholder-transparent focus:border-gold-400 autofill:shadow-[inset_0_0_0_1000px_#070707] autofill:[-webkit-text-fill-color:#efe8da]";
const label =
  "pointer-events-none absolute left-0 top-6 text-sm text-mist transition-all duration-300 peer-focus:-top-1 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:text-gold-400 peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.3em]";

export default function Contact({ cars }: { cars: Car[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="film-grain relative isolate overflow-hidden py-28 lg:py-40"
    >
      <div className="absolute inset-0 -z-10">
        <CarImage
          src="/images/contact.jpg"
          alt=""
          accentFrom="#3a2a10"
          accentTo="#050505"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="mx-auto grid max-w-300 gap-16 px-6 lg:grid-cols-5 lg:gap-20 lg:px-12">
        <div className="lg:col-span-2">
          <Reveal>
            <span className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.42em] text-gold-500">
              <span className="h-px w-10 bg-gold-600" />
              By Invitation
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-5xl font-light leading-[1.05] lg:text-6xl">
              Arrange a{" "}
              <span className="italic text-gold-gradient">
                private viewing.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone/70">
              Visit our atelier, meet the craftspeople and experience your car
              in person. A member of our team will be in touch within one
              working day.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-3">
          <form onSubmit={onSubmit} className="space-y-9" noValidate>
            <div className="grid gap-9 sm:grid-cols-2">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Name"
                  className={field}
                  autoComplete="name"
                />
                <label htmlFor="name" className={label}>
                  Full name
                </label>
              </div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className={field}
                  autoComplete="email"
                />
                <label htmlFor="email" className={label}>
                  Email address
                </label>
              </div>
            </div>

            <div className="relative">
              <select
                id="carSlug"
                name="carSlug"
                defaultValue=""
                className="w-full border-0 border-b border-bone/25 bg-transparent pb-3 pt-6 text-bone outline-none transition-colors focus:border-gold-400"
              >
                <option value="" className="bg-ink">
                  No preference
                </option>
                {cars.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-ink">
                    {c.name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="carSlug"
                className="pointer-events-none absolute -top-1 left-0 text-[10px] uppercase tracking-[0.3em] text-gold-400"
              >
                Model of interest
              </label>
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Message"
                className={`${field} resize-none`}
              />
              <label htmlFor="message" className={label}>
                Anything we should know?
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative overflow-hidden bg-gold-500 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink transition-opacity disabled:opacity-60"
              >
                <span className="relative z-10">
                  {status === "sending" ? "Sending…" : "Request Viewing"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gold-300 transition-transform duration-500 group-hover:translate-x-0" />
              </button>

              <AnimatePresence mode="wait">
                {status === "sent" && (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-gold-300"
                    role="status"
                  >
                    Thank you — we&apos;ll be in touch shortly.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-300/90"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
