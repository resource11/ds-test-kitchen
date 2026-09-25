import { Select as BaseSelect } from '@base-ui/react/select';
import type { SelectRootProps } from '@base-ui/react/select';
import { Field } from '@base-ui/react/field';
import styles from './Select.module.css';

/**
 * A listbox-style select. Portalled and compound, so consumers keep control
 * of composition. Focus management, typeahead, keyboard navigation and the
 * hidden form input all come from Base UI's primitive.
 *
 * Usage:
 *   <Select.Root items={items}>
 *     <Select.Trigger placeholder="Pick one" />
 *     <Select.Content>
 *       <Select.Item value="a">Option A</Select.Item>
 *     </Select.Content>
 *   </Select.Root>
 *
 * Or, wired to a label and validation message in one step:
 *   <Select.Field label="Font" name="font" items={items} placeholder="Pick one">
 *     <Select.Item value="sans">Sans-serif</Select.Item>
 *   </Select.Field>
 */

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

function CaretUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 10H4l4-4.5z" />
    </svg>
  );
}

function CaretDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}

const cx = (...names: Array<string | undefined>) => names.filter(Boolean).join(' ');

export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> & {
  /** Shown while nothing is selected. */
  placeholder?: string;
};

/**
 * The button that opens the popup. Renders the selected value and a chevron.
 *
 * The placeholder goes to `Select.Value`, which renders it as its own children
 * while nothing is selected. A parallel `aria-hidden` element would leave the
 * trigger with no readable content in that state.
 */
function Trigger({ placeholder, className, children, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger className={cx(styles.trigger, className as string | undefined)} {...props}>
      <span className={styles.valueWrapper}>
        {children ?? <BaseSelect.Value className={styles.value} placeholder={placeholder} />}
      </span>
      <BaseSelect.Icon className={styles.icon}>
        <ChevronDownIcon />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

type PositionerProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>;

export type SelectContentProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Popup> & {
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
  /** Overlap the trigger so the selected item lines up with it. Off by default. */
  alignItemWithTrigger?: PositionerProps['alignItemWithTrigger'];
};

/** Portal, positioner, popup and list in one piece. */
function Content({
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  alignItemWithTrigger = false,
  className,
  children,
  ...props
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className={styles.positioner}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <BaseSelect.Popup className={cx(styles.popup, className as string | undefined)} {...props}>
          {/* Base UI mounts these only while the list overflows. They are what
              makes a long list navigable in `alignItemWithTrigger` mode, where
              it hides the native scrollbar. */}
          <BaseSelect.ScrollUpArrow className={styles.scrollArrow}>
            <CaretUpIcon />
          </BaseSelect.ScrollUpArrow>
          <BaseSelect.List className={styles.list}>{children}</BaseSelect.List>
          <BaseSelect.ScrollDownArrow className={styles.scrollArrow}>
            <CaretDownIcon />
          </BaseSelect.ScrollDownArrow>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export type SelectItemProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Item>;

/** An option. Renders its own tick indicator. */
function Item({ className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item className={cx(styles.item, className as string | undefined)} {...props}>
      <BaseSelect.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className={styles.itemText}>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

export type SelectGroupLabelProps = React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>;

function GroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      className={cx(styles.groupLabel, className as string | undefined)}
      {...props}
    />
  );
}

export type SelectFieldProps = Omit<SelectRootProps<string>, 'children'> & {
  /** Visible label. Always provide one. */
  label: string;
  /** Helper text shown under the control. */
  description?: string;
  /** Shown while nothing is selected. */
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  /** Forwarded to the popup, e.g. to change `side` or `sideOffset`. */
  contentProps?: SelectContentProps;
};

/**
 * A select already wired to a label, description and validation message.
 * Covers the common single-value case; compose the parts directly for
 * anything else (multiple selection, custom triggers, grouped popups).
 */
function SelectField({
  label,
  description,
  placeholder,
  className,
  children,
  contentProps,
  ...rootProps
}: SelectFieldProps) {
  return (
    <Field.Root name={rootProps.name} disabled={rootProps.disabled} className={cx(styles.field, className)}>
      <Field.Label className={styles.label}>{label}</Field.Label>
      <BaseSelect.Root {...rootProps}>
        <Trigger placeholder={placeholder} />
        <Content {...contentProps}>{children}</Content>
      </BaseSelect.Root>
      {description ? (
        <Field.Description className={styles.description}>{description}</Field.Description>
      ) : null}
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}

export const Select = Object.assign(SelectField, {
  Root: BaseSelect.Root,
  Trigger,
  Value: BaseSelect.Value,
  Icon: BaseSelect.Icon,
  Content,
  Item,
  ItemText: BaseSelect.ItemText,
  ItemIndicator: BaseSelect.ItemIndicator,
  Group: BaseSelect.Group,
  GroupLabel,
  Separator: BaseSelect.Separator,
  Field: SelectField,
});
