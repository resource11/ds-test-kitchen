import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from './Meter';

/** Storage is fine until it is nearly gone; past 85% the reading turns red. */
const DANGER_THRESHOLD = 85;
const variantFor = (value: number) => (value >= DANGER_THRESHOLD ? 'danger' : 'accent');

const meta = {
  title: 'Components/Display/Meter',
  component: Meter,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    variant: { control: 'inline-radio', options: ['accent', 'danger'] },
    showValue: { control: 'boolean' },
  },
  args: {
    label: 'Storage used',
    value: 42,
    showValue: true,
    size: 'md',
    variant: 'accent',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A measurement at rest. Nothing is running; this is simply how full it is. */
export const Default: Story = {};

/**
 * The distinction from `Progress`: a meter reports a level, so it can fall as
 * well as rise, and a high reading is often the bad one.
 */
export const NotProgress: Story = {
  name: 'Meter vs Progress',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-5)' }}>
      <Meter label="Disk used — a reading that can go up or down" value={68} showValue />
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--sds-font-sans)',
          fontSize: 'var(--sds-font-size-sm)',
          color: 'var(--sds-color-content-muted)',
        }}
      >
        Use Progress instead when a task is running and will reach 100% on its own.
      </p>
    </div>
  ),
};

/**
 * Threshold colour change. The same component crosses 85% and switches to
 * `--sds-color-content-danger`, so the colour says what the number says.
 */
export const Threshold: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-5)' }}>
      {[20, 60, 84, 92, 99].map((value) => (
        <Meter
          key={value}
          label={`Storage used — ${value < DANGER_THRESHOLD ? 'plenty of room' : 'nearly full'}`}
          value={value}
          variant={variantFor(value)}
          showValue
        />
      ))}
    </div>
  ),
};

/** Explicitly forcing the danger variant. */
export const Danger: Story = {
  args: { value: 96, variant: 'danger', label: 'Storage used' },
};

/** Empty and full, the two ends of the range. */
export const Extremes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-5)' }}>
      <Meter label="Empty" value={0} showValue />
      <Meter label="Full" value={100} variant="danger" showValue />
    </div>
  ),
};

/**
 * A non-percentage range with its own units. `min`/`max` define the scale and
 * `format` controls the read-out.
 */
export const CustomRange: Story = {
  args: {
    label: 'Bandwidth this month',
    value: 812,
    max: 1000,
    showValue: true,
    format: { style: 'unit', unit: 'gigabyte', unitDisplay: 'short' },
    variant: 'accent',
  },
};

/** Thin track for dense settings rows. */
export const Small: Story = {
  args: { size: 'sm' },
};
