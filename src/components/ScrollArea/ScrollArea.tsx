import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import styles from './ScrollArea.module.css';

/**
 * A scrollable region with custom scrollbars that overlay the content.
 * Wraps Base UI's `ScrollArea`, which keeps native scrolling, wheel and
 * touch behaviour while letting the scrollbar be styled with tokens.
 *
 * Give the root an explicit size (via `style`, `className` or a sized parent);
 * the viewport fills it.
 */

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export type ScrollAreaProps = Omit<
  React.ComponentProps<typeof BaseScrollArea.Root>,
  'className'
> & {
  /** Extra classes merged onto the root element. */
  className?: string;
  /** Which scrollbars to render. @default 'vertical' */
  orientation?: ScrollAreaOrientation;
  /** Extra classes merged onto the scrollable viewport. */
  viewportClassName?: string;
};

export function ScrollArea({
  orientation = 'vertical',
  className,
  viewportClassName,
  children,
  ...props
}: ScrollAreaProps) {
  const showVertical = orientation !== 'horizontal';
  const showHorizontal = orientation !== 'vertical';

  return (
    <BaseScrollArea.Root
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      <BaseScrollArea.Viewport
        className={[styles.viewport, viewportClassName ?? ''].filter(Boolean).join(' ')}
      >
        <BaseScrollArea.Content className={styles.content}>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>

      {showVertical ? (
        <BaseScrollArea.Scrollbar orientation="vertical" className={styles.scrollbar}>
          <BaseScrollArea.Thumb className={styles.thumb} />
        </BaseScrollArea.Scrollbar>
      ) : null}

      {showHorizontal ? (
        <BaseScrollArea.Scrollbar orientation="horizontal" className={styles.scrollbar}>
          <BaseScrollArea.Thumb className={styles.thumb} />
        </BaseScrollArea.Scrollbar>
      ) : null}

      {orientation === 'both' ? <BaseScrollArea.Corner className={styles.corner} /> : null}
    </BaseScrollArea.Root>
  );
}
