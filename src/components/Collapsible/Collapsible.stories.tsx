import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible } from './Collapsible';

const body = (
  <ul style={{ margin: 0, paddingInlineStart: 'var(--sds-space-5)' }}>
    <li>Runs on every push to a protected branch</li>
    <li>Retries transient failures twice before reporting</li>
    <li>Artifacts are kept for 30 days</li>
  </ul>
);

const meta = {
  title: 'Components/Content/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ width: 420, maxWidth: '100%' }}>
      <Collapsible.Root {...args}>
        <Collapsible.Trigger>Pipeline details</Collapsible.Trigger>
        <Collapsible.Panel>{body}</Collapsible.Panel>
      </Collapsible.Root>
    </div>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Starts expanded, uncontrolled. */
export const DefaultOpen: Story = { args: { defaultOpen: true } };

/** The trigger is inert and the panel cannot be toggled. */
export const Disabled: Story = { args: { disabled: true } };

/** A plain text trigger for inline disclosures. */
export const WithoutChevron: Story = {
  render: (args) => (
    <div style={{ width: 420, maxWidth: '100%' }}>
      <Collapsible.Root {...args}>
        <Collapsible.Trigger showChevron={false}>Show advanced options</Collapsible.Trigger>
        <Collapsible.Panel>{body}</Collapsible.Panel>
      </Collapsible.Root>
    </div>
  ),
};

/**
 * `keepMounted` leaves the panel in the DOM while closed, so its contents stay
 * addressable to scripts and in-page search.
 */
export const KeepMounted: Story = {
  render: (args) => (
    <div style={{ width: 420, maxWidth: '100%' }}>
      <Collapsible.Root {...args}>
        <Collapsible.Trigger>Pipeline details</Collapsible.Trigger>
        <Collapsible.Panel keepMounted>{body}</Collapsible.Panel>
      </Collapsible.Root>
    </div>
  ),
};
