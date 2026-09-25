import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from './ContextMenu';

const meta = {
  title: 'Components/Navigation/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const targetStyle = {
  display: 'grid',
  placeItems: 'center',
  width: '24rem',
  height: '10rem',
  padding: 'var(--sds-space-4)',
  border: '1px dashed var(--sds-color-border-strong)',
  borderRadius: 'var(--sds-radius-md)',
  color: 'var(--sds-color-content-muted)',
  fontFamily: 'var(--sds-font-sans)',
  fontSize: 'var(--sds-font-size-sm)',
  textAlign: 'center',
} as const;

/**
 * Right-click anywhere inside the dashed area below to open the menu.
 * On a touch device, press and hold instead.
 */
export const Default: Story = {
  render: (args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger style={targetStyle}>
        Right-click (or long-press) anywhere in this area
      </ContextMenu.Trigger>
      <ContextMenu.Content {...args}>
        <ContextMenu.Item>
          Cut
          <ContextMenu.ItemShortcut>Cmd X</ContextMenu.ItemShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>
          Copy
          <ContextMenu.ItemShortcut>Cmd C</ContextMenu.ItemShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>
          Paste
          <ContextMenu.ItemShortcut>Cmd V</ContextMenu.ItemShortcut>
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Select all</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
};

/**
 * Right-click the area to open the menu, then hover "Move to" to open its submenu.
 */
export const WithGroupsAndSubmenu: Story = {
  render: (args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger style={targetStyle}>
        Right-click (or long-press) to act on this file
      </ContextMenu.Trigger>
      <ContextMenu.Content {...args}>
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>File</ContextMenu.GroupLabel>
          <ContextMenu.Item>Open</ContextMenu.Item>
          <ContextMenu.Item>Rename</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.SubmenuRoot>
          <ContextMenu.SubmenuTrigger>Move to</ContextMenu.SubmenuTrigger>
          <ContextMenu.Content side="inline-end" align="start" sideOffset={4}>
            <ContextMenu.Item>Archive</ContextMenu.Item>
            <ContextMenu.Item>Drafts</ContextMenu.Item>
            <ContextMenu.Item>Shared with me</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.SubmenuRoot>
        <ContextMenu.Separator />
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
};

/**
 * Right-click the area to see items that are present but unavailable:
 * they are announced to screen readers and skipped by the arrow keys.
 */
export const DisabledItems: Story = {
  render: (args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger style={targetStyle}>
        Right-click (or long-press) — this file is read-only
      </ContextMenu.Trigger>
      <ContextMenu.Content {...args}>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item disabled>Cut</ContextMenu.Item>
        <ContextMenu.Item disabled>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item disabled>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
};
