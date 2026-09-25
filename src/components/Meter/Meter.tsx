import { Meter as BaseMeter } from '@base-ui/react/meter';
import styles from './Meter.module.css';

export type MeterVariant = 'accent' | 'danger';
export type MeterSize = 'sm' | 'md';

type BaseMeterRootProps = React.ComponentPropsWithoutRef<typeof BaseMeter.Root>;

export type MeterProps = Omit<BaseMeterRootProps, 'className' | 'children'> & {
  /** Accessible label rendered above the track. */
  label?: string;
  /** Render the formatted value opposite the label. */
  showValue?: boolean;
  /** Thickness of the track. */
  size?: MeterSize;
  /**
   * Colour of the fill. Switch to `danger` once the reading crosses whatever
   * threshold matters for the measurement (disk nearly full, quota nearly
   * spent), so the colour carries the same news as the number. Named
   * `variant` like every other component's colour choice.
   */
  variant?: MeterVariant;
  className?: string;
};

/**
 * A **static measurement** inside a known range — disk used, quota consumed,
 * a score out of ten, battery level. It is a reading, not a task.
 *
 * This is deliberately not `Progress`. `Progress` says "this job is running
 * and will finish"; `Meter` says "this is how full the thing is right now".
 * A meter has no notion of completion, cannot be indeterminate, and a high
 * value is often bad news rather than good — which is why `variant` exists.
 * If the bar would ever go backwards, you want a `Meter`.
 *
 * Rendered with `role="meter"` by Base UI, so screen readers announce it as
 * a measurement rather than a progress bar.
 */
export function Meter({
  label,
  showValue = false,
  size = 'md',
  variant = 'accent',
  className,
  ...props
}: MeterProps) {
  const classes = [styles.root, styles[size], styles[variant], className ?? '']
    .filter(Boolean)
    .join(' ');
  const hasHeader = Boolean(label) || showValue;

  return (
    <BaseMeter.Root className={classes} {...props}>
      {hasHeader ? (
        <span className={styles.header}>
          {label ? <BaseMeter.Label className={styles.label}>{label}</BaseMeter.Label> : null}
          {showValue ? <BaseMeter.Value className={styles.value} /> : null}
        </span>
      ) : null}
      <BaseMeter.Track className={styles.track}>
        <BaseMeter.Indicator className={styles.indicator} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
