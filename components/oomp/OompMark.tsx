export function OompMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <path d="M20 4 34 12v16l-14 8L6 28V12L20 4Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="m12 15 8-4 8 4v10l-8 4-8-4V15Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="m6 12 14 8 14-8M20 20v16m-8-21 8 5 8-5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
    </svg>
  );
}
