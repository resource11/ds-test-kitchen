import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { Field } from '@base-ui/react/field';
import styles from './CheckboxGroup.module.css';

type BaseCheckboxGroupProps = React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>;

export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

export type CheckboxGroupProps = Omit<BaseCheckboxGroupProps, 'className'> & {
  /** Visible group label. Always provide one. */
  label: string;
  /** Helper text shown under the group label. */
  description?: string;
  /** How the checkboxes are laid out. */
  orientation?: CheckboxGroupOrientation;
  /** Identifies the group when a form is submitted. */
  name?: string;
  /** Class applied to the wrapper. */
  className?: string;
};

/**
 * Shares one value array across a set of `Checkbox` children. Each child
 * needs a `name` (or `value`) so the group can track which are ticked.
 *
 * `Field.Root` supplies the accessible name, description and error message;
 * Base UI's `CheckboxGroup` renders the `role="group"` container.
 */
export function CheckboxGroup({
  label,
  description,
  orientation = 'vertical',
  name,
  className,
  ...props
}: CheckboxGroupProps) {
  return (
    <Field.Root name={name} className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      <Field.Label render={<div />} className={styles.label}>
        {label}
      </Field.Label>
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <BaseCheckboxGroup
        className={[styles.group, orientation === 'horizontal' ? styles.horizontal : '']
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
