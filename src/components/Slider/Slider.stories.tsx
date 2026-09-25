import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    showValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: { label: 'Volume', defaultValue: 40, showValue: true },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutValueOutput: Story = { args: { showValue: false } };

export const WithDescription: Story = {
  args: { description: 'Applies to notification sounds only.' },
};

/** Coarse steps make the allowed values obvious while dragging. */
export const Stepped: Story = {
  args: { label: 'Quality', defaultValue: 50, min: 0, max: 100, step: 25 },
};

/** Two values render two thumbs; the label names the pair. */
export const Range: Story = {
  args: { label: 'Price range', defaultValue: [25, 75] },
};

/** `format` is passed straight to `Intl.NumberFormat`. */
export const Formatted: Story = {
  args: {
    label: 'Budget',
    defaultValue: 1200,
    min: 0,
    max: 5000,
    step: 50,
    format: { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 },
  },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 65 } };
