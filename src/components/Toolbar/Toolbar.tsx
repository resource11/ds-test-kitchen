import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import type {
  ToolbarRootProps as BaseToolbarRootProps,
  ToolbarGroupProps as BaseToolbarGroupProps,
  ToolbarButtonProps as BaseToolbarButtonProps,
  ToolbarLinkProps as BaseToolbarLinkProps,
  ToolbarInputProps as BaseToolbarInputProps,
  ToolbarSeparatorProps as BaseToolbarSeparatorProps,
} from '@base-ui/react/toolbar';
import styles from './Toolbar.module.css';

/**
 * A strip of related controls that share one tab stop. Base UI supplies the
 * roving focus, the `toolbar` role and the disabled-but-focusable behaviour.
 *
 * Usage:
 *   <Toolbar.Root>
 *     <Toolbar.Button>Bold</Toolbar.Button>
 *     <Toolbar.Separator />
 *     <Toolbar.Link href="#">Docs</Toolbar.Link>
 *   </Toolbar.Root>
 */

export type ToolbarRootProps = BaseToolbarRootProps;
export type ToolbarGroupProps = BaseToolbarGroupProps;
export type ToolbarButtonProps = BaseToolbarButtonProps;
export type ToolbarLinkProps = BaseToolbarLinkProps;
export type ToolbarInputProps = BaseToolbarInputProps;
export type ToolbarSeparatorProps = BaseToolbarSeparatorProps;

function Root({ className, ...props }: ToolbarRootProps) {
  return (
    <BaseToolbar.Root
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Group({ className, ...props }: ToolbarGroupProps) {
  return (
    <BaseToolbar.Group
      className={[styles.group, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Button({ className, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      className={[styles.button, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Link({ className, ...props }: ToolbarLinkProps) {
  return (
    <BaseToolbar.Link
      className={[styles.link, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Input({ className, ...props }: ToolbarInputProps) {
  return (
    <BaseToolbar.Input
      className={[styles.input, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Separator({ className, ...props }: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      className={[styles.separator, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export const Toolbar = Object.assign(Root, {
  Root,
  Group,
  Button,
  Link,
  Input,
  Separator,
});
