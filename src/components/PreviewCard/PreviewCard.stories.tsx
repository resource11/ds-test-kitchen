import type { Meta, StoryObj } from '@storybook/react-vite';
import { PreviewCard } from './PreviewCard';
import { Button } from '../Button';

const meta = {
  title: 'Components/Overlays/PreviewCard',
  component: PreviewCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
  },
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const linkStyle = {
  color: 'var(--sds-color-content-accent)',
  fontFamily: 'var(--sds-font-sans)',
  textDecorationLine: 'underline',
  textUnderlineOffset: '2px',
};

const Profile = () => (
  <div style={{ display: 'grid', gap: 'var(--sds-space-2)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sds-space-3)' }}>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'var(--sds-space-10)',
          height: 'var(--sds-space-10)',
          borderRadius: 'var(--sds-radius-full)',
          background: 'var(--sds-color-background-accent-subtle)',
          color: 'var(--sds-color-content-accent)',
          fontWeight: 'var(--sds-font-weight-bold)',
        }}
      >
        AL
      </span>
      <span>
        <strong style={{ display: 'block' }}>Ada Lovelace</strong>
        <span style={{ color: 'var(--sds-color-content-muted)' }}>@ada</span>
      </span>
    </div>
    <p style={{ margin: 0, color: 'var(--sds-color-content-muted)' }}>
      Writes the analytical engine notes. Maintains three packages you have never heard of.
    </p>
  </div>
);

export const Default: Story = {
  args: {},
  render: (args) => (
    <p style={{ fontFamily: 'var(--sds-font-sans)', color: 'var(--sds-color-content-default)' }}>
      Reviewed by{' '}
      <PreviewCard.Root>
        <PreviewCard.Trigger href="#ada" style={linkStyle}>
          @ada
        </PreviewCard.Trigger>
        <PreviewCard.Content {...args}>
          <Profile />
        </PreviewCard.Content>
      </PreviewCard.Root>{' '}
      earlier today.
    </p>
  ),
};

/**
 * The popup is hoverable, so it can hold its own controls. Move the pointer off
 * the link and straight onto the card: it stays open.
 */
export const WithActions: Story = {
  args: {},
  render: (args) => (
    <p style={{ fontFamily: 'var(--sds-font-sans)', color: 'var(--sds-color-content-default)' }}>
      Assigned to{' '}
      <PreviewCard.Root>
        <PreviewCard.Trigger href="#ada" style={linkStyle}>
          @ada
        </PreviewCard.Trigger>
        <PreviewCard.Content {...args}>
          <Profile />
          <div style={{ marginTop: 'var(--sds-space-3)' }}>
            <Button size="sm">Follow</Button>
          </div>
        </PreviewCard.Content>
      </PreviewCard.Root>
      .
    </p>
  ),
};

/** Anchored above the link, aligned to its start edge. */
export const SideTopAlignStart: Story = {
  args: { side: 'top', align: 'start', sideOffset: 12 },
  render: (args) => (
    <p style={{ fontFamily: 'var(--sds-font-sans)', color: 'var(--sds-color-content-default)' }}>
      Mentioned by{' '}
      <PreviewCard.Root>
        <PreviewCard.Trigger href="#ada" style={linkStyle}>
          @ada
        </PreviewCard.Trigger>
        <PreviewCard.Content {...args}>
          <Profile />
        </PreviewCard.Content>
      </PreviewCard.Root>
      .
    </p>
  ),
};

/**
 * Opening the card as soon as the pointer lands, with `delay` and `closeDelay`
 * on the trigger. The defaults are 600ms and 300ms.
 */
export const InstantOpen: Story = {
  args: {},
  render: (args) => (
    <p style={{ fontFamily: 'var(--sds-font-sans)', color: 'var(--sds-color-content-default)' }}>
      Filed by{' '}
      <PreviewCard.Root>
        <PreviewCard.Trigger href="#ada" delay={0} closeDelay={100} style={linkStyle}>
          @ada
        </PreviewCard.Trigger>
        <PreviewCard.Content {...args}>
          <Profile />
        </PreviewCard.Content>
      </PreviewCard.Root>
      .
    </p>
  ),
};

/**
 * Held open with `defaultOpen`, so the resting appearance can be reviewed
 * without hovering. This is also how the card looks to a keyboard user who has
 * focused the link.
 */
export const AlwaysOpen: Story = {
  args: {},
  render: (args) => (
    <p style={{ fontFamily: 'var(--sds-font-sans)', color: 'var(--sds-color-content-default)' }}>
      Written by{' '}
      <PreviewCard.Root defaultOpen>
        <PreviewCard.Trigger href="#ada" style={linkStyle}>
          @ada
        </PreviewCard.Trigger>
        <PreviewCard.Content {...args}>
          <Profile />
        </PreviewCard.Content>
      </PreviewCard.Root>
      .
    </p>
  ),
};
