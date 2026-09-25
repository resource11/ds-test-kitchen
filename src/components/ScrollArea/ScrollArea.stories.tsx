import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './ScrollArea';

const releases = [
  ['1.12.0', 'Adds the combobox primitive and a matching filter API.'],
  ['1.11.3', 'Fixes focus restoration when a dialog closes during a transition.'],
  ['1.11.2', 'Corrects the scroll thumb size on high-DPI displays.'],
  ['1.11.1', 'Scroll area no longer traps wheel events inside nested viewports.'],
  ['1.11.0', 'New separator orientation prop and vertical layout support.'],
  ['1.10.4', 'Accordion panels animate correctly when opened programmatically.'],
  ['1.10.3', 'Collapsible keeps its panel measured across font loading.'],
  ['1.10.2', 'Tooltip delay groups share a single timer again.'],
  ['1.10.1', 'Select popup respects the anchor width on resize.'],
  ['1.10.0', 'Adds toast primitives with a promise helper.'],
  ['1.9.2', 'Switch reports the correct value in uncontrolled forms.'],
  ['1.9.1', 'Fixes an SSR hydration warning in the field primitives.'],
];

const panelStyle: React.CSSProperties = {
  border: '1px solid var(--sds-color-border-default)',
  borderRadius: 'var(--sds-radius-md)',
  background: 'var(--sds-color-background-surface)',
};

const meta = {
  title: 'Components/Content/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal', 'both'] },
  },
  args: { orientation: 'vertical' },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A fixed 240px viewport with more content than fits. */
export const Default: Story = {
  render: (args) => (
    <ScrollArea {...args} style={{ ...panelStyle, height: 240, width: 380 }}>
      <div style={{ display: 'grid', gap: 'var(--sds-space-3)', padding: 'var(--sds-space-4)' }}>
        {releases.map(([version, note]) => (
          <div key={version}>
            <div
              style={{
                fontWeight: 'var(--sds-font-weight-medium)',
                fontSize: 'var(--sds-font-size-sm)',
              }}
            >
              {version}
            </div>
            <div
              style={{
                color: 'var(--sds-color-content-muted)',
                fontSize: 'var(--sds-font-size-sm)',
              }}
            >
              {note}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

/** One long line that overflows sideways. */
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <ScrollArea {...args} style={{ ...panelStyle, width: 380 }}>
      <div
        style={{
          display: 'flex',
          gap: 'var(--sds-space-3)',
          padding: 'var(--sds-space-4)',
          width: 'max-content',
        }}
      >
        {releases.map(([version]) => (
          <div
            key={version}
            style={{
              padding: 'var(--sds-space-2) var(--sds-space-3)',
              border: '1px solid var(--sds-color-border-default)',
              borderRadius: 'var(--sds-radius-full)',
              fontSize: 'var(--sds-font-size-sm)',
              whiteSpace: 'nowrap',
            }}
          >
            {version}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

/** Both scrollbars plus the corner between them. */
export const Both: Story = {
  args: { orientation: 'both' },
  render: (args) => (
    <ScrollArea {...args} style={{ ...panelStyle, height: 240, width: 380 }}>
      <div style={{ padding: 'var(--sds-space-4)', width: 'max-content' }}>
        {releases.map(([version, note]) => (
          <p
            key={version}
            style={{
              margin: '0 0 var(--sds-space-3)',
              fontSize: 'var(--sds-font-size-sm)',
              whiteSpace: 'nowrap',
            }}
          >
            <strong>{version}</strong> — {note}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

/** Content that fits: no scrollbar is rendered at all. */
export const NoOverflow: Story = {
  render: (args) => (
    <ScrollArea {...args} style={{ ...panelStyle, height: 240, width: 380 }}>
      <div style={{ padding: 'var(--sds-space-4)', fontSize: 'var(--sds-font-size-sm)' }}>
        Short enough to fit inside the viewport.
      </div>
    </ScrollArea>
  ),
};
