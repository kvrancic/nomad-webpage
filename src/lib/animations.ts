import { Variants, Transition } from 'framer-motion'

// Easing curves
export const easings = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.68, -0.55, 0.265, 1.55],
  snappy: [0.25, 0.1, 0.25, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
}

// Duration presets
export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  verySlow: 1.2,
}

// Common transitions
export const transitions: Record<string, Transition> = {
  smooth: {
    duration: durations.slow,
    ease: easings.smooth,
  },
  snappy: {
    duration: durations.normal,
    ease: easings.snappy,
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  springBounce: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  },
}

// Fade variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
}

// Scale variants
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
}

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

// Text reveal (character by character)
export const textRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
}

export const textRevealCharacter: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
}

// Page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.easeIn,
    },
  },
}

// Hover animations
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: easings.snappy },
}

export const hoverScaleLarge = {
  scale: 1.05,
  transition: { duration: 0.3, ease: easings.snappy },
}

export const tapScale = {
  scale: 0.98,
}

// Card hover
export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    transition: { duration: 0.3, ease: easings.snappy },
  },
}

// Image zoom on hover
export const imageZoom: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: easings.smooth },
  },
}

// Underline animation (for nav links)
export const underline: Variants = {
  rest: { scaleX: 0, originX: 0.5 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: easings.snappy },
  },
}

// Slide variants for mobile menu
export const slideInRight: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: easings.easeIn,
    },
  },
}

// Accordion content
export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: easings.smooth },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: easings.smooth },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
}

// Parallax helper
export function getParallaxOffset(scrollY: number, rate: number = 0.5): number {
  return scrollY * rate
}
