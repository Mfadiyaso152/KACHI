export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Circular Emblem */}
      <div className="relative w-9 h-9 md:w-10 md:h-10 bg-[#f4f4f1] rounded-full p-1.5 flex items-center justify-center shadow-md border border-gray-300 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#111318]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Circle */}
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="6" />
          
          {/* Inner Geometric Monogram & Arrow */}
          <path d="M22 68L50 34L78 68" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M42 50L68 22H84" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M70 22H84V36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 36H56" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M35 52H65" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          
          {/* Japanese Kanji 勝 in center */}
          <text x="50" y="72" textAnchor="middle" fill="currentColor" fontSize="22" fontWeight="bold" fontFamily="serif">勝</text>
        </svg>
      </div>

      {showText && (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-lg md:text-xl font-black text-white">كاتشي</span>
          <span className="text-base md:text-lg font-bold text-gray-300 font-mono">KACHI</span>
        </div>
      )}
    </div>
  );
}

