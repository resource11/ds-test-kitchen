import { Menu as BaseMenu } from '@base-ui/react/menu';
import type {
  MenuPopupProps,
  MenuPositionerProps,
  MenuItemProps as BaseMenuItemProps,
  MenuGroupProps as BaseMenuGroupProps,
  MenuGroupLabelProps as BaseMenuGroupLabelProps,
  MenuSubmenuTriggerProps as BaseMenuSubmenuTriggerProps,
} from '@base-ui/react/menu';
import styles from './Menu.module.css';

/**
 * A dropdown menu. Positioning, roving focus, typeahead and dismissal come
 * from Base UI; this wrapper only supplies the surface treatment.
 *
 * Usage:
 *   <Menu.Root>
 *     <Menu.Trigger render={<Button variant="secondary">Actions</Button>} />
 *     <Menu.Content>
 *       <Menu.Item>Rename</Menu.Item>
 *     </Menu.Content>
 *   </Menu.Root>
 */

/** Positioner options that are worth surfacing on the composed content part. */
export type MenuPositioningProps = {
  /** Which side of the trigger the popup opens against. @default 'bottom' */
  side?: MenuPositionerProps['side'];
  /** How the popup lines up with the trigger on that side. @default 'start' */
  align?: MenuPositionerProps['align'];
  /** Gap between the trigger and the popup, in pixels. @default 6 */
  sideOffset?: MenuPositionerProps['sideOffset'];
  /** Class applied to the positioner rather than the popup. */
  positionerClassName?: string;
};

export type MenuContentProps = MenuPopupProps & MenuPositioningProps;
export type MenuItemProps = BaseMenuItemProps;
export type MenuGroupProps = BaseMenuGroupProps;
export type MenuGroupLabelProps = BaseMenuGroupLabelProps;
export type MenuSeparatorProps = React.ComponentProps<typeof BaseMenu.Separator>;
export type MenuSubmenuTriggerProps = BaseMenuSubmenuTriggerProps;

function ChevronRightIcon() {
  return (
    <svg
      className={styles.submenuIcon}
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
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

/** Portal, positioner and popup in one part, so callers only nest their items. */
function Content({
  side = 'bottom',
  align = 'start',
  sideOffset = 6,
  positionerClassName,
  className,
  children,
  ...props
}: MenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className={[styles.positioner, positionerClassName ?? ''].filter(Boolean).join(' ')}
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup
          className={[styles.popup, className ?? ''].filter(Boolean).join(' ')}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

function Item({ className, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={[styles.item, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Group({ className, ...props }: MenuGroupProps) {
  return (
    <BaseMenu.Group
      className={[styles.group, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function GroupLabel({ className, ...props }: MenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      className={[styles.groupLabel, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Separator({ className, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      className={[styles.separator, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

/** A menu item that opens a submenu. The chevron is supplied for you. */
function SubmenuTrigger({ className, children, ...props }: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      className={[styles.item, styles.submenuTrigger, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
      <ChevronRightIcon />
    </BaseMenu.SubmenuTrigger>
  );
}

/** Right-aligned hint for a keyboard shortcut inside an item. */
function ItemShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={[styles.itemShortcut, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export const Menu = Object.assign(Content, {
  Root: BaseMenu.Root,
  Trigger: BaseMenu.Trigger,
  Content,
  Item,
  ItemShortcut,
  Group,
  GroupLabel,
  Separator,
  SubmenuRoot: BaseMenu.SubmenuRoot,
  SubmenuTrigger,
});
