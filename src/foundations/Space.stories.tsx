import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Group, mono, useResolved } from './tokenTable';

const SPACE = ['1', '2', '3', '4', '5', '6', '8', '10', '12'];
const RADIUS = ['sm', 'md', 'lg', 'full'];

const meta = {
  title: 'Foundations/Space and shape',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SpaceScale() {
  const { ref, values } = useResolved(SPACE.map((s) => `--sds-space-${s}`));
  return (
    <div ref={ref} style={{ display: 'grid', gap: 'var(--sds-space-2)' }}>
      {SPACE.map((step) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sds-space-4)' }}>
          <div style={{ ...mono, width: 190, flexShrink: 0, color: 'var(--sds-color-content-muted)' }}>
            --sds-space-{step} · {values[`--sds-space-${step}`]}
          </div>
          <div
            style={{
              height: 20,
              width: `var(--sds-space-${step})`,
              background: 'var(--sds-color-background-accent)',
              borderRadius: 'var(--sds-radius-sm)',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export const SpaceAndShape: Story = {
  render: () => (
    <Page
      title="Space and shape"
      intro="A 4px base with a deliberately incomplete scale. The gaps are the point: skipping 7, 9 and 11 removes decisions nobody should have to make, and keeps two designers from picking values one step apart."
    >
      <Group title="Spacing">
        <SpaceScale />
      </Group>

      <Group title="Radius" note="Small for inputs inside dense layouts, medium as the default, large for surfaces that float, full for pills and avatars.">
        <div style={{ display: 'flex', gap: 'var(--sds-space-5)', flexWrap: 'wrap' }}>
          {RADIUS.map((name) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  background: 'var(--sds-color-background-accent-subtle)',
                  border: '1px solid var(--sds-color-border-accent)',
                  borderRadius: `var(--sds-radius-${name})`,
                }}
              />
              <div style={{ ...mono, marginTop: 'var(--sds-space-1)' }}>{name}</div>
            </div>
          ))}
        </div>
      </Group>

      <Group title="Elevation" note="Two roles only. Raised is for things resting on the page, overlay is for things floating above it. A third level almost always means the layout is fighting itself.">
        <div style={{ display: 'flex', gap: 'var(--sds-space-6)', flexWrap: 'wrap' }}>
          {(['raised', 'overlay'] as const).map((name) => (
            <div key={name}>
              <div
                style={{
                  width: 180,
                  height: 110,
                  background: 'var(--sds-color-background-surface)',
                  border: '1px solid var(--sds-color-border-default)',
                  borderRadius: 'var(--sds-radius-lg)',
                  boxShadow: `var(--sds-elevation-${name})`,
                }}
              />
              <div style={{ ...mono, marginTop: 'var(--sds-space-2)' }}>--sds-elevation-{name}</div>
            </div>
          ))}
        </div>
      </Group>
    </Page>
  ),
};
