import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['neutral', 'accent', 'success', 'warning', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  args: { children: 'Beta', variant: 'neutral', size: 'md' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Accent: Story = { args: { variant: 'accent', children: 'New' } };

export const Danger: Story = { args: { variant: 'danger', children: 'Overdue' } };

export const Small: Story = { args: { size: 'sm', children: '12' } };

/**
 * Every variant in both sizes. The status variants read the status tokens
 * (`--sds-color-content-success` and its siblings), so they theme with the
 * rest of the system.
 */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-4)' }}>
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 'var(--sds-space-3)', alignItems: 'center' }}>
          {(['neutral', 'accent', 'success', 'warning', 'danger'] as const).map((variant) => (
            <Badge key={variant} variant={variant} size={size}>
              {variant}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Badges usually sit inline with text, so they have to align on the baseline. */
export const InlineWithText: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <p
      style={{
        fontFamily: 'var(--sds-font-sans)',
        color: 'var(--sds-color-content-default)',
        maxWidth: '42ch',
      }}
    >
      The export pipeline <Badge variant="accent">New</Badge> now runs nightly, and any run that
      fails twice is marked <Badge variant="danger">Overdue</Badge> until someone acknowledges it.
    </p>
  ),
};
