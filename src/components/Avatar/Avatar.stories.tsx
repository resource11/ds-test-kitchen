import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const WORKING_IMAGE =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces';

const meta = {
  title: 'Components/Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    src: { control: 'text' },
  },
  args: {
    src: WORKING_IMAGE,
    alt: 'Dana Whitfield',
    fallback: 'DW',
    size: 'md',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A loaded image fills the circle and is cropped to cover. */
export const Default: Story = {};

/**
 * A `src` that cannot load. Base UI flips the loading status to `error`
 * and the fallback initials take over with no extra state handling.
 */
export const BrokenImageFallsBackToInitials: Story = {
  args: { src: 'https://example.invalid/this-image-does-not-exist.png', fallback: 'DW' },
};

/** With no `src` at all, the fallback renders immediately. */
export const NoImage: Story = {
  args: { src: undefined, fallback: 'DW' },
};

/** When no initials are supplied the neutral person glyph is used. */
export const GlyphFallback: Story = {
  args: { src: undefined, fallback: undefined, alt: undefined },
};

/** All three sizes, from the space scale, next to each other. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--sds-space-4)', alignItems: 'center' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size} src={WORKING_IMAGE} alt="Dana Whitfield" fallback="DW" />
      ))}
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Avatar key={`fallback-${size}`} size={size} fallback="DW" />
      ))}
    </div>
  ),
};

/** Overlapping avatars, a common list-of-collaborators pattern. */
export const Stack: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex' }}>
      {['DW', 'AK', 'MR', 'TS'].map((initials, index) => (
        <span
          key={initials}
          style={{
            marginLeft: index === 0 ? 0 : 'calc(-1 * var(--sds-space-2))',
            borderRadius: 'var(--sds-radius-full)',
            boxShadow: '0 0 0 2px var(--sds-color-background-surface)',
            display: 'inline-flex',
          }}
        >
          <Avatar fallback={initials} />
        </span>
      ))}
    </div>
  ),
};
