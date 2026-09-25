import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export type AlertProps = React.ComponentProps<'div'> & {
  /** Tone of the message. Also decides the icon and the ARIA role. */
  variant?: AlertVariant;
  /** Short headline. Rendered above the body copy. */
  title: string;
  /** Called when the dismiss button is pressed. Omit it and no button renders. */
  onDismiss?: () => void;
  /** Accessible name for the dismiss button. */
  dismissLabel?: string;
};

function InfoIcon() {
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
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7.25v4" />
      <path d="M8 4.75h.01" />
    </svg>
  );
}

function SuccessIcon() {
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
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.25 8.25 7.25 10.25 10.75 6" />
    </svg>
  );
}

/** A diamond, not a triangle: `danger` already owns the triangle in this set. */
function WarningIcon() {
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
      <path d="M8.7 1.75a1 1 0 0 0-1.4 0L1.75 7.3a1 1 0 0 0 0 1.4l5.55 5.55a1 1 0 0 0 1.4 0l5.55-5.55a1 1 0 0 0 0-1.4Z" />
      <path d="M8 5.25v3.25" />
      <path d="M8 11h.01" />
    </svg>
  );
}

function DangerIcon() {
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
      <path d="M7.13 2.4 1.6 12a1 1 0 0 0 .87 1.5h11.06a1 1 0 0 0 .87-1.5L8.87 2.4a1 1 0 0 0-1.74 0Z" />
      <path d="M8 6v3" />
      <path d="M8 11.25h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

const icons: Record<AlertVariant, () => React.ReactElement> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
};

/**
 * An inline message block. Base UI ships no alert primitive because there is no
 * interaction logic to own: the whole job is semantics. `info`, `success` and
 * `warning` announce politely with `role="status"`; only `danger` interrupts
 * with `role="alert"`, because that is the one tone that is worth cutting a
 * screen reader off mid-sentence for.
 */
export function Alert({
  variant = 'info',
  title,
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
  children,
  ...props
}: AlertProps) {
  const classes = [styles.root, styles[variant], className ?? ''].filter(Boolean).join(' ');
  const Icon = icons[variant];

  return (
    <div className={classes} role={variant === 'danger' ? 'alert' : 'status'} {...props}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {children ? <div className={styles.body}>{children}</div> : null}
      </div>
      {onDismiss ? (
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label={dismissLabel}>
          <CloseIcon />
        </button>
      ) : null}
    </div>
  );
}
