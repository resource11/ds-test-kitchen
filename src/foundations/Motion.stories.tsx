import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Group, mono } from './tokenTable';
import { Button } from '../components/Button';

const meta = {
  title: 'Foundations/Motion',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 'var(--sds-space-6)' }}>
      <div>
        <Button onClick={() => setOn((v) => !v)}>{on ? 'Move back' : 'Move'}</Button>
      </div>
      {(['fast', 'normal'] as const).map((speed) => (
        <div key={speed}>
          <div style={{ ...mono, color: 'var(--sds-color-content-muted)', marginBottom: 'var(--sds-space-2)' }}>
            --sds-duration-{speed}
          </div>
          <div
            style={{
              height: 44,
              background: 'var(--sds-color-background-sunken)',
              borderRadius: 'var(--sds-radius-md)',
              position: 'relative',
              maxWidth: 480,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 6,
                left: 6,
                width: 32,
                height: 32,
                borderRadius: 'var(--sds-radius-md)',
                background: 'var(--sds-color-background-accent)',
                transform: on ? 'translateX(420px)' : 'translateX(0)',
                transition: `transform var(--sds-duration-${speed}) var(--sds-easing-standard)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export const Durations: Story = {
  render: () => (
    <Page
      title="Motion"
      intro="Two durations and one easing curve. Fast is for state changes on something already under the cursor, like a hover or a press. Normal is for things entering or leaving the screen. Anything slower than normal reads as lag rather than polish."
    >
      <Group title="Try it">
        <Demo />
      </Group>

      <Group
        title="Easing"
        note="One curve, cubic-bezier(0.2, 0, 0, 1). It starts quickly and settles, which is what makes an interface feel responsive rather than floaty. A single curve across a system is worth more than a nuanced set nobody applies consistently."
      >
        <div style={{ ...mono }}>--sds-easing-standard</div>
      </Group>

      <Group
        title="Reduced motion"
        note="Several components shorten or stop their transitions under prefers-reduced-motion. Set that in your OS accessibility settings and the Accordion, Collapsible and Spinner stories will change behaviour. Motion is a preference, not a decoration."
      >
        <div />
      </Group>
    </Page>
  ),
};
