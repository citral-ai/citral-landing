"use client";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

export default function WaitlistForm() {
  return (
    <a
      href={GOOGLE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-citral-teal text-[#041210] text-[14px] font-semibold rounded-lg transition-all duration-150 hover:brightness-110 hover:-translate-y-px hover:shadow-[0_0_24px_rgba(0,194,168,0.25)] active:translate-y-0"
    >
      Join Waitlist
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  );
}
