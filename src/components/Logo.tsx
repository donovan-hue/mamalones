export default function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Caja Seca */}
        <rect x="5" y="8" width="65" height="22" rx="2" stroke="white" strokeWidth="2.5" fill="black" />
        <line x1="12" y1="8" x2="12" y2="30" stroke="#333" strokeWidth="1" />
        <line x1="25" y1="8" x2="25" y2="30" stroke="#333" strokeWidth="1" />
        <line x1="38" y1="8" x2="38" y2="30" stroke="#333" strokeWidth="1" />
        <line x1="51" y1="8" x2="51" y2="30" stroke="#333" strokeWidth="1" />
        
        {/* Tractocamión / Cabina */}
        <path d="M70 14 H88 L98 22 V30 H70 Z" stroke="white" strokeWidth="2.5" fill="black" strokeLinejoin="round" />
        <path d="M85 16 L92 22 H85 Z" fill="white" />
        
        {/* Llantas */}
        <circle cx="18" cy="31" r="3.5" fill="white" />
        <circle cx="28" cy="31" r="3.5" fill="white" />
        <circle cx="55" cy="31" r="3.5" fill="white" />
        <circle cx="78" cy="31" r="3.5" fill="white" />
        <circle cx="89" cy="31" r="3.5" fill="white" />
      </svg>
      <span className="font-extrabold text-lg tracking-wider text-white">
        kronos-space<span className="text-zinc-500">.com</span>
      </span>
    </div>
  )
}
