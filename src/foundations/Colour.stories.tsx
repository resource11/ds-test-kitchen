import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Group, mono, useResolved } from './tokenTable';

/** Grouped by the three semantic categories — background, content, border —
 *  which is how the tokens are organised in tokens/tier-2-usage/ and how they
 *  map onto Figma variable collections. */
const ROLES: Record<string, string[]> = {
  'Background · surfaces': ['background-default', 'background-surface', 'background-sunken', 'background-overlay'],
  'Background · accent': ['background-accent', 'background-accent-hover', 'background-accent-active', 'background-accent-subtle', 'background-on-accent'],
  'Background · status': ['background-danger', 'background-danger-hover', 'background-danger-subtle', 'background-success', 'background-success-subtle', 'background-warning', 'background-warning-subtle'],
  'Content': ['content-default', 'content-muted', 'content-inverse', 'content-accent', 'content-danger', 'content-success', 'content-warning'],
  'Content · on a filled background': ['content-on-accent', 'content-on-danger', 'content-on-success', 'content-on-warning'],
  'Border': ['border-default', 'border-strong', 'border-focus', 'border-accent', 'border-accent-hover', 'border-danger', 'border-success', 'border-warning'],
};

const ALL = Object.values(ROLES).flat().map((n) => `--sds-color-${n}`);

function Swatches() {
  const { ref, values } = useResolved(ALL);
  return (
    <div ref={ref}>
      {Object.entries(ROLES).map(([group, names]) => (
        <Group key={group} title={group}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--sds-space-3)' }}>
            {names.map((name) => (
              <div key={name}>
                <div
                  style={{
                    height: 64,
                    borderRadius: 'var(--sds-radius-md)',
                    border: '1px solid var(--sds-color-border-default)',
                    background: `var(--sds-color-${name})`,
                  }}
                />
                <div style={{ ...mono, marginTop: 'var(--sds-space-1)' }}>--sds-color-{name}</div>
                <div style={{ ...mono, color: 'var(--sds-color-content-muted)' }}>
                  {values[`--sds-color-${name}`] || ' '}
                </div>
              </div>
            ))}
          </div>
        </Group>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Colour',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Semantic: Story = {
  render: () => (
    <Page
      title="Colour"
      intro="These are semantic tokens: they name a role, not a hue. Components may only use this layer. Flip the theme in the toolbar and watch every name stay the same while its resolved value changes. That stability is what makes the layer mappable to Figma variable modes."
    >
      <Swatches />
    </Page>
  ),
};

export const Primitives: Story = {
  render: () => (
    <Page
      title="Primitive ramps"
      intro="The raw material. Nothing outside src/tokens/semantic.css is allowed to reference these. They are shown here so you can see what the semantic layer is choosing from, not so you can use them."
    >
      {/* Named Brad's way: group → colour → step (brand/indigo, utility/red). */}
      {(['neutral', 'brand-indigo', 'utility-green', 'utility-yellow', 'utility-red'] as const).map((ramp) => {
        const steps =
          ramp === 'neutral'
            ? ['white', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
            : ramp === 'brand-indigo'
              ? ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
              : ['100', '300', '500', '600', '700'];
        return (
          <Group key={ramp} title={ramp}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {steps.map((step) => (
                <div key={step} style={{ flex: '1 1 60px' }}>
                  <div
                    style={{
                      height: 48,
                      background: `var(--sds-color-${ramp}-${step})`,
                      border: '1px solid var(--sds-color-border-default)',
                    }}
                  />
                  <div style={{ ...mono, textAlign: 'center' }}>{step}</div>
                </div>
              ))}
            </div>
          </Group>
        );
      })}
    </Page>
  ),
};
