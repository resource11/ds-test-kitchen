import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerProps = React.ComponentProps<'span'> & {
  /** Diameter of the indicator. */
  size?: SpinnerSize;
  /**
   * Accessible name. Announced by screen readers via `role="status"`, so it
   * should say what is loading when the default is too vague.
   */
  'aria-label'?: string;
};

/**
 * An indeterminate loading indicator. No Base UI primitive: it is an animated
 * SVG plus one ARIA role. The animation is slowed to a near-stop under
 * `prefers-reduced-motion: reduce` rather than removed, so the indicator still
 * reads as "busy" for users who ask for less motion.
 */
export function Spinner({
  size = 'md',
  className,
  'aria-label': ariaLabel = 'Loading',
  ...props
}: SpinnerProps) {
  const classes = [styles.root, styles[size], className ?? ''].filter(Boolean).join(' ');

  return (
    <span className={classes} role="status" aria-live="polite" aria-label={ariaLabel} {...props}>
      <svg
        className={styles.svg}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle className={styles.track} cx="8" cy="8" r="6.5" />
        <circle className={styles.indicator} cx="8" cy="8" r="6.5" />
      </svg>
    </span>
  );
}
