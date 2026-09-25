import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Email notifications' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const WithoutLabel: Story = { args: { label: undefined } };

/** The helper text is wired up as `aria-describedby`, not just drawn under the label. */
export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Sent to your account address. Digests are never sent more than once a day.',
    defaultChecked: true,
  },
};

/** Helper text without a label: allowed, but the switch then has no accessible name. */
export const DescriptionOnly: Story = {
  args: { label: undefined, description: 'Explains the control but does not name it.' },
};

/**
 * The row this component exists for: label, helper text and the control, three
 * deep, with no `htmlFor` or `aria-describedby` wired by hand at the call site.
 */
export const SettingsRows: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-5)', maxWidth: 420 }}>
      <Switch
        name="product-updates"
        label="Product updates"
        description="New features and changes to the components you already use."
        defaultChecked
      />
      <Switch
        name="weekly-digest"
        label="Weekly digest"
        description="One email on Monday summarising every change from the week before."
      />
      <Switch
        name="incident-alerts"
        label="Incident alerts"
        description="Always on for admins, so this cannot be turned off from here."
        defaultChecked
        disabled
      />
    </div>
  ),
};
