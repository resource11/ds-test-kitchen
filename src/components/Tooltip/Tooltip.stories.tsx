import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
  },
  decorators: [
    (Story) => (
      <Tooltip.Provider delay={200}>
        <Story />
      </Tooltip.Provider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Saves without publishing' },
  render: (args) => (
    <Tooltip.Root>
      <Tooltip.Trigger render={<Button variant="secondary">Save draft</Button>} />
      <Tooltip.Content {...args} />
    </Tooltip.Root>
  ),
};

/**
 * Inside one `Tooltip.Provider`, the first tooltip waits for the delay and the
 * rest open instantly while the group stays warm. Sweep across these to see it.
 */
export const SharedDelayGroup: Story = {
  args: { children: 'Bold' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--sds-space-2)' }}>
      {['Bold', 'Italic', 'Underline'].map((label) => (
        <Tooltip.Root key={label}>
          <Tooltip.Trigger render={<Button variant="ghost" size="sm">{label[0]}</Button>} />
          <Tooltip.Content>{label}</Tooltip.Content>
        </Tooltip.Root>
      ))}
    </div>
  ),
};

/** Anchored below the trigger, aligned to its start edge. */
export const SideBottomAlignStart: Story = {
  args: { children: 'Appears below, left-aligned', side: 'bottom', align: 'start' },
  render: (args) => (
    <Tooltip.Root>
      <Tooltip.Trigger render={<Button variant="secondary">Hover me</Button>} />
      <Tooltip.Content {...args} />
    </Tooltip.Root>
  ),
};

/** Long copy wraps at the popup's max width rather than running off screen. */
export const LongContent: Story = {
  args: {
    children:
      'Publishing makes this release visible to every member of the workspace and sends a notification to anyone subscribed to the channel.',
  },
  render: (args) => (
    <Tooltip.Root>
      <Tooltip.Trigger render={<Button>Publish</Button>} />
      <Tooltip.Content {...args} />
    </Tooltip.Root>
  ),
};

/**
 * `Tooltip.Root` takes a `disabled` prop, which suppresses the tooltip while
 * leaving the trigger fully usable. The trigger here is disabled too, so both
 * kinds of disabled state are visible at once.
 */
export const Disabled: Story = {
  args: { children: 'You should never see this' },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--sds-space-4)' }}>
      <Tooltip.Root disabled>
        <Tooltip.Trigger render={<Button variant="secondary">Tooltip disabled</Button>} />
        <Tooltip.Content {...args} />
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger render={<Button variant="secondary" disabled>Trigger disabled</Button>} />
        <Tooltip.Content>Not reachable</Tooltip.Content>
      </Tooltip.Root>
    </div>
  ),
};
