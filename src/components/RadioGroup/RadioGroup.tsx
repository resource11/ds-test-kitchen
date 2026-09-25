import { Field } from '@base-ui/react/field';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import styles from './RadioGroup.module.css';

type BaseRadioGroupProps = React.ComponentPropsWithoutRef<typeof BaseRadioGroup>;
type BaseRadioRootProps = React.ComponentPropsWithoutRef<typeof Radio.Root>;

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export type RadioGroupProps = Omit<BaseRadioGroupProps, 'className'> & {
  /** Visible group label. Always provide one. */
  label: string;
  /** Helper text shown under the group label. */
  description?: string;
  /** How the options are laid out. */
  orientation?: RadioGroupOrientation;
  /** Class applied to the wrapper. */
  className?: string;
};

export type RadioGroupItemProps = Omit<BaseRadioRootProps, 'className'> & {
  /** Visible label for this option. */
  label: string;
  /** Helper text shown under the option label. */
  description?: string;
  /** Class applied to the option wrapper. */
  className?: string;
};

/**
 * A single option inside `RadioGroup`. `Field.Item` gives each option its own
 * label and description wiring, which is what keeps the generated ids unique
 * when several options share one field.
 */
export function RadioGroupItem({ label, description, className, ...props }: RadioGroupItemProps) {
  return (
    <Field.Item className={[styles.item, className ?? ''].filter(Boolean).join(' ')}>
      <Radio.Root className={styles.radio} {...props}>
        <Radio.Indicator className={styles.dot} />
      </Radio.Root>
      <div className={styles.text}>
        <Field.Label className={styles.itemLabel}>{label}</Field.Label>
        {description ? (
          <Field.Description className={styles.itemDescription}>{description}</Field.Description>
        ) : null}
      </div>
    </Field.Item>
  );
}

/**
 * A set of mutually exclusive options. Base UI handles roving focus and the
 * `role="radiogroup"` container; `Field.Root` supplies the accessible name,
 * description and validation message.
 *
 * Compose it with `RadioGroupItem` children.
 */
export function RadioGroup({
  label,
  description,
  orientation = 'vertical',
  className,
  ...props
}: RadioGroupProps) {
  return (
    <Field.Root className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      {/* A group of radios has no single control for a <label> to point at, so
          the label renders as a <div> and tells Base UI it is not a native label. */}
      <Field.Label render={<div />} nativeLabel={false} className={styles.label}>
        {label}
      </Field.Label>
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <BaseRadioGroup
        className={[styles.group, orientation === 'horizontal' ? styles.horizontal : '']
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
