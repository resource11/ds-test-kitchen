import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import type { AutocompleteRootProps } from '@base-ui/react/autocomplete';
import { Field } from '@base-ui/react/field';
import styles from './Autocomplete.module.css';

/**
 * A free-text input with suggestions. Unlike `Combobox` it does not hold a
 * selected item: picking a suggestion fills the input, so the committed value
 * is always whatever the user typed.
 *
 * Usage:
 *   <Autocomplete.Root items={tags}>
 *     <Autocomplete.Control placeholder="Add a tag" />
 *     <Autocomplete.Content empty="No suggestions.">
 *       {(item: string) => <Autocomplete.Item key={item} value={item}>{item}</Autocomplete.Item>}
 *     </Autocomplete.Content>
 *   </Autocomplete.Root>
 */

const cx = (...names: Array<string | undefined>) => names.filter(Boolean).join(' ');

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

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

export type AutocompleteControlProps = React.ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Input
> & {
  /** Render a button that clears the input once it has a value. */
  clearable?: boolean;
  /** Render a chevron button that opens the suggestion list. */
  showTrigger?: boolean;
  clearLabel?: string;
  triggerLabel?: string;
};

/** The input and its optional clear and open buttons. */
function Control({
  clearable = true,
  showTrigger = false,
  clearLabel = 'Clear input',
  triggerLabel = 'Show suggestions',
  className,
  ...props
}: AutocompleteControlProps) {
  const hasActions = clearable || showTrigger;
  return (
    /*
     * `InputGroup`, not a plain div: it registers itself as the popup's anchor,
     * gives the wrapper `role="group"`, focuses the input and opens the list
     * when the padding around the input is pressed, and is treated as inside
     * the autocomplete by the outside-press dismissal.
     */
    <BaseAutocomplete.InputGroup className={styles.control}>
      <BaseAutocomplete.Input
        className={cx(
          styles.input,
          hasActions ? styles.inputWithActions : undefined,
          className as string | undefined,
        )}
        {...props}
      />
      {hasActions ? (
        <span className={styles.actions}>
          {clearable ? (
            <BaseAutocomplete.Clear className={styles.iconButton} aria-label={clearLabel}>
              <CloseIcon />
            </BaseAutocomplete.Clear>
          ) : null}
          {showTrigger ? (
            <BaseAutocomplete.Trigger className={styles.iconButton} aria-label={triggerLabel}>
              <BaseAutocomplete.Icon className={styles.icon}>
                <ChevronDownIcon />
              </BaseAutocomplete.Icon>
            </BaseAutocomplete.Trigger>
          ) : null}
        </span>
      ) : null}
    </BaseAutocomplete.InputGroup>
  );
}

type PositionerProps = React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Positioner>;

/**
 * `Autocomplete.List` accepts either static children or a function called once
 * per filtered item, which is how Base UI applies the query to `items`.
 */
export type AutocompleteListChildren = React.ComponentPropsWithoutRef<
  typeof BaseAutocomplete.List
>['children'];

export type AutocompleteContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Popup>,
  'children'
> & {
  children?: AutocompleteListChildren;
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
}: AutocompleteContentProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className={styles.positioner}
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseAutocomplete.Popup
          className={cx(styles.popup, className as string | undefined)}
          {...props}
        >
          {empty ? (
            <BaseAutocomplete.Empty className={styles.empty}>{empty}</BaseAutocomplete.Empty>
          ) : null}
          <BaseAutocomplete.List className={styles.list}>{children}</BaseAutocomplete.List>
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

export type AutocompleteItemProps = React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Item>;

function Item({ className, ...props }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item className={cx(styles.item, className as string | undefined)} {...props} />
  );
}

export type AutocompleteEmptyProps = React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Empty>;

function Empty({ className, ...props }: AutocompleteEmptyProps) {
  return (
    <BaseAutocomplete.Empty className={cx(styles.empty, className as string | undefined)} {...props} />
  );
}

export type AutocompleteGroupLabelProps = React.ComponentPropsWithoutRef<
  typeof BaseAutocomplete.GroupLabel
>;

function GroupLabel({ className, ...props }: AutocompleteGroupLabelProps) {
  return (
    <BaseAutocomplete.GroupLabel
      className={cx(styles.groupLabel, className as string | undefined)}
      {...props}
    />
  );
}

export type AutocompleteFieldProps = Omit<
  AutocompleteRootProps<string>,
  'children' | 'items'
> & {
  /** Suggestions to filter against. */
  items?: readonly string[];
  /** Visible label. Always provide one. */
  label: string;
  /** Helper text shown under the control. */
  description?: string;
  /** Placeholder for the text input. */
  placeholder?: string;
  className?: string;
  children?: AutocompleteListChildren;
  /** Message shown when the query matches nothing. */
  empty?: React.ReactNode;
  /** Forwarded to the input and its buttons. */
  controlProps?: AutocompleteControlProps;
  /** Forwarded to the popup, e.g. to change `side` or `sideOffset`. */
  contentProps?: AutocompleteContentProps;
};

/** An autocomplete already wired to a label, description and validation message. */
function AutocompleteField({
  label,
  description,
  placeholder,
  className,
  children,
  empty = 'No suggestions.',
  controlProps,
  contentProps,
  ...rootProps
}: AutocompleteFieldProps) {
  return (
    <Field.Root
      name={rootProps.name}
      disabled={rootProps.disabled}
      className={cx(styles.field, className)}
    >
      <Field.Label className={styles.label}>{label}</Field.Label>
      <BaseAutocomplete.Root {...rootProps}>
        <Control placeholder={placeholder} {...controlProps} />
        <Content empty={empty} {...contentProps}>
          {children}
        </Content>
      </BaseAutocomplete.Root>
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}

export const Autocomplete = Object.assign(AutocompleteField, {
  Root: BaseAutocomplete.Root,
  Control,
  Input: BaseAutocomplete.Input,
  Trigger: BaseAutocomplete.Trigger,
  Clear: BaseAutocomplete.Clear,
  Icon: BaseAutocomplete.Icon,
  Value: BaseAutocomplete.Value,
  Content,
  Item,
  Empty,
  Group: BaseAutocomplete.Group,
  GroupLabel,
  Separator: BaseAutocomplete.Separator,
  Status: BaseAutocomplete.Status,
  Field: AutocompleteField,
});
