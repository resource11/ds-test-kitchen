import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import type { ComboboxRootProps } from '@base-ui/react/combobox';
import { Field } from '@base-ui/react/field';
import styles from './Combobox.module.css';

/**
 * A text input that filters a list of options and commits one of them.
 * Filtering, highlighting, scroll anchoring and the hidden form input all
 * come from Base UI's primitive; this wrapper only supplies structure and
 * tokens.
 *
 * Usage:
 *   <Combobox.Root items={countries}>
 *     <Combobox.Control placeholder="Search countries" />
 *     <Combobox.Content>
 *       <Combobox.Empty>No matches.</Combobox.Empty>
 *       {countries.map((c) => <Combobox.Item key={c} value={c}>{c}</Combobox.Item>)}
 *     </Combobox.Content>
 *   </Combobox.Root>
 */

const cx = (...names: Array<string | undefined>) => names.filter(Boolean).join(' ');

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="m4 6.5 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="m3.5 8.5 3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="m4 4 8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type ComboboxControlProps = React.ComponentPropsWithoutRef<typeof BaseCombobox.Input> & {
  /** Render a button that clears the value once there is one. */
  clearable?: boolean;
  /** Render a chevron button that opens the popup. */
  showTrigger?: boolean;
  /** Accessible name for the clear button. */
  clearLabel?: string;
  /** Accessible name for the open button. */
  triggerLabel?: string;
};

/** The input plus its clear and open buttons. */
function Control({
  clearable = true,
  showTrigger = true,
  clearLabel = 'Clear selection',
  triggerLabel = 'Open list',
  className,
  ...props
}: ComboboxControlProps) {
  const hasActions = clearable || showTrigger;
  return (
    /*
     * `InputGroup`, not a plain div: it registers itself as the popup's anchor,
     * gives the wrapper `role="group"`, focuses the input and opens the list
     * when the padding around the input is pressed, and is treated as inside
     * the combobox by the outside-press dismissal.
     */
    <BaseCombobox.InputGroup className={styles.control}>
      <BaseCombobox.Input
        className={cx(styles.input, hasActions ? styles.inputWithActions : undefined, className as string | undefined)}
        {...props}
      />
      {hasActions ? (
        <span className={styles.actions}>
          {clearable ? (
            <BaseCombobox.Clear className={styles.iconButton} aria-label={clearLabel}>
              <CloseIcon />
            </BaseCombobox.Clear>
          ) : null}
          {showTrigger ? (
            <BaseCombobox.Trigger className={styles.iconButton} aria-label={triggerLabel}>
              <BaseCombobox.Icon className={styles.icon}>
                <ChevronDownIcon />
              </BaseCombobox.Icon>
            </BaseCombobox.Trigger>
          ) : null}
        </span>
      ) : null}
    </BaseCombobox.InputGroup>
  );
}

type PositionerProps = React.ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>;

/**
 * `Combobox.List` accepts either static children or a function called once per
 * filtered item, which is how Base UI applies the query to the `items` prop.
 */
export type ComboboxListChildren = React.ComponentPropsWithoutRef<
  typeof BaseCombobox.List
>['children'];

export type ComboboxContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Popup>,
  'children'
> & {
  children?: ComboboxListChildren;
  /** Message shown when the query matches nothing. Requires `items` on the root. */
  empty?: React.ReactNode;
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
};

/** Portal, positioner, popup, empty state and list in one piece. */
function Content({
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  empty,
  className,
  children,
  ...props
}: ComboboxContentProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        className={styles.positioner}
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseCombobox.Popup className={cx(styles.popup, className as string | undefined)} {...props}>
          {empty ? <BaseCombobox.Empty className={styles.empty}>{empty}</BaseCombobox.Empty> : null}
          <BaseCombobox.List className={styles.list}>{children}</BaseCombobox.List>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export type ComboboxItemProps = React.ComponentPropsWithoutRef<typeof BaseCombobox.Item>;

/** An option. Renders its own tick indicator. */
function Item({ className, children, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item className={cx(styles.item, className as string | undefined)} {...props}>
      <BaseCombobox.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon />
      </BaseCombobox.ItemIndicator>
      <span className={styles.itemText}>{children}</span>
    </BaseCombobox.Item>
  );
}

export type ComboboxEmptyProps = React.ComponentPropsWithoutRef<typeof BaseCombobox.Empty>;

function Empty({ className, ...props }: ComboboxEmptyProps) {
  return <BaseCombobox.Empty className={cx(styles.empty, className as string | undefined)} {...props} />;
}

export type ComboboxGroupLabelProps = React.ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>;

function GroupLabel({ className, ...props }: ComboboxGroupLabelProps) {
  return (
    <BaseCombobox.GroupLabel
      className={cx(styles.groupLabel, className as string | undefined)}
      {...props}
    />
  );
}

export type ComboboxFieldProps = Omit<ComboboxRootProps<string>, 'children'> & {
  /** Visible label. Always provide one. */
  label: string;
  /** Helper text shown under the control. */
  description?: string;
  /** Placeholder for the text input. */
  placeholder?: string;
  className?: string;
  children?: ComboboxListChildren;
  /** Message shown when the query matches nothing. */
  empty?: React.ReactNode;
  /** Forwarded to the input and its buttons. */
  controlProps?: ComboboxControlProps;
  /** Forwarded to the popup, e.g. to change `side` or `sideOffset`. */
  contentProps?: ComboboxContentProps;
};

/**
 * A combobox already wired to a label, description and validation message.
 * Compose the parts directly for multiple selection or a custom control.
 */
function ComboboxField({
  label,
  description,
  placeholder,
  className,
  children,
  empty = 'No results found.',
  controlProps,
  contentProps,
  ...rootProps
}: ComboboxFieldProps) {
  return (
    <Field.Root
      name={rootProps.name}
      disabled={rootProps.disabled}
      className={cx(styles.field, className)}
    >
      <Field.Label className={styles.label}>{label}</Field.Label>
      <BaseCombobox.Root {...rootProps}>
        <Control placeholder={placeholder} {...controlProps} />
        <Content empty={empty} {...contentProps}>
          {children}
        </Content>
      </BaseCombobox.Root>
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}

export const Combobox = Object.assign(ComboboxField, {
  Root: BaseCombobox.Root,
  Control,
  Input: BaseCombobox.Input,
  Trigger: BaseCombobox.Trigger,
  Clear: BaseCombobox.Clear,
  Icon: BaseCombobox.Icon,
  Value: BaseCombobox.Value,
  Content,
  Item,
  ItemIndicator: BaseCombobox.ItemIndicator,
  Empty,
  Group: BaseCombobox.Group,
  GroupLabel,
  Separator: BaseCombobox.Separator,
  Status: BaseCombobox.Status,
  Field: ComboboxField,
});
