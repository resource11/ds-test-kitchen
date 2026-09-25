import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button';

const meta = {
  title: 'Components/Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['outlined', 'elevated'] },
  },
  args: { variant: 'outlined' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  render: (args) => (
    <Card.Root {...args} style={{ maxWidth: 380 }}>
      <Card.Header>
        <Card.Title>Usage this month</Card.Title>
        <Card.Description>Resets on the first of every month.</Card.Description>
      </Card.Header>
      <Card.Body>You have used 4,210 of 10,000 included requests.</Card.Body>
    </Card.Root>
  ),
};

export const Elevated: Story = {
  args: { variant: 'elevated' },
  render: (args) => (
    <Card.Root {...args} style={{ maxWidth: 380 }}>
      <Card.Header>
        <Card.Title>Usage this month</Card.Title>
        <Card.Description>Resets on the first of every month.</Card.Description>
      </Card.Header>
      <Card.Body>You have used 4,210 of 10,000 included requests.</Card.Body>
    </Card.Root>
  ),
};

/** Header, body and a footer with real actions: the shape most product cards take. */
export const WithActions: Story = {
  args: { variant: 'elevated' },
  render: (args) => (
    <Card.Root {...args} style={{ maxWidth: 420 }}>
      <Card.Header>
        <Card.Title>Invite your team</Card.Title>
        <Card.Description>
          Team members can view dashboards and comment, but cannot change billing.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        Seats are billed per active member. You currently have 3 of 10 seats in use.
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Send invites</Button>
        <Button variant="ghost">Copy invite link</Button>
      </Card.Footer>
    </Card.Root>
  ),
};

/** Body only, for the times a card is just a framed surface. */
export const BodyOnly: Story = {
  render: (args) => (
    <Card.Root {...args} style={{ maxWidth: 380 }}>
      <Card.Body>A card is allowed to be nothing more than a surface.</Card.Body>
    </Card.Root>
  ),
};

/**
 * `Card.Title` renders an `h3` by default. On a page whose last heading was the
 * `h1`, that skips a level and axe's `heading-order` rule fails, so the card
 * takes the level the page needs: `render={<h2 />}`. Styling is unchanged; only
 * the tag differs.
 */
export const HeadingLevel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--sds-font-sans)',
          fontSize: 'var(--sds-font-size-xl)',
        }}
      >
        Billing
      </h1>
      <Card.Root variant="outlined" style={{ marginTop: 'var(--sds-space-4)' }}>
        <Card.Header>
          <Card.Title render={<h2 />}>Current plan</Card.Title>
          <Card.Description>Team, billed annually. Renews on 1 March.</Card.Description>
        </Card.Header>
        <Card.Body>The next heading on this page is an h2, so nothing is skipped.</Card.Body>
      </Card.Root>
    </div>
  ),
};

/** Both variants side by side, for eyeballing the set as a whole. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--sds-space-4)', flexWrap: 'wrap' }}>
      {(['outlined', 'elevated'] as const).map((variant) => (
        <Card.Root key={variant} variant={variant} style={{ width: 260 }}>
          <Card.Header>
            <Card.Title>{variant}</Card.Title>
            <Card.Description>Card.Root variant=&quot;{variant}&quot;</Card.Description>
          </Card.Header>
          <Card.Body>Same slots, different surface treatment.</Card.Body>
        </Card.Root>
      ))}
    </div>
  ),
};
