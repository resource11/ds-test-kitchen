import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import styles from './Collapsible.module.css';

/**
 * A single disclosure: one trigger, one panel that animates its height.
 * Wraps Base UI's `Collapsible`, so the open state, `aria-expanded` and the
 * panel's mount lifecycle come from the primitive.
 *
 * Usage:
 *   <Collapsible.Root>
 *     <Collapsible.Trigger>Details</Collapsible.Trigger>
 *     <Collapsible.Panel>…</Collapsible.Panel>
 *   </Collapsible.Root>
 */

export type CollapsibleRootProps = Omit<
  React.ComponentProps<typeof BaseCollapsible.Root>,
  'className'
> & {
  /** Extra classes merged onto the root element. */
  className?: string;
};

export type CollapsibleTriggerProps = Omit<
  React.ComponentProps<typeof BaseCollapsible.Trigger>,
  'className'
> & {
  className?: string;
  /** Show the rotating chevron next to the label. @default true */
  showChevron?: boolean;
};

export type CollapsiblePanelProps = Omit<
  React.ComponentProps<typeof BaseCollapsible.Panel>,
  'className'
> & { className?: string };

function ChevronIcon() {
  return (
    <svg
      className={styles.chevron}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

function Root({ className, ...props }: CollapsibleRootProps) {
  return (
    <BaseCollapsible.Root
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Trigger({ className, children, showChevron = true, ...props }: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      className={[styles.trigger, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      {showChevron ? <ChevronIcon /> : null}
      <span className={styles.label}>{children}</span>
    </BaseCollapsible.Trigger>
  );
}

/**
 * The disclosed region. Height animates via Base UI's
 * `--collapsible-panel-height` custom property.
 */
function Panel({ className, children, ...props }: CollapsiblePanelProps) {
  return (
    <BaseCollapsible.Panel
      className={[styles.panel, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      <div className={styles.content}>{children}</div>
    </BaseCollapsible.Panel>
  );
}

export const Collapsible = Object.assign(Root, {
  Root,
  Trigger,
  Panel,
});
