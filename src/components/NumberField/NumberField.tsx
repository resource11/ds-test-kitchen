import { Field } from '@base-ui/react/field';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import styles from './NumberField.module.css';

type BaseNumberFieldRootProps = React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>;

export type NumberFieldProps = Omit<BaseNumberFieldRootProps, 'className'> & {
  /** Visible label. Always provide one. */
  label: string;
  /** Helper text shown under the control. */
  description?: string;
  /** Class applied to the wrapper. */
  className?: string;
};

/**
 * A numeric input with stepper buttons. Base UI handles parsing, clamping,
 * locale formatting and the keyboard and scrub interactions; the label is
 * wrapped in `ScrubArea` so dragging it changes the value.
 *
 * The stepper buttons carry their own `aria-label` from the primitive, so
 * they are deliberately not labelled again here.
 */
export function NumberField({ label, description, className, ...props }: NumberFieldProps) {
  return (
    <Field.Root className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      <BaseNumberField.Root className={styles.field} {...props}>
        <BaseNumberField.ScrubArea className={styles.scrubArea}>
          <Field.Label className={styles.label}>{label}</Field.Label>
          {/* Scrubbing takes a pointer lock, which hides the OS cursor; this
              stands in for it while the value is being dragged. */}
          <BaseNumberField.ScrubAreaCursor className={styles.scrubAreaCursor}>
            <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden="true">
              <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
            </svg>
          </BaseNumberField.ScrubAreaCursor>
        </BaseNumberField.ScrubArea>
        <BaseNumberField.Group className={styles.group}>
          <BaseNumberField.Decrement className={styles.button}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3.5 8h9" />
            </svg>
          </BaseNumberField.Decrement>
          <BaseNumberField.Input className={styles.input} />
          <BaseNumberField.Increment className={styles.button}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M8 3.5v9M3.5 8h9" />
            </svg>
          </BaseNumberField.Increment>
        </BaseNumberField.Group>
      </BaseNumberField.Root>
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
