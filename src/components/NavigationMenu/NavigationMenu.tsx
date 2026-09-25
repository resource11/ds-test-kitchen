import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import type {
  NavigationMenuRootProps as BaseNavigationMenuRootProps,
  NavigationMenuListProps as BaseNavigationMenuListProps,
  NavigationMenuItemProps as BaseNavigationMenuItemProps,
  NavigationMenuTriggerProps as BaseNavigationMenuTriggerProps,
  NavigationMenuIconProps as BaseNavigationMenuIconProps,
  NavigationMenuContentProps as BaseNavigationMenuContentProps,
  NavigationMenuLinkProps as BaseNavigationMenuLinkProps,
  NavigationMenuPopupProps,
  NavigationMenuPositionerProps,
} from '@base-ui/react/navigation-menu';
import styles from './NavigationMenu.module.css';

/**
 * A site navigation bar whose items reveal a shared, animated content panel.
 * Each `Item` owns a `Trigger` and a `Content`; the single `Panel` at the end
 * of the `Root` is where Base UI moves the active `Content` to.
 *
 * Usage:
 *   <NavigationMenu.Root>
 *     <NavigationMenu.List>
 *       <NavigationMenu.Item>
 *         <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
 *         <NavigationMenu.Content>...</NavigationMenu.Content>
 *       </NavigationMenu.Item>
 *     </NavigationMenu.List>
 *     <NavigationMenu.Panel />
 *   </NavigationMenu.Root>
 */

export type NavigationMenuRootProps = BaseNavigationMenuRootProps;
export type NavigationMenuListProps = BaseNavigationMenuListProps;
export type NavigationMenuItemProps = BaseNavigationMenuItemProps;
export type NavigationMenuTriggerProps = BaseNavigationMenuTriggerProps;
export type NavigationMenuIconProps = BaseNavigationMenuIconProps;
export type NavigationMenuContentProps = BaseNavigationMenuContentProps;
export type NavigationMenuLinkProps = BaseNavigationMenuLinkProps;

/** The portal, positioner, popup and viewport the active content is moved into. */
export type NavigationMenuPanelProps = NavigationMenuPopupProps & {
  /** Which side of the list the panel opens against. @default 'bottom' */
  side?: NavigationMenuPositionerProps['side'];
  /** How the panel lines up with the active trigger. @default 'center' */
  align?: NavigationMenuPositionerProps['align'];
  /** Gap between the list and the panel, in pixels. @default 8 */
  sideOffset?: NavigationMenuPositionerProps['sideOffset'];
  /** Space kept between the panel and the edge of the viewport. @default 12 */
  collisionPadding?: NavigationMenuPositionerProps['collisionPadding'];
  /** Class applied to the positioner rather than the popup. */
  positionerClassName?: string;
};

function ChevronDownIcon() {
  return (
    <svg
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
      <path d="m4 6.5 4 4 4-4" />
    </svg>
  );
}

function Root({ className, ...props }: NavigationMenuRootProps) {
  return (
    <BaseNavigationMenu.Root
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function List({ className, ...props }: NavigationMenuListProps) {
  return (
    <BaseNavigationMenu.List
      className={[styles.list, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Item({ className, ...props }: NavigationMenuItemProps) {
  return (
    <BaseNavigationMenu.Item
      className={[styles.item, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

/** Opens the panel on hover or click. The chevron is supplied for you. */
function Trigger({ className, children, ...props }: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger
      className={[styles.trigger, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
      <Icon />
    </BaseNavigationMenu.Trigger>
  );
}

/** The rotating chevron. Rendered by `Trigger`; exported for custom triggers. */
function Icon({ className, children, ...props }: NavigationMenuIconProps) {
  return (
    <BaseNavigationMenu.Icon
      className={[styles.icon, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      {children ?? <ChevronDownIcon />}
    </BaseNavigationMenu.Icon>
  );
}

function Content({ className, ...props }: NavigationMenuContentProps) {
  return (
    <BaseNavigationMenu.Content
      className={[styles.content, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Link({ className, ...props }: NavigationMenuLinkProps) {
  return (
    <BaseNavigationMenu.Link
      className={[styles.link, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

/**
 * The shared panel. Render it once, as the last child of `Root`; whichever
 * item is active has its `Content` moved into the viewport inside it.
 */
function Panel({
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  collisionPadding = 12,
  positionerClassName,
  className,
  ...props
}: NavigationMenuPanelProps) {
  return (
    <BaseNavigationMenu.Portal>
      <BaseNavigationMenu.Positioner
        className={[styles.positioner, positionerClassName ?? ''].filter(Boolean).join(' ')}
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <BaseNavigationMenu.Popup
          className={[styles.popup, className ?? ''].filter(Boolean).join(' ')}
          {...props}
        >
          <BaseNavigationMenu.Viewport className={styles.viewport} />
        </BaseNavigationMenu.Popup>
      </BaseNavigationMenu.Positioner>
    </BaseNavigationMenu.Portal>
  );
}

export const NavigationMenu = Object.assign(Root, {
  Root,
  List,
  Item,
  Trigger,
  Icon,
  Content,
  Link,
  Panel,
});
