"use client";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

export default function WaitlistForm() {
  return (
    <a
      href={GOOGLE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-2.5 pl-6 pr-5 py-3 text-[14px] font-semibold rounded-full text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background:
          "linear-gradient(135deg, #00C2A8 0%, #00d4b6 50%, #00b899 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,194,168,0.4), 0 4px 16px rgba(0,194,168,0.3), 0 12px 36px rgba(0,194,168,0.15)",
      }}
    >
      <span className="relative">Join Waitlist</span>
      <span
        className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 transition-all duration-300 group-hover:bg-white/25 group-hover:translate-x-0.5"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}
