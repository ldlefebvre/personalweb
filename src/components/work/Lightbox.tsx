import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export interface LightboxImage {
  src: string;
  caption?: string;
}

interface Props {
  images: LightboxImage[];
}

/*
  Accessible, Motion-powered image lightbox.
  - Opens via a `open-lightbox` CustomEvent ({ detail: { index } }) so Astro can
    render optimized thumbnails and just trigger this overlay.
  - Keyboard: Esc closes, ArrowLeft/Right navigate.
  - Focus is trapped inside the dialog and restored to the trigger on close.
  - Respects prefers-reduced-motion. Supports drag-to-dismiss / swipe.
*/
export default function Lightbox({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { index?: number };
      triggerRef.current = (document.activeElement as HTMLElement) ?? null;
      setIndex(detail?.index ?? 0);
      setOpen(true);
    };
    window.addEventListener("open-lightbox", onOpen);
    return () => window.removeEventListener("open-lightbox", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Tab") {
        // Simple focus trap within the dialog
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    // Move focus into the dialog
    const id = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    }, 30);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
      triggerRef.current?.focus?.();
    };
  }, [open, close, next, prev]);

  const current = images[index];
  const dur = reduce ? 0 : 0.22;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-bg-2/92 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur }}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          ref={dialogRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
            <span className="font-mono text-sm text-text-muted">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              data-close
              onClick={close}
              aria-label="Close image viewer"
              className="grid size-11 place-items-center rounded-full border border-border bg-surface/60 text-text transition-colors hover:border-primary hover:text-primary"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-4 sm:px-6">
            {images.length > 1 && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 z-10 grid size-12 place-items-center rounded-full border border-border bg-surface/60 text-text transition-colors hover:border-primary hover:text-primary sm:left-5"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                className="flex max-h-full max-w-full flex-col items-center gap-3"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
                transition={{ duration: dur }}
                drag={images.length > 1 && !reduce ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) next();
                  else if (info.offset.x > 80) prev();
                }}
              >
                <img
                  src={current.src}
                  alt={current.caption ?? ""}
                  className="max-h-[72vh] w-auto max-w-full rounded-xl border border-border object-contain shadow-glow-soft"
                  draggable={false}
                />
                {current.caption && (
                  <figcaption className="max-w-xl text-center text-sm text-text-muted">
                    {current.caption}
                  </figcaption>
                )}
              </motion.figure>
            </AnimatePresence>

            {images.length > 1 && (
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 z-10 grid size-12 place-items-center rounded-full border border-border bg-surface/60 text-text transition-colors hover:border-primary hover:text-primary sm:right-5"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
