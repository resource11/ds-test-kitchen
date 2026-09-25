import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from './Fieldset';
import { TextField } from '../TextField';
import { Switch } from '../Switch';

const meta = {
  title: 'Components/Forms/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Fieldset.Root {...args}>
      <Fieldset.Legend>Billing address</Fieldset.Legend>
      <TextField label="Street" name="street" placeholder="12 Rue de Rivoli" />
      <TextField label="City" name="city" placeholder="Paris" />
      <TextField label="Postcode" name="postcode" placeholder="75001" />
    </Fieldset.Root>
  ),
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `disabled` on the root cascades to every control inside the group. */
export const Disabled: Story = {
  args: { disabled: true },
};

/** Two groups in one form, each with its own caption. */
export const MultipleGroups: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Fieldset.Root {...args}>
        <Fieldset.Legend>Account</Fieldset.Legend>
        <TextField label="Username" name="username" placeholder="ada" />
        <TextField label="Email address" name="email" type="email" placeholder="ada@lovelace.dev" />
      </Fieldset.Root>
      <Fieldset.Root>
        <Fieldset.Legend>Notifications</Fieldset.Legend>
        <Switch label="Email me about releases" name="releases" defaultChecked />
        <Switch label="Email me about security alerts" name="security" />
      </Fieldset.Root>
    </div>
  ),
};
