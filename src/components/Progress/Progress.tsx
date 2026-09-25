import { Progress as BaseProgress } from '@base-ui/react/progress';
import styles from './Progress.module.css';

export type ProgressSize = 'sm' | 'md';

type BaseProgressRootProps = React.ComponentPropsWithoutRef<typeof BaseProgress.Root>;

export type ProgressProps = Omit<BaseProgressRootProps, 'className' | 'children'> & {
  /** Accessible label rendered above the track. */
  label?: string;
  /** Render the formatted value opposite the label. */
  showValue?: boolean;
  /** Thickness of the track. */
  size?: ProgressSize;
  className?: string;
};

/**
 * Communicates how far along a task is — an upload, an import, a migration.
 * Something is happening and it will finish.
 *
 * Pass `value={null}` when the duration is unknown; Base UI marks the bar
 * `[data-indeterminate]` and the indicator animates instead of filling.
 * For a static measurement that is not a task in progress, use `Meter`.
 */
export function Progress({
  label,
  showValue = false,
  size = 'md',
  className,
  ...props
}: ProgressProps) {
  const classes = [styles.root, styles[size], className ?? ''].filter(Boolean).join(' ');
  const hasHeader = Boolean(label) || showValue;

  return (
    <BaseProgress.Root className={classes} {...props}>
      {hasHeader ? (
        <span className={styles.header}>
          {label ? <BaseProgress.Label className={styles.label}>{label}</BaseProgress.Label> : null}
          {showValue ? <BaseProgress.Value className={styles.value} /> : null}
        </span>
      ) : null}
      <BaseProgress.Track className={styles.track}>
        <BaseProgress.Indicator className={styles.indicator} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
