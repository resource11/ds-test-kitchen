import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from './NumberField';

const meta = {
  title: 'Components/Forms/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    step: { control: 'number' },
  },
  args: { label: 'Seats', defaultValue: 3 },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Drag the label sideways to change the value quickly.' },
};

/** Clamped to a range, stepping by five. */
export const Bounded: Story = {
  args: { label: 'Batch size', defaultValue: 25, min: 5, max: 50, step: 5, snapOnStep: true },
};

/** `format` is passed straight to `Intl.NumberFormat`. */
export const Currency: Story = {
  args: {
    label: 'Monthly budget',
    defaultValue: 1250,
    step: 50,
    format: { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 },
  },
};

/** Opt in to changing the value with the mouse wheel while focused. */
export const WheelScrub: Story = { args: { allowWheelScrub: true } };

export const ReadOnly: Story = { args: { readOnly: true } };

export const Disabled: Story = { args: { disabled: true } };
