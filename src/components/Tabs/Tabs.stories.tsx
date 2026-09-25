import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const panelStyle = { paddingTop: 'var(--sds-space-2)' };

export const Default: Story = {
  args: { defaultValue: 'overview' },
  render: (args) => (
    <Tabs.Root {...args} style={{ width: '32rem' }}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="overview" style={panelStyle}>
        A summary of the project, its owners and the current release.
      </Tabs.Panel>
      <Tabs.Panel value="activity" style={panelStyle}>
        Every deploy, comment and status change, newest first.
      </Tabs.Panel>
      <Tabs.Panel value="settings" style={panelStyle}>
        Visibility, integrations and danger-zone actions.
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

/** The indicator follows the active tab down the list instead of across it. */
export const Vertical: Story = {
  args: { defaultValue: 'general', orientation: 'vertical' },
  render: (args) => (
    <Tabs.Root {...args} style={{ width: '32rem' }}>
      <Tabs.List>
        <Tabs.Tab value="general">General</Tabs.Tab>
        <Tabs.Tab value="members">Members</Tabs.Tab>
        <Tabs.Tab value="billing">Billing</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="general">Name, description and default branch.</Tabs.Panel>
      <Tabs.Panel value="members">Invite teammates and manage their roles.</Tabs.Panel>
      <Tabs.Panel value="billing">Plan, seats and invoices.</Tabs.Panel>
    </Tabs.Root>
  ),
};

/** A disabled tab stays in the tab order for screen readers but cannot be activated. */
export const DisabledTab: Story = {
  args: { defaultValue: 'overview' },
  render: (args) => (
    <Tabs.Root {...args} style={{ width: '32rem' }}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity" disabled>
          Activity
        </Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="overview" style={panelStyle}>
        Activity is unavailable while the project is archived.
      </Tabs.Panel>
      <Tabs.Panel value="activity" style={panelStyle}>
        Never reachable in this story.
      </Tabs.Panel>
      <Tabs.Panel value="settings" style={panelStyle}>
        Visibility, integrations and danger-zone actions.
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

/** With `activateOnFocus`, arrow keys switch panels as focus moves. */
export const ActivateOnFocus: Story = {
  args: { defaultValue: 'day' },
  render: (args) => (
    <Tabs.Root {...args} style={{ width: '32rem' }}>
      <Tabs.List activateOnFocus>
        <Tabs.Tab value="day">Day</Tabs.Tab>
        <Tabs.Tab value="week">Week</Tabs.Tab>
        <Tabs.Tab value="month">Month</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="day" style={panelStyle}>
        Usage for the last 24 hours.
      </Tabs.Panel>
      <Tabs.Panel value="week" style={panelStyle}>
        Usage for the last 7 days.
      </Tabs.Panel>
      <Tabs.Panel value="month" style={panelStyle}>
        Usage for the last 30 days.
      </Tabs.Panel>
    </Tabs.Root>
  ),
};
