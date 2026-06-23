/* ------------------------------------------------------------------ */
/*  @/components/motion — the shared motion system barrel.             */
/*  One easing/timing vocabulary + one set of primitives, used         */
/*  everywhere so the whole site feels like one premium product.       */
/* ------------------------------------------------------------------ */

// Tokens (single source of truth for easing / timing / palette)
export {
  EASE_OUT,
  EASE_INOUT,
  DUR,
  STAGGER,
  ACCENT,
  ACCENTS,
  SPRING_POP,
  VIEWPORT,
  fadeUp,
  staggerParent,
} from "./tokens"

// Primitives
export { Reveal, type RevealProps } from "./reveal"
export { RevealText, type RevealTextProps } from "./reveal-text"
export { Stagger, StaggerItem, type StaggerProps, type StaggerItemProps } from "./stagger"
export { GradientText, type GradientTextProps } from "./gradient-text"
export { ShineOverlay, type ShineOverlayProps } from "./shine-overlay"
export { SpotlightCard, type SpotlightCardProps } from "./spotlight-card"
export { TiltCard, type TiltCardProps } from "./tilt-card"
export { MagneticButton, type MagneticButtonProps } from "./magnetic-button"
export { GlowOrb, type GlowOrbProps } from "./glow-orb"
export { AmbientShape, type AmbientShapeProps } from "./ambient-shape"
export { AnimatedDivider, type AnimatedDividerProps } from "./animated-divider"
export { CountUp, type CountUpProps } from "./count-up"

// Hooks
export { useParallax, type UseParallaxOptions } from "./use-parallax"
