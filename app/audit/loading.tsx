export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-1 items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="relative grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-accent to-[#818cf8] shadow-[0_0_24px_-4px_rgba(94,106,210,0.7)]">
          <span className="text-[15px] font-semibold leading-none text-white">S</span>
          <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
        </span>
        <p className="text-[13px] text-fg-muted">Preparing your audit…</p>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-accent to-[#818cf8]" />
        </div>
      </div>
    </div>
  );
}
