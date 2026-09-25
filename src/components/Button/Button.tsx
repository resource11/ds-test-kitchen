import { Button as BaseButton } from '@base-ui/react/button';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

type BaseButtonProps = React.ComponentProps<typeof BaseButton>;

export type ButtonProps = React.ComponentProps<'button'> & {
  /** Visual weight of the button. */
  variant?: ButtonVariant;
  /** Controls height and text size. */
  size?: ButtonSize;
  /** Stretch to fill the available inline space. */
  fullWidth?: boolean;
  /** Replace the rendered element, e.g. to render a link. */
  render?: BaseButtonProps['render'];
};

/**
 * The primary action trigger. Built on Base UI's unstyled `Button`,
 * styled entirely with semantic design tokens.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const classes = [
    styles.root,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <BaseButton className={classes} {...props} />;
}
