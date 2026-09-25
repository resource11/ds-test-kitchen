import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import type {
  ContextMenuTriggerProps as BaseContextMenuTriggerProps,
  ContextMenuPopupProps,
  ContextMenuPositionerProps,
} from '@base-ui/react/context-menu';
import { Menu } from '../Menu';
import menuStyles from '../Menu/Menu.module.css';
import styles from './ContextMenu.module.css';

/**
 * A menu opened by right click or long press on a target area. The parts are
 * the same primitives as `Menu`, so items, groups and submenus are shared.
 *
 * Usage:
 *   <ContextMenu.Root>
 *     <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
 *     <ContextMenu.Content>
 *       <ContextMenu.Item>Cut</ContextMenu.Item>
 *     </ContextMenu.Content>
 *   </ContextMenu.Root>
 */

export type ContextMenuTriggerProps = BaseContextMenuTriggerProps;

export type ContextMenuContentProps = ContextMenuPopupProps & {
  /**
   * Which side of the pointer the popup opens against.
   * Left unset by default so Base UI's pointer-anchored defaults apply.
   */
  side?: ContextMenuPositionerProps['side'];
  /**
   * How the popup lines up with the pointer on that side.
   * Left unset by default so Base UI's pointer-anchored defaults apply.
   */
  align?: ContextMenuPositionerProps['align'];
  /**
   * Gap between the pointer and the popup, in pixels.
   * Left unset by default so Base UI's pointer-anchored defaults apply.
   */
  sideOffset?: ContextMenuPositionerProps['sideOffset'];
  /** Class applied to the positioner rather than the popup. */
  positionerClassName?: string;
};

/** The area that listens for a right click or a long press. */
function Trigger({ className, ...props }: ContextMenuTriggerProps) {
  return (
    <BaseContextMenu.Trigger
      className={[styles.trigger, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

/**
 * Portal, positioner and popup in one part, anchored to the pointer.
 *
 * `side`, `align` and `sideOffset` are forwarded only when a caller sets them.
 * `ContextMenu.Positioner` applies its own pointer-anchored defaults
 * (`sideOffset: -5`, `alignOffset: 2`) that tuck the menu under the cursor, and
 * it drops them as soon as `side` is passed explicitly.
 */
function Content({
  side,
  align,
  sideOffset,
  positionerClassName,
  className,
  children,
  ...props
}: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner
        className={[menuStyles.positioner, positionerClassName ?? ''].filter(Boolean).join(' ')}
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseContextMenu.Popup
          className={[menuStyles.popup, className ?? ''].filter(Boolean).join(' ')}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

export const ContextMenu = Object.assign(Content, {
  Root: BaseContextMenu.Root,
  Trigger,
  Content,
  Item: Menu.Item,
  ItemShortcut: Menu.ItemShortcut,
  Group: Menu.Group,
  GroupLabel: Menu.GroupLabel,
  Separator: Menu.Separator,
  SubmenuRoot: Menu.SubmenuRoot,
  SubmenuTrigger: Menu.SubmenuTrigger,
});
