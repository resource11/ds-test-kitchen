import { Field } from '@base-ui/react/field';
import styles from './Textarea.module.css';

export type TextareaResize = 'none' | 'vertical';

export type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'className'> & {
  /** Visible label. Always provide one. */
  label: string;
  /** Helper text shown under the control. */
  description?: string;
  /** Field name, used by `Form` for validation and submission. */
  name?: string;
  /** Visible rows before the control scrolls. */
  rows?: number;
  /** Whether the user may drag the control taller. */
  resize?: TextareaResize;
  /** Class applied to the control. */
  className?: string;
};

/**
 * A multi-line text input. Base UI has no textarea primitive, so `Field.Control`
 * renders one instead of its default `<input>`: the label, description and
 * validation message stay wired by the primitive rather than by convention.
 */
export function Textarea({
  label,
  description,
  name,
  rows = 4,
  resize = 'vertical',
  className,
  ...props
}: TextareaProps) {
  const controlClasses = [
    styles.control,
    resize === 'none' ? styles.resizeNone : styles.resizeVertical,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Field.Root name={name} className={styles.root}>
      <Field.Label className={styles.label}>{label}</Field.Label>
      <Field.Control render={<textarea rows={rows} {...props} className={controlClasses} />} />
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
