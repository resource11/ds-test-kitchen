import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    'aria-label': { control: 'text' },
  },
  args: { size: 'md' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const Large: Story = { args: { size: 'lg' } };

/** The label should say what is loading, not just that something is. */
export const CustomLabel: Story = {
  args: { size: 'lg', 'aria-label': 'Loading invoices' },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--sds-space-5)', alignItems: 'center' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Spinner key={size} size={size} aria-label={`Loading, ${size}`} />
      ))}
    </div>
  ),
};

/** The spinner inherits `currentColor`, so it takes the tone of its context. */
export const InheritsColor: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--sds-space-3)',
        alignItems: 'center',
        color: 'var(--sds-color-content-muted)',
        fontFamily: 'var(--sds-font-sans)',
        fontSize: 'var(--sds-font-size-sm)',
      }}
    >
      <Spinner size="sm" aria-label="Checking availability" />
      Checking availability…
    </div>
  ),
};
