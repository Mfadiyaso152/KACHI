export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
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
        <div className="flex items-center gap-2.5 leading-none">
          {/* Arabic Name */}
          <span className="text-xl md:text-2xl font-black text-white tracking-normal translate-y-[-1px]">
            كاتشي
          </span>

          {/* Stylized English Name: KACHI with A without middle horizontal bar (KΛCHI) with strict LTR direction */}
          <span dir="ltr" className="text-lg md:text-xl font-black text-white tracking-wider flex items-center gap-[0.5px] font-sans">
            <span>K</span>
            {/* Custom geometric 'A' without the middle crossbar (Λ chevron) */}
            <span className="inline-block relative w-[13px] h-[17px] mx-[0.5px]">
              <svg viewBox="0 0 20 26" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M2 24 L10 3 L18 24" />
              </svg>
            </span>
            <span>CHI</span>
          </span>
        </div>
      )}
    </div>
  );
}
