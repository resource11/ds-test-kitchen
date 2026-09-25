import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { MenubarProps as BaseMenubarProps } from '@base-ui/react/menubar';
import type { MenuTriggerProps } from '@base-ui/react/menu';
import { Menu } from '../Menu';
import styles from './Menubar.module.css';

/**
 * An application menu bar. Each top-level button owns a `Menu`, and Base UI
 * handles moving between them with the arrow keys once one is open.
 *
 * Usage:
 *   <Menubar.Root>
 *     <Menubar.Menu>
 *       <Menubar.Trigger>File</Menubar.Trigger>
 *       <Menubar.Content>
 *         <Menubar.Item>New file</Menubar.Item>
 *       </Menubar.Content>
 *     </Menubar.Menu>
 *   </Menubar.Root>
 */

export type MenubarRootProps = BaseMenubarProps;
export type MenubarTriggerProps = MenuTriggerProps;

function Root({ className, ...props }: MenubarRootProps) {
  return (
    <BaseMenubar
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Trigger({ className, ...props }: MenubarTriggerProps) {
  return (
    <BaseMenu.Trigger
      className={[styles.trigger, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export const Menubar = Object.assign(Root, {
  Root,
  /** One menu within the bar. Wraps the trigger and its content. */
  Menu: BaseMenu.Root,
  Trigger,
  Content: Menu.Content,
  Item: Menu.Item,
  ItemShortcut: Menu.ItemShortcut,
  Group: Menu.Group,
  GroupLabel: Menu.GroupLabel,
  Separator: Menu.Separator,
  SubmenuRoot: Menu.SubmenuRoot,
  SubmenuTrigger: Menu.SubmenuTrigger,
});
