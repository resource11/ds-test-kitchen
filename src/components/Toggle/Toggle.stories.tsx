import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

/** Decorative only: the button that wraps it carries the accessible name. */
function Icon({ path }: { path: string }) {
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
      <path d={path} />
    </svg>
  );
}

const BOLD = 'M4.5 2.5h4a2.75 2.75 0 0 1 0 5.5h-4zM4.5 8h4.75a2.75 2.75 0 0 1 0 5.5H4.5z';
const STAR = 'M8 2.25 9.85 6l4.15.6-3 2.93.71 4.13L8 11.72l-3.71 1.94.71-4.13-3-2.93L6.15 6z';

const meta = {
  title: 'Components/Display/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
  args: {
    children: 'Show archived',
    variant: 'secondary',
    size: 'md',
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Uncontrolled and unpressed. Click it; the state lives in Base UI. */
export const Default: Story = {};

/** Starts pressed via `defaultPressed`. */
export const Pressed: Story = {
  args: { defaultPressed: true },
};

/** The lighter variant, for toolbars where a border would be noise. */
export const Ghost: Story = {
  args: { variant: 'ghost' },
};

/** Icon-only, squared off. The button carries the accessible name. */
export const IconOnly: Story = {
  args: {
    iconOnly: true,
    children: <Icon path={BOLD} />,
    'aria-label': 'Bold',
  },
};

/** Disabled in both states, so the pressed styling is still legible. */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--sds-space-3)' }}>
      <Toggle disabled>Off and disabled</Toggle>
      <Toggle disabled defaultPressed>
        On and disabled
      </Toggle>
    </div>
  ),
};

/** A label alongside an icon. */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon path={STAR} />
        Favourite
      </>
    ),
  },
};

/** Every variant at every size, pressed and unpressed. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-4)' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 'var(--sds-space-3)', alignItems: 'center' }}>
          {(['secondary', 'ghost'] as const).map((variant) => (
            <span key={variant} style={{ display: 'flex', gap: 'var(--sds-space-2)' }}>
              <Toggle variant={variant} size={size}>
                {variant}
              </Toggle>
              <Toggle variant={variant} size={size} defaultPressed>
                {variant} on
              </Toggle>
            </span>
          ))}
        </div>
      ))}
    </div>
  ),
};
