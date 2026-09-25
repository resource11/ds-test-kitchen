import { Separator as BaseSeparator } from '@base-ui/react/separator';
import styles from './Separator.module.css';

/**
 * A one-pixel rule that divides content. Wraps Base UI's `Separator`, which
 * renders `role="separator"` with the matching `aria-orientation`.
 *
 * A vertical separator stretches to the height of its flex parent, so give
 * that parent a height or let its content define one.
 */

export type SeparatorOrientation = 'horizontal' | 'vertical';

export type SeparatorProps = Omit<React.ComponentProps<typeof BaseSeparator>, 'className'> & {
  /** Extra classes merged onto the separator. */
  className?: string;
  /** Direction the rule runs in. @default 'horizontal' */
  orientation?: SeparatorOrientation;
};

export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
