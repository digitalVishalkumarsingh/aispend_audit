export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-1 items-center justify-center">
      <div className="flex items-center gap-3 text-fg-muted">
        <span className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-accent to-[#818cf8] shadow-[0_0_18px_-4px_rgba(94,106,210,0.7)]">
          <span className="text-[13px] font-semibold leading-none text-white">S</span>
          <span className="absolute inset-0 rounded-md ring-1 ring-inset ring-white/20" />
        </span>
        <span className="text-[13px]">Loading…</span>
        <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
      </div>
    </div>
  );
}
