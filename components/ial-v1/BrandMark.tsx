/** Faithful vector derivative of the founder-supplied official artwork. */
export function BrandMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return <picture className={`block shrink-0 ${className}`} style={{ width: size, height: size }}><source type="image/svg+xml" srcSet="/ial-v1/brand/mark.svg" /><img src="/ial-v1/brand/mark-96.png" width={size} height={size} className="block h-full w-full object-contain" alt="Indus Automation Labs hexagonal A mark" data-ial-brand /></picture>;
}
