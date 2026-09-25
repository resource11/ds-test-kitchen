import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { Field } from '@base-ui/react/field';
import styles from './Switch.module.css';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> {
  /** Text shown next to the control. */
  label?: string;
  /** Helper text shown under the label, announced as the switch's description. */
  description?: string;
}

/**
 * A binary on/off control. Prefer this over a checkbox when the change
 * takes effect immediately rather than on submit.
 *
 * `label` and `description` are wired up by Base UI's `Field` parts, so the
 * control gets `aria-labelledby` and `aria-describedby` from the primitive
 * rather than from hand-rolled ids.
 *
 * Note the wrapper is `Field.Root`, not the `Field.Item` that `Checkbox` uses.
 * `Field.Item` does provide the `LabelableProvider` that `Field.Description`
 * registers its id into, but whether a control reads those ids back is up to
 * the control: `CheckboxRoot` lists `getDescriptionProps` directly among its own
 * props (see `checkbox/root/CheckboxRoot.js`), whereas `SwitchRoot` reaches them
 * only through `validation.getValidationProps` (see `switch/root/SwitchRoot.js`),
 * which is the identity function outside a `Field.Root` (see the default context
 * value in `internals/field-root-context/FieldRootContext.js`). `Field.Root`
 * wraps its inner component in its own `LabelableProvider`, so there
 * `getValidationProps` closes over the same message ids the description
 * registered. With `Field.Item` the label would be wired and the description
 * silently would not.
 */
export function Switch({ label, description, className, ...props }: SwitchProps) {
  const control = (
    <BaseSwitch.Root
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      <BaseSwitch.Thumb className={styles.thumb} />
    </BaseSwitch.Root>
  );

  if (!label && !description) return control;

  return (
    <Field.Root className={styles.wrapper}>
      {control}
      <div className={styles.text}>
        {label ? <Field.Label className={styles.label}>{label}</Field.Label> : null}
        {description ? (
          <Field.Description className={styles.description}>{description}</Field.Description>
        ) : null}
      </div>
    </Field.Root>
  );
}
