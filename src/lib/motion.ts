/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal-on-scroll used across all sections for a consistent fade+blur-in.
 * Wrapped in gsap.matchMedia so prefers-reduced-motion users get instant,
 * unanimated content rather than being forced through the animation.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  opts: { stagger?: number; y?: number } = {}
) {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(
      targets,
      { opacity: 0, y: opts.y ?? 24, filter: 'blur(12px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        stagger: opts.stagger ?? 0,
        scrollTrigger: {
          trigger: Array.isArray(targets) ? (targets[0] as Element) : (targets as Element),
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  return mm;
}

/** Load-in reveal for above-the-fold content (no ScrollTrigger — plays immediately). */
export function revealOnLoad(
  targets: gsap.TweenTarget,
  opts: { stagger?: number; y?: number; delay?: number } = {}
) {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(
      targets,
      { opacity: 0, y: opts.y ?? 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: opts.stagger ?? 0.12,
        delay: opts.delay ?? 0.1,
      }
    );
  });

  return mm;
}
