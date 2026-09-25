import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '../components/Alert';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { Fieldset } from '../components/Fieldset';
import { Form, FormActions } from '../components/Form';
import { NavigationMenu } from '../components/NavigationMenu';
import { NumberField } from '../components/NumberField';
import { RadioGroup, RadioGroupItem } from '../components/RadioGroup';
import { Select } from '../components/Select';
import { TextField } from '../components/TextField';
import { Textarea } from '../components/Textarea';
import { Toast } from '../components/Toast';
import { dates, guest, host, roles, tags, workshop } from './workshop/workshop';
import source from './WorkshopSignUp.stories.tsx?raw';
import layout from './workshop/Workshop.module.css';
import styles from './Patterns.module.css';
import { prototypeDocs } from './prototypeDocs';

/* Figma "GAP: Top bar — Split · space/4". No top bar component yet: the fifth copy. */
function WorkshopTopBar() {
  const stay = (event: MouseEvent) => event.preventDefault();
  return (
    <header className={`${styles.topBar} ${layout.topBar}`}>
      <span className={layout.wordmark}>Northwind Studio</span>
      <div className={styles.topBarActions}>
        <NavigationMenu.Root aria-label="Main">
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#events" active onClick={stay}>
                Events
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#workshops" onClick={stay}>
                Workshops
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#help" onClick={stay}>
                Help
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <Avatar fallback={guest.initials} size="sm" alt={guest.name} />
      </div>
    </header>
  );
}

function WorkshopPage() {
  const toasts = Toast.useToastManager();
  const [seats, setSeats] = useState(workshop.seats);
  const [booked, setBooked] = useState(1);

  // Figma annotation on "Sign up": checks name and email, then a success toast,
  // and the seats badge drops by the seats booked.
  const signUp = () => {
    setSeats((left) => Math.max(0, left - booked));
    toasts.add({ type: 'success', title: 'You are signed up', description: `The link goes to ${guest.email}` });
  };

  return (
    <div className={styles.shell}>
      <WorkshopTopBar />

      <main className={styles.main}>
        {/* Figma "Stack · space/6 — content, max 1024" */}
        <div className={styles.mainInner}>
          <Breadcrumb.Root aria-label="Breadcrumb">
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#events">Events</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#workshops">Workshops</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Current>{workshop.crumb}</Breadcrumb.Current>
            </Breadcrumb.Item>
          </Breadcrumb.Root>

          <div className={layout.header}>
            <h1 className={layout.title}>{workshop.title}</h1>
            <p className={layout.lead}>{workshop.lead}</p>
            <div className={layout.cluster}>
              {tags.map((tag) => (
                <Badge key={tag.label} variant={tag.variant} size="sm">
                  {tag.label}
                </Badge>
              ))}
              <Badge variant="warning" size="sm">
                {seats === 1 ? '1 seat left' : `${seats} seats left`}
              </Badge>
            </div>
          </div>

          {/* Figma "Columns · space/8" */}
          <div className={layout.columns}>
            {/* Figma "Stack · space/4 — Form": Form owns the field spacing. */}
            <Form onFormSubmit={signUp}>
              <Fieldset.Root>
                <Fieldset.Legend>Your details</Fieldset.Legend>
                <TextField label="Name" name="name" autoComplete="name" defaultValue={guest.name} required />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={guest.email}
                  required
                />
              </Fieldset.Root>

              {/* Figma "Grid · 2 · space/4 — role + seats" */}
              <div className={styles.fieldGrid}>
                <Select label="Your role" name="role" items={roles} defaultValue="product">
                  {Object.entries(roles).map(([value, label]) => (
                    <Select.Item key={value} value={value}>
                      {label}
                    </Select.Item>
                  ))}
                </Select>
                <NumberField
                  label="Seats"
                  name="seats"
                  description="Up to 3 per booking"
                  value={booked}
                  onValueChange={(value) => setBooked(value ?? 1)}
                  min={1}
                  max={3}
                />
              </div>

              <RadioGroup
                label="Choose a date"
                description="All sessions 10:00 to 13:30 CET"
                name="date"
                defaultValue="tue-14"
              >
                {dates.map((date) => (
                  <RadioGroupItem key={date.value} value={date.value} label={date.label} disabled={date.disabled} />
                ))}
              </RadioGroup>

              {/* SWAP: Figma has a single Checkbox. A Checkbox on its own crashes in
                  code (it needs a Field.Root; see figma/GAPS.md), so it sits in a
                  one-option CheckboxGroup, which adds the "Recording" label. */}
              <CheckboxGroup label="Recording" name="recording" defaultValue={['recording']}>
                <Checkbox name="recording" value="recording" label="Send me the recording afterwards" />
              </CheckboxGroup>

              <Textarea
                label="What do you want to learn?"
                name="goal"
                placeholder="A question, a project, a tool you are stuck on…"
                rows={3}
              />

              <FormActions>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
                <Button type="submit">Sign up</Button>
              </FormActions>
            </Form>

            {/* Figma "Stack · space/4 — Aside, 320px" */}
            <aside className={styles.stack} aria-label="About this workshop">
              <Card.Root variant="elevated">
                <Card.Header>
                  <Card.Title render={<h2 />}>{workshop.price}</Card.Title>
                  <Card.Description>{workshop.format}</Card.Description>
                </Card.Header>
                <Card.Body>{workshop.included}</Card.Body>
              </Card.Root>

              <div className={layout.host}>
                <Avatar fallback={host.initials} size="lg" alt={host.name} />
                <div>
                  <p className={layout.hostName}>{host.name}</p>
                  <p className={layout.hostRole}>{host.role}</p>
                </div>
              </div>

              <Alert variant="info" title="You get the link by email">
                We send the video link and the Figma file one day before.
              </Alert>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * **Prototype, from a brief.** Designed in Figma by Claude from a one-line
 * brief (Playground, section *Workshop sign-up (from a brief)*), built from
 * library instances and named layout frames, then brought back here with the
 * `storybook-figma-sync` skill. No layout question had to be asked: every
 * Figma frame carried its layout word and its token gap.
 *
 * **✅ Real components:** NavigationMenu.Link, Avatar, Breadcrumb, Badge,
 * Fieldset, TextField, Select, NumberField, RadioGroup, Checkbox, Textarea,
 * Button, Card, Alert, inside `Form` and `FormActions`, with the options set in
 * Figma. *Sign up* works: it checks name and email, then shows a success toast
 * and the seats badge counts down.
 *
 * **🟠 Built by hand:** the top bar and wordmark (no component; the fifth copy),
 * the host name and role (text styles, no person-row component), and the layout
 * classes in `workshop/Workshop.module.css`, one per Figma frame.
 *
 * **🔴 Where Figma and Storybook differ:** the recording Checkbox sits in a
 * one-option `CheckboxGroup` with a *Recording* label, because a Checkbox on its
 * own crashes in code (the *Sign-up form* pattern is broken by the same bug).
 * Everything else matches the Figma screen at 1280px (checked side by side).
 *
 * **💡 Worth suggesting:** a TopBar component, a person row (Avatar + name +
 * role), a fix for the standalone Checkbox.
 */
function WorkshopSignUp() {
  return (
    <Toast.Provider>
      <WorkshopPage />
      <Toast.Viewport />
    </Toast.Provider>
  );
}

const docs = prototypeDocs([
  { source, fn: 'WorkshopPage' },
  { source, fn: 'WorkshopTopBar' },
]);

const meta = {
  title: 'Prototypes/Workshop sign-up',
  component: WorkshopSignUp,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { source: docs.source } },
} satisfies Meta<typeof WorkshopSignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The page. Change the seats, pick a date, press *Sign up*. */
export const Default: Story = { parameters: { docs: { description: docs.description } } };
