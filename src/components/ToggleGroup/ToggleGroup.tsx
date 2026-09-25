import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import styles from './ToggleGroup.module.css';

type BaseToggleGroupProps = React.ComponentPropsWithoutRef<typeof BaseToggleGroup>;

export type ToggleGroupProps = Omit<BaseToggleGroupProps, 'className'> & {
  /**
   * Render as a segmented control: one joined track, no gaps, the pressed
   * item lifted onto the surface. Use it when the options are alternative
   * views of the same thing; leave it off for an editor toolbar.
   */
  segmented?: boolean;
  className?: string;
};

/**
 * Shared state for a row of `Toggle` buttons. `multiple={false}` (the
 * default) behaves like a radio group — pressing one unpresses the rest;
 * `multiple` lets any number be pressed at once.
 *
 * Arrow-key roving focus comes from Base UI, so the whole set is one tab
 * stop. Pressed items expose `[data-pressed]`.
 */
export function ToggleGroup({ segmented = false, className, ...props }: ToggleGroupProps) {
  const classes = [styles.root, segmented ? styles.segmented : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return <BaseToggleGroup className={classes} {...props} />;
}
