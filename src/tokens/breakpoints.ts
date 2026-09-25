/**
 * GENERATED FILE — do not edit.
 * Source: tokens/tier-1-definitions/breakpoint.json
 * Regenerate with: npm run build:tokens
 */
/** A CSS custom property cannot be used in a media query, so breakpoints
 *  are consumed from here rather than from a var(). */
export const breakpoints = {
  sm: '30rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
} as const;

export type Breakpoint = keyof typeof breakpoints;
