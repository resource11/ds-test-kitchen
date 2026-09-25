import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menubar } from './Menubar';

const meta = {
  title: 'Components/Navigation/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Menubar.Root {...args}>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>
            New file
            <Menubar.ItemShortcut>Cmd N</Menubar.ItemShortcut>
          </Menubar.Item>
          <Menubar.Item>Open recent</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>
            Save
            <Menubar.ItemShortcut>Cmd S</Menubar.ItemShortcut>
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Undo</Menubar.Item>
          <Menubar.Item>Redo</Menubar.Item>
          <Menubar.Separator />
          <Menubar.SubmenuRoot>
            <Menubar.SubmenuTrigger>Find</Menubar.SubmenuTrigger>
            <Menubar.Content side="inline-end" align="start" sideOffset={4}>
              <Menubar.Item>Find in file</Menubar.Item>
              <Menubar.Item>Find in project</Menubar.Item>
              <Menubar.Item>Replace</Menubar.Item>
            </Menubar.Content>
          </Menubar.SubmenuRoot>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Group>
            <Menubar.GroupLabel>Appearance</Menubar.GroupLabel>
            <Menubar.Item>Zoom in</Menubar.Item>
            <Menubar.Item>Zoom out</Menubar.Item>
          </Menubar.Group>
          <Menubar.Separator />
          <Menubar.Item>Toggle sidebar</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  ),
};

/** A vertical bar suits a side rail. Arrow keys follow the orientation. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Menubar.Root {...args} style={{ width: '10rem' }}>
      <Menubar.Menu>
        <Menubar.Trigger>Project</Menubar.Trigger>
        <Menubar.Content side="inline-end" align="start" sideOffset={8}>
          <Menubar.Item>Settings</Menubar.Item>
          <Menubar.Item>Members</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Deploy</Menubar.Trigger>
        <Menubar.Content side="inline-end" align="start" sideOffset={8}>
          <Menubar.Item>Preview</Menubar.Item>
          <Menubar.Item>Production</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  ),
};

/** A single disabled menu next to live ones, and a disabled item inside a live menu. */
export const Disabled: Story = {
  render: (args) => (
    <Menubar.Root {...args}>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New file</Menubar.Item>
          <Menubar.Item disabled>Import from URL</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger disabled>History</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Never reachable</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  ),
};

/** The whole bar can be switched off, for example while a document is loading. */
export const WholeBarDisabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Menubar.Root {...args}>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New file</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Undo</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  ),
};
