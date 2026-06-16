/*
  Lightweight scroll-reveal: adds `.is-visible` to `.reveal` elements when they
  enter the viewport. Zero framework cost — pure IntersectionObserver.
  Honors prefers-reduced-motion and re-initializes after Astro view transitions.
*/
function setupReveal(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
  if (els.length === 0) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = el.dataset.revealDelay;
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add("is-visible");
        observer.unobserve(el);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  els.forEach((el) => observer.observe(el));
}

document.addEventListener("astro:page-load", setupReveal);
