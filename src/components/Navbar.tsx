"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-5 sm:px-10 border-b border-white/[0.04]"
      style={{
        background: "rgba(2, 10, 8, 0.5)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* C + leaf icon as inline SVG */}
      <svg viewBox="130 270 280 340" className="h-7 w-auto" fill="white" opacity="0.7">
        <path d="M364.750916,523.957153 C345.787781,561.275879 315.613586,581.166443 274.316498,584.065796 C260.784302,585.015869 247.460983,583.207886 234.150604,580.509155 C227.561844,579.173218 220.569275,579.731567 213.756409,579.624756 C206.425217,579.509705 204.933868,578.377625 202.949631,571.317688 C198.555267,555.682495 193.348175,540.236267 189.768097,524.419800 C181.796997,489.204224 189.348877,457.862457 214.859894,431.438812 C226.968765,418.896759 240.511047,408.254181 257.459167,403.813934 C269.402069,400.684967 281.948151,399.295868 294.314575,398.466766 C317.741333,396.896088 341.229706,396.212708 364.698547,395.320190 C371.983948,395.043121 372.192688,395.563141 372.294495,402.901581 C372.632019,427.225555 372.778168,451.556244 373.499512,475.869476 C373.992096,492.472473 371.587128,508.386780 364.750916,523.957153z" />
      </svg>

      <div className="flex items-center gap-5">
        <a href="#waitlist" className="text-[13px] text-citral-teal/80 font-medium hover:text-citral-teal transition-colors duration-150">
          Get Notified
        </a>
        <a href="mailto:prateek@citral.ai" className="text-[13px] text-[#4a5a60] font-medium hover:text-[#8a9aa0] transition-colors duration-150">
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
