import { Field } from '@base-ui/react/field';
import { Slider as BaseSlider, type SliderRootProps } from '@base-ui/react/slider';
import styles from './Slider.module.css';

export type SliderProps = Omit<SliderRootProps, 'className'> & {
  /** Visible label. Always provide one. */
  label: string;
  /** Helper text shown under the track. */
  description?: string;
  /** Render the current value next to the label. */
  showValue?: boolean;
  /** Class applied to the wrapper. */
  className?: string;
};

/**
 * A value picked from a continuous range. Base UI owns the pointer maths,
 * keyboard steps and the hidden range input; this wrapper adds the label,
 * the optional value output and the visual skin.
 *
 * Pass an array to `value` or `defaultValue` for a range slider: one thumb
 * is rendered per value.
 */
export function Slider({
  label,
  description,
  showValue = false,
  className,
  ...props
}: SliderProps) {
  const currentValue = props.value ?? props.defaultValue;
  const thumbCount =
    currentValue === undefined || typeof currentValue === 'number' ? 1 : currentValue.length;
  const isRange = thumbCount > 1;

  return (
    <Field.Root className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      <BaseSlider.Root className={styles.slider} {...props}>
        <div className={styles.header}>
          {/* A range slider has one input per thumb, so its label names the
              group rather than a single control. */}
          <Field.Label
            className={styles.label}
            render={isRange ? <div /> : undefined}
            nativeLabel={!isRange}
          >
            {label}
          </Field.Label>
          {showValue ? <BaseSlider.Value className={styles.value} /> : null}
        </div>
        <BaseSlider.Control className={styles.control}>
          <BaseSlider.Track className={styles.track}>
            <BaseSlider.Indicator className={styles.indicator} />
            {Array.from({ length: thumbCount }, (_unused, index) => (
              <BaseSlider.Thumb
                key={index}
                index={index}
                className={styles.thumb}
                getAriaLabel={isRange ? (thumbIndex) => `${label} ${thumbIndex + 1}` : undefined}
              />
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
