import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import styles from './PreviewCard.module.css';

/**
 * A rich preview shown when someone hovers or focuses a link: the profile
 * behind an @mention, the summary behind an article link. Unlike `Tooltip` the
 * popup is hoverable, so it may hold links of its own.
 *
 * `PreviewCard.Trigger` renders an `<a>` (see
 * `preview-card/trigger/PreviewCardTrigger.d.ts`) and carries the open and close
 * delays, so give it an `href`.
 *
 * Usage:
 *   <PreviewCard.Root>
 *     <PreviewCard.Trigger href="/u/ada">@ada</PreviewCard.Trigger>
 *     <PreviewCard.Content>...</PreviewCard.Content>
 *   </PreviewCard.Root>
 */

type PositionerProps = React.ComponentPropsWithoutRef<typeof BasePreviewCard.Positioner>;

/** Distance in px between the trigger and the popup. Matches --sds-space-2. */
const DEFAULT_SIDE_OFFSET = 8;

export type PreviewCardContentProps = React.ComponentPropsWithoutRef<
  typeof BasePreviewCard.Popup
> & {
  /** Which side of the trigger to prefer. May flip to avoid collisions. */
  side?: PositionerProps['side'];
  /** How the popup aligns along the chosen side. */
  align?: PositionerProps['align'];
  /** Gap between trigger and popup, in px. */
  sideOffset?: PositionerProps['sideOffset'];
};

/**
 * The arrow shape. Three stacked paths: a fill, the 1px border, and a second
 * fill that paints back over the popup's own border where the arrow meets it,
 * so the seam reads as one continuous outline.
 */
function ArrowSvg() {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
      <path
        className={styles.arrowFill}
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
      />
      <path
        className={styles.arrowOuterStroke}
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85876L16.5281 6.22987C17.0789 6.72576 17.7938 7.00001 18.5349 7.00001L15.9645 7.00001L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207L4.70223 7.00001L2.14727 7.00001C2.8883 7.00001 3.60317 6.72576 4.15397 6.22987L8.99542 1.85876Z"
      />
      <path
        className={styles.arrowInnerStroke}
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
      />
    </svg>
  );
}

function Content({
  side = 'bottom',
  align = 'center',
  sideOffset = DEFAULT_SIDE_OFFSET,
  children,
  className,
  ...props
}: PreviewCardContentProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        className={styles.positioner}
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BasePreviewCard.Popup
          className={[styles.popup, className ?? ''].filter(Boolean).join(' ')}
          {...props}
        >
          <BasePreviewCard.Arrow className={styles.arrow}>
            <ArrowSvg />
          </BasePreviewCard.Arrow>
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}

export const PreviewCard = Object.assign(Content, {
  Root: BasePreviewCard.Root,
  Trigger: BasePreviewCard.Trigger,
  Content,
});
