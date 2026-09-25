import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';
import { Button } from '../Button';

const meta = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Actions</Button>} />
      <Menu.Content {...args}>
        <Menu.Item>Rename project</Menu.Item>
        <Menu.Item>Duplicate</Menu.Item>
        <Menu.Item>Move to folder</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Delete</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
};

/** Groups and their labels give long menus a scannable structure. */
export const WithGroups: Story = {
  render: (args) => (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Editor</Button>} />
      <Menu.Content {...args}>
        <Menu.Group>
          <Menu.GroupLabel>Edit</Menu.GroupLabel>
          <Menu.Item>
            Undo
            <Menu.ItemShortcut>Cmd Z</Menu.ItemShortcut>
          </Menu.Item>
          <Menu.Item>
            Redo
            <Menu.ItemShortcut>Shift Cmd Z</Menu.ItemShortcut>
          </Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Clipboard</Menu.GroupLabel>
          <Menu.Item>
            Cut
            <Menu.ItemShortcut>Cmd X</Menu.ItemShortcut>
          </Menu.Item>
          <Menu.Item>
            Copy
            <Menu.ItemShortcut>Cmd C</Menu.ItemShortcut>
          </Menu.Item>
          <Menu.Item>
            Paste
            <Menu.ItemShortcut>Cmd V</Menu.ItemShortcut>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  ),
};

/** A submenu opens to the side on hover, arrow key or click. */
export const WithSubmenu: Story = {
  render: (args) => (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Share</Button>} />
      <Menu.Content {...args}>
        <Menu.Item>Copy link</Menu.Item>
        <Menu.SubmenuRoot>
          <Menu.SubmenuTrigger>Send to</Menu.SubmenuTrigger>
          <Menu.Content side="inline-end" align="start" sideOffset={4}>
            <Menu.Item>Email</Menu.Item>
            <Menu.Item>Slack</Menu.Item>
            <Menu.Item>Airdrop</Menu.Item>
          </Menu.Content>
        </Menu.SubmenuRoot>
        <Menu.Separator />
        <Menu.Item>Manage access</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
};

/** Disabled items stay visible and announced, but cannot be highlighted or invoked. */
export const DisabledItems: Story = {
  render: (args) => (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Deploy</Button>} />
      <Menu.Content {...args}>
        <Menu.Item>Deploy to preview</Menu.Item>
        <Menu.Item disabled>Deploy to production</Menu.Item>
        <Menu.Separator />
        <Menu.Item disabled>Roll back</Menu.Item>
        <Menu.Item>View build log</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
};

/** The popup can open against any side of its trigger. */
export const OpensAbove: Story = {
  args: { side: 'top', align: 'center' },
  render: (args) => (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Open upward</Button>} />
      <Menu.Content {...args}>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Preferences</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Sign out</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
};
