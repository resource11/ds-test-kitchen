import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '@base-ui/react/field';
import { Select } from './Select';

const fonts = {
  sans: 'Sans-serif',
  serif: 'Serif',
  mono: 'Monospace',
  cursive: 'Cursive',
};

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Font family',
    name: 'font',
    placeholder: 'Choose a font',
    items: fonts,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Select.Field {...args}>
      {Object.entries(fonts).map(([value, label]) => (
        <Select.Item key={value} value={value}>
          {label}
        </Select.Item>
      ))}
    </Select.Field>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Applies to every document in this workspace.' },
};

export const WithSelectedValue: Story = {
  args: { defaultValue: 'serif' },
};

export const Required: Story = {
  args: {
    required: true,
    description: 'Open and close the select without choosing to see the error.',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'mono' },
};

export const WithDisabledItem: Story = {
  render: (args) => (
    <Select.Field {...args}>
      <Select.Item value="sans">Sans-serif</Select.Item>
      <Select.Item value="serif">Serif</Select.Item>
      <Select.Item value="mono" disabled>
        Monospace (unavailable)
      </Select.Item>
      <Select.Item value="cursive">Cursive</Select.Item>
    </Select.Field>
  ),
};

export const Grouped: Story = {
  args: { label: 'Deploy target', name: 'target', placeholder: 'Choose a target', items: undefined },
  render: (args) => (
    <Select.Field {...args}>
      <Select.Group>
        <Select.GroupLabel>Production</Select.GroupLabel>
        <Select.Item value="eu-west">EU West</Select.Item>
        <Select.Item value="us-east">US East</Select.Item>
      </Select.Group>
      <Select.Separator />
      <Select.Group>
        <Select.GroupLabel>Staging</Select.GroupLabel>
        <Select.Item value="staging-eu">Staging EU</Select.Item>
        <Select.Item value="staging-us">Staging US</Select.Item>
      </Select.Group>
    </Select.Field>
  ),
};

/** Multiple selection needs the parts composed directly, since `Select.Field` is single-value. */
export const Multiple: Story = {
  args: { label: 'Toppings', name: 'toppings' },
  render: () => (
    <Field.Root name="toppings" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Field.Label style={{ fontSize: 14, fontWeight: 500 }}>Toppings</Field.Label>
      <Select.Root multiple>
        <Select.Trigger placeholder="Add toppings" />
        <Select.Content>
          <Select.Item value="olives">Olives</Select.Item>
          <Select.Item value="capers">Capers</Select.Item>
          <Select.Item value="anchovies">Anchovies</Select.Item>
          <Select.Item value="artichokes">Artichokes</Select.Item>
        </Select.Content>
      </Select.Root>
    </Field.Root>
  ),
};
