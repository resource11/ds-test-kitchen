import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

function PencilIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M11.2 2.3a1.4 1.4 0 0 1 2 2L6 11.5l-2.8.8.8-2.8Z" />
      <path d="M9.8 3.7 12.3 6.2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 4h11" />
      <path d="M6 4V2.75h4V4" />
      <path d="M4 4l.6 8.4a1 1 0 0 0 1 .85h4.8a1 1 0 0 0 1-.85L12 4" />
      <path d="M6.75 6.75v4M9.25 6.75v4" />
    </svg>
  );
}

const meta = {
  title: 'Components/Actions/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { label: 'Edit', variant: 'ghost', size: 'md', children: <PencilIcon /> },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `label` is required, so the button always has an accessible name. */
export const Ghost: Story = {};

export const Primary: Story = { args: { variant: 'primary' } };

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete project', children: <TrashIcon /> },
};

export const Disabled: Story = { args: { disabled: true } };

/** Every variant at every size, for eyeballing the set as a whole. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-4)' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 'var(--sds-space-3)', alignItems: 'center' }}>
          {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => (
            <IconButton key={variant} variant={variant} size={size} label={`Edit, ${variant} ${size}`}>
              <PencilIcon />
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** A row of actions, the place icon buttons actually earn their keep. */
export const ActionRow: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--sds-space-1)' }}>
      <IconButton label="Edit invoice" size="sm">
        <PencilIcon />
      </IconButton>
      <IconButton label="Delete invoice" size="sm" variant="ghost">
        <TrashIcon />
      </IconButton>
    </div>
  ),
};
