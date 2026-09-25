import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Button } from '../Button';

const meta = {
  title: 'Components/Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Notifications',
    description: 'Choose how this project reaches you.',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="secondary">Notifications</Button>} />
      <Popover.Content {...args} />
    </Popover.Root>
  ),
};

/** Interactive content inside the popup, closed by an explicit `Popover.Close`. */
export const WithActions: Story = {
  args: {
    title: 'Invite a teammate',
    description: 'They get read access until you change it.',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger render={<Button>Invite</Button>} />
      <Popover.Content {...args}>
        <div style={{ display: 'flex', gap: 'var(--sds-space-2)', justifyContent: 'flex-end' }}>
          <Popover.Close render={<Button variant="secondary" size="sm">Cancel</Button>} />
          <Popover.Close render={<Button size="sm">Send invite</Button>} />
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
};

/** Anchored above the trigger. The arrow flips with it. */
export const SideTop: Story = {
  args: {
    title: 'Above the trigger',
    description: 'side="top" with a larger sideOffset.',
    side: 'top',
    sideOffset: 12,
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="secondary">Open above</Button>} />
      <Popover.Content {...args} />
    </Popover.Root>
  ),
};

/** Anchored to the right and aligned to the start of the trigger. */
export const SideRightAlignStart: Story = {
  args: {
    title: 'Beside the trigger',
    description: 'side="right", align="start".',
    side: 'right',
    align: 'start',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="secondary">Open beside</Button>} />
      <Popover.Content {...args} />
    </Popover.Root>
  ),
};

/**
 * A disabled trigger never opens the popover. `Popover.Root` has no `disabled`
 * prop, so the disabled state lives on the trigger element itself.
 */
export const DisabledTrigger: Story = {
  args: { title: 'Unreachable', description: 'The trigger below is disabled.' },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="secondary" disabled>Unavailable</Button>} />
      <Popover.Content {...args} />
    </Popover.Root>
  ),
};
