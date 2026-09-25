import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import styles from './Fieldset.module.css';

/**
 * Groups related fields under a shared caption. Base UI associates the legend
 * with the `<fieldset>` for us, and `disabled` on the root cascades to every
 * control inside it.
 *
 * Usage:
 *   <Fieldset.Root>
 *     <Fieldset.Legend>Billing address</Fieldset.Legend>
 *     <TextField label="Street" name="street" />
 *   </Fieldset.Root>
 */

const cx = (...names: Array<string | undefined>) => names.filter(Boolean).join(' ');

export type FieldsetRootProps = React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>;

function Root({ className, ...props }: FieldsetRootProps) {
  return <BaseFieldset.Root className={cx(styles.root, className as string | undefined)} {...props} />;
}

export type FieldsetLegendProps = React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>;

function Legend({ className, ...props }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend className={cx(styles.legend, className as string | undefined)} {...props} />
  );
}

export const Fieldset = Object.assign(Root, {
  Root,
  Legend,
});
