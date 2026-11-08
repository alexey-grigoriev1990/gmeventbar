'use client';

import { useEffect, type RefObject } from 'react';

/** Shared choreography keeps every page readable without JavaScript or motion. */
export function useScrollMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const site = root.current;
    if (!site || !('IntersectionObserver' in window)) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const targets = Array.from(site.querySelectorAll<HTMLElement>(
      '[data-reveal], .section-top, .additional-heading, .contact-title, .contact-info, .footer-bottom, .faq, .product-intro, .product-photo, .product-overview, .product-offer article, .product-cost>div, .other-formats'
    ));
    const headings = Array.from(site.querySelectorAll<HTMLElement>('.section h2, .additional-heading h3'));
    const portraits = Array.from(site.querySelectorAll<HTMLElement>('.founder-photo'));
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.motionVisible = 'true';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -36px 0px' });
    targets.forEach((node, index) => {
      node.dataset.motion = 'reveal';
      node.style.setProperty('--reveal-delay', `${index % 3 * 55}ms`);
      if (node.getBoundingClientRect().top > innerHeight - 40) {
        node.dataset.motionVisible = 'false';
        observer.observe(node);
      } else node.dataset.motionVisible = 'true';
      // Supersede the former one-time reveal so two transforms never compete.
      node.removeAttribute('data-reveal');
      node.removeAttribute('data-visible');
    });
    const update = () => {
      frame = 0;
      const reduced = preference.matches;
      headings.forEach(node => {
        const section = node.closest('section, footer')!;
        const rect = section.getBoundingClientRect();
        if (!reduced && (rect.bottom < 0 || rect.top > innerHeight)) return;
        const progress = Math.max(-1, Math.min(1, (innerHeight * .5 - rect.top) / innerHeight));
        node.dataset.scrollHeading = '';
        node.style.setProperty('--heading-drift', reduced ? '0px' : `${progress * (innerWidth < 641 ? -16 : -38)}px`);
      });
      portraits.forEach(node => {
        const rect = node.closest('.founders-grid')!.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
        node.style.setProperty('--portrait-scale', reduced ? '1' : String(1.055 - progress * .055));
      });
      if (reduced) targets.forEach(node => { node.dataset.motionVisible = 'true'; });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    update();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule); removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, [root]);
}
