import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import styles from './Toggle.module.css';

export type ToggleVariant = 'secondary' | 'ghost';
export type ToggleSize = 'sm' | 'md' | 'lg';

type BaseToggleProps = React.ComponentPropsWithoutRef<typeof BaseToggle>;

export type ToggleProps = Omit<BaseToggleProps, 'className'> & {
  /** Visual weight. Mirrors the matching `Button` variants. */
  variant?: ToggleVariant;
  /** Controls height and text size, matching `Button`. */
  size?: ToggleSize;
  /** Square the button off for icon-only usage. */
  iconOnly?: boolean;
  className?: string;
};

/**
 * A button that stays pressed — bold, mute, "show archived". Unlike `Button`
 * it carries state, and unlike `Switch` it reads as part of a toolbar rather
 * than a settings row.
 *
 * The pressed state comes from Base UI as `[data-pressed]`, so nothing is
 * tracked in React here. Wrap several in `ToggleGroup` for a single- or
 * multi-select set.
 */
export function Toggle({
  variant = 'secondary',
  size = 'md',
  iconOnly = false,
  className,
  ...props
}: ToggleProps) {
  const classes = [
    styles.root,
    styles[variant],
    styles[size],
    iconOnly ? styles.iconOnly : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <BaseToggle className={classes} {...props} />;
}
