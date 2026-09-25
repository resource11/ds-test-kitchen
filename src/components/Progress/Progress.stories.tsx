import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    showValue: { control: 'boolean' },
  },
  args: {
    label: 'Uploading assets',
    value: 40,
    showValue: true,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A determinate bar: the task has a known length and a known position. */
export const Default: Story = {};

/** No label or value, for use inside a dense list row. */
export const BarOnly: Story = {
  args: { label: undefined, showValue: false },
};

/**
 * `value={null}` marks the bar indeterminate. Use it while waiting on a
 * server that has not reported a total yet.
 */
export const Indeterminate: Story = {
  args: { value: null, label: 'Preparing import', showValue: false },
};

/** The three points worth eyeballing: empty, half, and complete. */
export const Steps: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-5)' }}>
      <Progress label="Just started" value={0} showValue />
      <Progress label="Halfway" value={50} showValue />
      <Progress label="Finished" value={100} showValue />
    </div>
  ),
};

/** Thin track for compact layouts. */
export const Small: Story = {
  args: { size: 'sm' },
};

/**
 * A non-percentage range. `min`/`max` set the scale and `format` controls
 * how the value reads out.
 */
export const CustomRange: Story = {
  args: {
    label: 'Files copied',
    value: 312,
    max: 1024,
    showValue: true,
    format: { style: 'decimal' },
  },
};
