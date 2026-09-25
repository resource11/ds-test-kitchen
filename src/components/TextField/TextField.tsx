import { Field } from '@base-ui/react/field';
import { Input } from '@base-ui/react/input';
import styles from './TextField.module.css';

export interface TextFieldProps extends React.ComponentPropsWithoutRef<typeof Input> {
  /** Visible label. Always provide one. */
  label: string;
  /** Helper text shown under the control. */
  description?: string;
  /** Field name, used by `Form` for validation and submission. */
  name?: string;
}

/**
 * A labelled text input. Base UI's `Field` wires the label, description
 * and validation message to the control for us, so accessibility is
 * handled by the primitive rather than by convention.
 */
export function TextField({ label, description, name, className, ...props }: TextFieldProps) {
  return (
    <Field.Root name={name} className={styles.root}>
      <Field.Label className={styles.label}>{label}</Field.Label>
      <Field.Control
        render={<Input className={[styles.control, className ?? ''].filter(Boolean).join(' ')} />}
        {...props}
      />
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
