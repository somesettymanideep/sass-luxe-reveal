# Plan: Add Scroll Animations to Contact Page

Add Wow.js-style scroll animations (backInLeft, backInRight) to the contact page using Framer Motion.

## User Review Required

> [!IMPORTANT]
> I will be using `framer-motion` for these animations as it's the standard for modern React (TanStack Start) applications and provides more reliable control over viewport triggering than traditional Wow.js/Animate.css combos.

## Proposed Changes

### Animation System
- Define `backInLeft` and `backInRight` variants in `src/lib/motion.ts` (or equivalent utility).
- Ensure smooth entrance with opacity and scale/transform adjustments.

### Contact Components
- **PageHero**: Add a subtle entrance animation for the main title and breadcrumbs.
- **AppointmentForm**: Apply `backInLeft` animation so it slides in from the left as the user scrolls to it.
- **ContactInfo**: Apply `backInRight` animation so it slides in from the right simultaneously.
- **Branches**: Apply staggered `backInUp` or similar professional reveals for the branch cards.

## Technical Details

- Use `motion.div` from `framer-motion`.
- Set `initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}`.
- Variants:
  - `backInLeft`: `x: -100, opacity: 0` -> `x: 0, opacity: 1` with a slight "back" bounce effect.
  - `backInRight`: `x: 100, opacity: 0` -> `x: 0, opacity: 1`.
