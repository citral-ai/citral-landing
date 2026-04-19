"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

const COUNTRY_CODES = [
  { code: "+91", flag: "\u{1F1EE}\u{1F1F3}", label: "India" },
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", label: "US" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", label: "UK" },
  { code: "+971", flag: "\u{1F1E6}\u{1F1EA}", label: "UAE" },
  { code: "+65", flag: "\u{1F1F8}\u{1F1EC}", label: "Singapore" },
  { code: "+61", flag: "\u{1F1E6}\u{1F1FA}", label: "Australia" },
  { code: "+49", flag: "\u{1F1E9}\u{1F1EA}", label: "Germany" },
  { code: "+33", flag: "\u{1F1EB}\u{1F1F7}", label: "France" },
  { code: "+81", flag: "\u{1F1EF}\u{1F1F5}", label: "Japan" },
  { code: "+86", flag: "\u{1F1E8}\u{1F1F3}", label: "China" },
  { code: "+55", flag: "\u{1F1E7}\u{1F1F7}", label: "Brazil" },
  { code: "+82", flag: "\u{1F1F0}\u{1F1F7}", label: "S. Korea" },
  { code: "+39", flag: "\u{1F1EE}\u{1F1F9}", label: "Italy" },
  { code: "+34", flag: "\u{1F1EA}\u{1F1F8}", label: "Spain" },
  { code: "+7", flag: "\u{1F1F7}\u{1F1FA}", label: "Russia" },
  { code: "+52", flag: "\u{1F1F2}\u{1F1FD}", label: "Mexico" },
  { code: "+27", flag: "\u{1F1FF}\u{1F1E6}", label: "S. Africa" },
  { code: "+966", flag: "\u{1F1F8}\u{1F1E6}", label: "Saudi" },
  { code: "+62", flag: "\u{1F1EE}\u{1F1E9}", label: "Indonesia" },
  { code: "+60", flag: "\u{1F1F2}\u{1F1FE}", label: "Malaysia" },
];

const SOURCE_OPTIONS = [
  { id: "x", label: "X (Twitter)", icon: "x" },
  { id: "instagram", label: "Instagram", icon: "ig" },
  { id: "linkedin", label: "LinkedIn", icon: "li" },
  { id: "google", label: "Google Search", icon: "g" },
  { id: "email", label: "Email", icon: "mail" },
  { id: "referral", label: "Word of mouth", icon: "wom" },
  { id: "event", label: "Event / Conference", icon: "ev" },
  { id: "other", label: "Other", icon: "other" },
];

interface Step {
  id: string;
  question: string;
  sub: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "done";
  required: boolean;
  placeholder: string;
}

const STEPS: Step[] = [
  {
    id: "name",
    question: "Hey, who\u2019s this?",
    sub: "What do people call you?",
    type: "text",
    required: true,
    placeholder: "Jane Doe",
  },
  {
    id: "email",
    question: "Where do we reach you?",
    sub: "Your email. Zero spam \u2014 we\u2019re too busy catching errors.",
    type: "email",
    required: true,
    placeholder: "you@company.com",
  },
  {
    id: "phone",
    question: "Want a faster callback?",
    sub: "Drop your number. Or skip \u2014 we don\u2019t judge.",
    type: "tel",
    required: false,
    placeholder: "9876543210",
  },
  {
    id: "source",
    question: "Where\u2019d you find us?",
    sub: "Just curious. Pick one.",
    type: "select",
    required: false,
    placeholder: "",
  },
  {
    id: "message",
    question: "What brought you here?",
    sub: "500-page BMRs? FDA knocking? Pure curiosity? Spill it.",
    type: "textarea",
    required: true,
    placeholder: "Tell us everything...",
  },
  {
    id: "done",
    question: "You\u2019re in.",
    sub: "Our humans (and AI) will get back to you before your next deviation report is due.",
    type: "done",
    required: false,
    placeholder: "",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function ContactModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
    source: "",
    message: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [countryOpen, setCountryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const current = STEPS[step];
  const totalSteps = STEPS.length - 1; // exclude "done"

  // Focus input on step change
  useEffect(() => {
    if (open && current.type !== "done") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [step, open, current.type]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setDir(1);
      setValues({ name: "", email: "", phone: "", source: "", message: "" });
      setCountryCode("+91");
      setError("");
      setSubmitting(false);
    }, 300);
  }, [onClose]);

  const advance = async () => {
    setError("");

    // Validation
    if (current.required && !values[current.id]?.trim()) {
      setError("This one\u2019s required.");
      return;
    }
    if (current.type === "email" && values.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        setError("That doesn\u2019t look like an email.");
        return;
      }
    }

    // If last input step, submit
    if (step === totalSteps - 1) {
      setSubmitting(true);
      const phone = values.phone ? `${countryCode} ${values.phone}` : "";
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone,
            source: values.source,
            message: values.message,
          }),
        });
        if (!res.ok) {
          setError("Something broke. Try prateek@citral.ai");
          setSubmitting(false);
          return;
        }
      } catch {
        setError("Something broke. Try prateek@citral.ai");
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
    }

    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    if (step === 0) return;
    setDir(-1);
    setError("");
    setStep((s) => s - 1);
  };

  // Escape to close, Enter to advance
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (countryOpen) {
          setCountryOpen(false);
        } else {
          handleClose();
        }
      }
      if (e.key === "Enter" && current.type !== "textarea" && current.type !== "done" && current.type !== "select") {
        e.preventDefault();
        advance();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, countryOpen, current.type, handleClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#020a08]/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[94vw] max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: "rgba(8, 18, 16, 0.95)",
                border: "1px solid rgba(0, 194, 168, 0.12)",
                boxShadow:
                  "0 0 80px rgba(0, 194, 168, 0.08), 0 40px 100px rgba(0,0,0,0.6)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Progress bar */}
              {current.type !== "done" && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.04]">
                  <motion.div
                    className="h-full bg-citral-teal"
                    initial={false}
                    animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              )}

              {/* Header row */}
              <div className="flex items-center justify-between px-6 sm:px-8 pt-6">
                {step > 0 && current.type !== "done" ? (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-[12px] text-white/30 hover:text-white/60 transition-colors font-mono"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    back
                  </button>
                ) : (
                  <div />
                )}
                {current.type !== "done" && (
                  <span className="text-[11px] font-mono text-white/20">
                    {step + 1}/{totalSteps}
                  </span>
                )}
                <button
                  onClick={handleClose}
                  className="text-white/20 hover:text-white/60 transition-colors"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Step content */}
              <div className="px-6 sm:px-8 pb-8 pt-4 min-h-[280px] sm:min-h-[300px] flex flex-col">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col flex-1"
                  >
                    {/* Done state */}
                    {current.type === "done" ? (
                      <div className="flex flex-col items-center justify-center flex-1 text-center py-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                          className="w-16 h-16 rounded-full bg-citral-teal/15 border border-citral-teal/30 flex items-center justify-center mb-5"
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C2A8" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </motion.div>
                        <h2 className="text-[26px] sm:text-[30px] font-semibold text-white tracking-tight">
                          {current.question}
                        </h2>
                        <p className="text-[14px] text-white/40 mt-2 max-w-xs">
                          {current.sub}
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Question */}
                        <div className="mb-6 sm:mb-8">
                          <h2 className="text-[24px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
                            {current.question}
                          </h2>
                          <p className="text-[13px] sm:text-[14px] text-white/35 mt-2">
                            {current.sub}
                          </p>
                        </div>

                        {/* Input */}
                        <div className="flex-1 flex flex-col">
                          {current.type === "select" ? (
                            <div className="grid grid-cols-2 gap-2">
                              {SOURCE_OPTIONS.map((opt) => {
                                const selected = values.source === opt.id;
                                return (
                                  <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => {
                                      setValues((v) => ({ ...v, source: opt.id }));
                                      // Auto-advance after selection
                                      setTimeout(() => {
                                        setDir(1);
                                        setError("");
                                        setStep((s) => s + 1);
                                      }, 200);
                                    }}
                                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[13px] text-left transition-all duration-200 border ${
                                      selected
                                        ? "border-citral-teal/50 bg-citral-teal/[0.08] text-citral-teal"
                                        : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/70"
                                    }`}
                                  >
                                    {opt.icon === "x" && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    )}
                                    {opt.icon === "ig" && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                                    )}
                                    {opt.icon === "li" && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    )}
                                    {opt.icon === "g" && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                    )}
                                    {opt.icon === "mail" && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>
                                    )}
                                    {opt.icon === "wom" && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                                    )}
                                    {opt.icon === "ev" && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                                    )}
                                    {opt.icon === "other" && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                                    )}
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                          ) : current.type === "textarea" ? (
                            <textarea
                              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                              value={values[current.id] || ""}
                              onChange={(e) =>
                                setValues((v) => ({ ...v, [current.id]: e.target.value }))
                              }
                              placeholder={current.placeholder}
                              rows={4}
                              className="w-full bg-transparent border-b-2 border-white/[0.08] focus:border-citral-teal/60 text-[16px] sm:text-[18px] text-white placeholder:text-white/15 outline-none py-3 resize-none transition-colors duration-300"
                            />
                          ) : current.type === "tel" ? (
                            <div className="flex items-center gap-2 border-b-2 border-white/[0.08] focus-within:border-citral-teal/60 transition-colors duration-300">
                              {/* Country code selector */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => setCountryOpen(!countryOpen)}
                                  className="flex items-center gap-1 py-3 pr-2 text-[15px] text-white/60 hover:text-white/80 transition-colors"
                                >
                                  <span className="text-[18px]">
                                    {COUNTRY_CODES.find((c) => c.code === countryCode)?.flag}
                                  </span>
                                  <span className="font-mono text-[14px]">{countryCode}</span>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-40">
                                    <path d="M6 9l6 6 6-6" />
                                  </svg>
                                </button>

                                <AnimatePresence>
                                  {countryOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -4 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute top-full left-0 mt-1 w-48 max-h-52 overflow-y-auto rounded-lg z-50"
                                      style={{
                                        background: "rgba(12, 24, 20, 0.98)",
                                        border: "1px solid rgba(0, 194, 168, 0.15)",
                                        boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                                        scrollbarWidth: "thin",
                                        scrollbarColor: "rgba(0,194,168,0.2) transparent",
                                      }}
                                    >
                                      {COUNTRY_CODES.map((c) => (
                                        <button
                                          key={c.code}
                                          type="button"
                                          onClick={() => {
                                            setCountryCode(c.code);
                                            setCountryOpen(false);
                                          }}
                                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-[13px] hover:bg-white/[0.05] transition-colors ${
                                            countryCode === c.code
                                              ? "text-citral-teal bg-citral-teal/[0.06]"
                                              : "text-white/60"
                                          }`}
                                        >
                                          <span className="text-[16px]">{c.flag}</span>
                                          <span className="font-mono">{c.code}</span>
                                          <span className="text-white/30 ml-auto">{c.label}</span>
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              <input
                                ref={inputRef as React.RefObject<HTMLInputElement>}
                                type="tel"
                                value={values[current.id] || ""}
                                onChange={(e) =>
                                  setValues((v) => ({ ...v, [current.id]: e.target.value }))
                                }
                                placeholder={current.placeholder}
                                className="flex-1 bg-transparent text-[16px] sm:text-[18px] text-white placeholder:text-white/15 outline-none py-3"
                              />
                            </div>
                          ) : (
                            <input
                              ref={inputRef as React.RefObject<HTMLInputElement>}
                              type={current.type}
                              value={values[current.id] || ""}
                              onChange={(e) =>
                                setValues((v) => ({ ...v, [current.id]: e.target.value }))
                              }
                              placeholder={current.placeholder}
                              className="w-full bg-transparent border-b-2 border-white/[0.08] focus:border-citral-teal/60 text-[16px] sm:text-[18px] text-white placeholder:text-white/15 outline-none py-3 transition-colors duration-300"
                            />
                          )}

                          {/* Error */}
                          <AnimatePresence>
                            {error && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-[12px] text-[#FF6B6B] mt-2"
                              >
                                {error}
                              </motion.p>
                            )}
                          </AnimatePresence>

                          {/* Action row */}
                          <div className="flex items-center justify-between mt-auto pt-6">
                            {/* Enter hint */}
                            <span className="text-[11px] font-mono text-white/15 hidden sm:block">
                              {current.type === "textarea" ? "" : "press Enter \u21B5"}
                            </span>
                            {current.type !== "textarea" && <span className="sm:hidden" />}

                            <div className="flex items-center gap-2">
                              {/* Skip for optional fields */}
                              {!current.required && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDir(1);
                                    setError("");
                                    setStep((s) => s + 1);
                                  }}
                                  className="px-4 py-2 text-[12px] font-mono text-white/25 hover:text-white/50 transition-colors"
                                >
                                  skip
                                </button>
                              )}

                              {/* Next/Submit button */}
                              <button
                                type="button"
                                onClick={advance}
                                disabled={submitting}
                                className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                style={{
                                  background:
                                    "linear-gradient(180deg, #00d4b6 0%, #00C2A8 40%, #00b899 100%)",
                                  boxShadow:
                                    "inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 1px rgba(0,194,168,0.3), 0 4px 12px rgba(0,194,168,0.25)",
                                }}
                              >
                                {submitting
                                  ? "Sending..."
                                  : step === totalSteps - 1
                                    ? "Send"
                                    : "OK"}
                                {!submitting && (
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    className="transition-transform group-hover:translate-x-0.5"
                                  >
                                    {step === totalSteps - 1 ? (
                                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    ) : (
                                      <path d="M5 12h14M13 5l7 7-7 7" />
                                    )}
                                  </svg>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
