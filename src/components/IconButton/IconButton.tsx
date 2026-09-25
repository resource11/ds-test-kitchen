import { Button as BaseButton } from '@base-ui/react/button';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

type BaseButtonProps = React.ComponentProps<typeof BaseButton>;

export type IconButtonProps = React.ComponentProps<'button'> & {
  /**
   * Accessible name, applied as `aria-label`. Required, not optional: an
   * icon-only button with no accessible name is the single most common
   * accessibility failure in design systems, because the visual meaning of the
   * glyph never reaches a screen reader. Making the prop required means the
   * type system catches it before review does.
   */
  label: string;
  /** Visual weight, matching `Button`. */
  variant?: IconButtonVariant;
  /** Square footprint: 32 / 40 / 48px, matching `Button` heights. */
  size?: IconButtonSize;
  /** Replace the rendered element, e.g. to render a link. */
  render?: BaseButtonProps['render'];
};

/**
 * A square, icon-only action. Built on the same Base UI `Button` primitive as
 * `Button`, so disabled handling and focus behaviour are identical; the only
 * differences are the square box and the required accessible name.
 */
export function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  className,
  ...props
}: IconButtonProps) {
  const classes = [styles.root, styles[variant], styles[size], className ?? '']
    .filter(Boolean)
    .join(' ');

  return <BaseButton className={classes} {...props} aria-label={label} />;
}
