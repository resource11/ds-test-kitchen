import styles from './Badge.module.css';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = React.ComponentProps<'span'> & {
  /** Tone of the badge. */
  variant?: BadgeVariant;
  /** Controls padding and text size. */
  size?: BadgeSize;
};

/**
 * A small status or counter label. Non-interactive by design, so it renders a
 * plain `<span>` and there is no Base UI primitive to wrap.
 */
export function Badge({ variant = 'neutral', size = 'md', className, ...props }: BadgeProps) {
  const classes = [styles.root, styles[variant], styles[size], className ?? '']
    .filter(Boolean)
    .join(' ');

  return <span className={classes} {...props} />;
}
