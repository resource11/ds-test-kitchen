import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Field } from '@base-ui/react/field';
import styles from './Checkbox.module.css';

type BaseCheckboxRootProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>;

export type CheckboxProps = Omit<BaseCheckboxRootProps, 'className'> & {
  /** Visible label shown beside the box. */
  label?: string;
  /** Helper text shown under the label. */
  description?: string;
  /** Class applied to the wrapper. */
  className?: string;
};

/**
 * A single tick box. `Field.Item` supplies the label and description wiring,
 * so the control gets `aria-labelledby` and `aria-describedby` from the
 * primitive rather than from hand-rolled ids.
 *
 * Drop several of these inside `CheckboxGroup` to share one value array;
 * give each one a `name` (or `value`) so the group can track it.
 */
export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
  return (
    <Field.Item className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      <BaseCheckbox.Root className={styles.control} {...props}>
        <BaseCheckbox.Indicator className={styles.indicator}>
          <svg
            className={styles.tick}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
          <svg
            className={styles.dash}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 8h8" />
          </svg>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label || description ? (
        <div className={styles.text}>
          {label ? <Field.Label className={styles.label}>{label}</Field.Label> : null}
          {description ? (
            <Field.Description className={styles.description}>{description}</Field.Description>
          ) : null}
        </div>
      ) : null}
    </Field.Item>
  );
}
