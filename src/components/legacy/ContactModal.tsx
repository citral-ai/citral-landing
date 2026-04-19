"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (supabase) {
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({ name, email, phone, message });
      if (dbError) {
        setError("Something went wrong. Try emailing prateek@citral.ai");
        setSubmitting(false);
        return;
      }
    } else {
      // Fallback: open mailto if Supabase not configured
      window.location.href = `mailto:prateek@citral.ai?subject=Contact from ${name}&body=${encodeURIComponent(message + "\n\nPhone: " + phone + "\nEmail: " + email)}`;
    }

    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setName(""); setEmail(""); setPhone(""); setMessage("");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8, 18, 16, 0.92)",
              border: "1px solid rgba(0, 194, 168, 0.18)",
              boxShadow: "0 0 60px rgba(0, 194, 168, 0.1), 0 30px 80px rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            {submitted ? (
              <div className="px-8 py-12 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-citral-teal/20 border border-citral-teal/40 mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C2A8" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-1">Message sent</h3>
                <p className="text-[13px] text-white/50">We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-7 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-[20px] font-semibold text-white tracking-tight">Get in touch</h3>
                    <p className="text-[13px] text-white/40 mt-1">We&apos;ll respond within 24 hours.</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-white/30 hover:text-white/70 transition-colors"
                    aria-label="Close"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-[14px] text-white placeholder:text-white/25 outline-none focus:border-citral-teal/40 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-[14px] text-white placeholder:text-white/25 outline-none focus:border-citral-teal/40 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-[14px] text-white placeholder:text-white/25 outline-none focus:border-citral-teal/40 transition-colors"
                  />
                  <textarea
                    required
                    placeholder="What can we help with?"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-[14px] text-white placeholder:text-white/25 outline-none focus:border-citral-teal/40 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="mt-3 text-[12px] text-[#FF6B6B]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-5 w-full py-2.5 text-[14px] font-medium rounded-lg text-white transition-all duration-200 hover:brightness-110 disabled:opacity-50"
                  style={{
                    background: "linear-gradient(180deg, rgba(0, 194, 168, 0.95) 0%, rgba(0, 140, 122, 1) 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 20px rgba(0, 194, 168, 0.2)",
                  }}
                >
                  {submitting ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
