import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta = {
  title: 'Components/Content/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: { orientation: 'horizontal' },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Splits stacked content. */
export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 320, display: 'grid', gap: 'var(--sds-space-3)' }}>
      <div style={{ fontSize: 'var(--sds-font-size-sm)' }}>Workspace settings</div>
      <Separator {...args} />
      <div style={{ fontSize: 'var(--sds-font-size-sm)', color: 'var(--sds-color-content-muted)' }}>
        Members, billing and integrations
      </div>
    </div>
  ),
};

/** Splits items on a single row. The flex parent gives it its height. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sds-space-3)',
        fontSize: 'var(--sds-font-size-sm)',
      }}
    >
      <span>Overview</span>
      <Separator {...args} />
      <span>Activity</span>
      <Separator {...args} />
      <span>Settings</span>
    </div>
  ),
};

/** Both orientations in the layout they are usually reached for. */
export const InAToolbar: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        width: 360,
        border: '1px solid var(--sds-color-border-default)',
        borderRadius: 'var(--sds-radius-md)',
        background: 'var(--sds-color-background-surface)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sds-space-3)',
          padding: 'var(--sds-space-3)',
          fontSize: 'var(--sds-font-size-sm)',
        }}
      >
        <span>Bold</span>
        <Separator orientation="vertical" />
        <span>Italic</span>
        <Separator orientation="vertical" />
        <span>Underline</span>
      </div>
      <Separator />
      <div
        style={{
          padding: 'var(--sds-space-3)',
          fontSize: 'var(--sds-font-size-sm)',
          color: 'var(--sds-color-content-muted)',
        }}
      >
        Selection formatting applies to the current block.
      </div>
    </div>
  ),
};
