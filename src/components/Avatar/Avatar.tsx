import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

type BaseAvatarRootProps = React.ComponentPropsWithoutRef<typeof BaseAvatar.Root>;

export type AvatarProps = Omit<BaseAvatarRootProps, 'className' | 'children'> & {
  /** Image source. Omit it to always render the fallback. */
  src?: string;
  /** Alternative text for the image. Required whenever `src` is set. */
  alt?: string;
  /** Shown while the image loads, when it fails, or when there is no `src`. */
  fallback?: React.ReactNode;
  /** Diameter of the avatar, taken from the space scale. */
  size?: AvatarSize;
  /** Milliseconds to wait before showing the fallback, to avoid a flash. */
  fallbackDelay?: number;
  className?: string;
};

/** Neutral person glyph used when no initials are supplied. */
function PersonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="5.5" r="2.75" />
      <path d="M2.75 13.25a5.25 5.25 0 0 1 10.5 0" />
    </svg>
  );
}

/**
 * Displays a person or entity as a circular image, with a graceful fallback
 * to initials or a glyph when the image is missing or fails to load.
 *
 * The loading state is tracked by Base UI, so a broken `src` swaps to the
 * fallback without any state handling here.
 */
export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  fallbackDelay,
  className,
  ...props
}: AvatarProps) {
  const classes = [styles.root, styles[size], className ?? ''].filter(Boolean).join(' ');

  return (
    <BaseAvatar.Root className={classes} {...props}>
      {src ? <BaseAvatar.Image className={styles.image} src={src} alt={alt} /> : null}
      <BaseAvatar.Fallback className={styles.fallback} delay={fallbackDelay}>
        {fallback ?? <PersonIcon />}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
