import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import styles from './Accordion.module.css';

/**
 * A vertically stacked set of headings that each reveal a panel.
 * Composed from Base UI's `Accordion` parts, so keyboard navigation,
 * roving focus and ARIA wiring come from the primitive.
 *
 * Usage:
 *   <Accordion.Root>
 *     <Accordion.Item value="a">
 *       <Accordion.Header>
 *         <Accordion.Trigger>Question</Accordion.Trigger>
 *       </Accordion.Header>
 *       <Accordion.Panel>Answer</Accordion.Panel>
 *     </Accordion.Item>
 *   </Accordion.Root>
 *
 * `multiple` defaults to `true` in Base UI; pass `multiple={false}` for a
 * single-open accordion.
 */

export type AccordionRootProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Root>,
  'className'
> & {
  /** Extra classes merged onto the root element. */
  className?: string;
};

export type AccordionItemProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Item>,
  'className'
> & { className?: string };

export type AccordionHeaderProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Header>,
  'className'
> & { className?: string };

export type AccordionTriggerProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Trigger>,
  'className'
> & { className?: string };

export type AccordionPanelProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Panel>,
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
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function Root({ className, ...props }: AccordionRootProps) {
  return (
    <BaseAccordion.Root
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Item({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={[styles.item, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Header({ className, ...props }: AccordionHeaderProps) {
  return (
    <BaseAccordion.Header
      className={[styles.header, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

/** The button that toggles its panel. Renders the label plus a chevron. */
function Trigger({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      className={[styles.trigger, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      <ChevronIcon />
    </BaseAccordion.Trigger>
  );
}

/**
 * The collapsible region. Height animates via Base UI's
 * `--accordion-panel-height` custom property.
 */
function Panel({ className, children, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={[styles.panel, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      <div className={styles.content}>{children}</div>
    </BaseAccordion.Panel>
  );
}

export const Accordion = Object.assign(Root, {
  Root,
  Item,
  Header,
  Trigger,
  Panel,
});
