import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion } from '../components/Accordion';
import { Alert } from '../components/Alert';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Dialog } from '../components/Dialog';
import { Fieldset } from '../components/Fieldset';
import { Form, FormActions } from '../components/Form';
import { Meter } from '../components/Meter';
import { NumberField } from '../components/NumberField';
import { Progress } from '../components/Progress';
import { RadioGroup, RadioGroupItem } from '../components/RadioGroup';
import { Select } from '../components/Select';
import { Switch } from '../components/Switch';
import { Tabs } from '../components/Tabs';
import { TextField } from '../components/TextField';
import { Textarea } from '../components/Textarea';
import { Toast } from '../components/Toast';
import { BookingTopBar } from './booking/BookingTopBar';
import { guest, included, languages, tabs, tags, times, tour } from './booking/tour';
import topBarSource from './booking/BookingTopBar.tsx?raw';
import source from './BookingFlow.stories.tsx?raw';
import booking from './booking/Booking.module.css';
import styles from './Patterns.module.css';
import { prototypeDocs } from './prototypeDocs';

type Step = 'tour' | 'book' | 'confirm' | 'booked';

/* ------------------------------------------------------------ 1 · Tour page */

function TourPage({ booked, onBook }: { booked: boolean; onBook: () => void }) {
  const [showBookedAlert, setShowBookedAlert] = useState(true);
  const taken = booked ? tour.taken + guest.people : tour.taken;
  const left = tour.capacity - taken;

  return (
    <>
      <Breadcrumb.Root aria-label="Breadcrumb">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#tours">Tours</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#old-town">Old town</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Current>{tour.crumb}</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.Root>

      {booked && showBookedAlert ? (
        <Alert
          variant="success"
          title="You’re booked"
          onDismiss={() => setShowBookedAlert(false)}
          dismissLabel="Dismiss booking confirmation"
        >
          {guest.people} people on Sat 18 October at 10:00. The details are on their way to{' '}
          {guest.email}.
        </Alert>
      ) : null}

      <div className={booking.header}>
        <div className={booking.cluster}>
          {tags.map((tag) => (
            <Badge key={tag.label} variant={tag.variant} size="sm">
              {tag.label}
            </Badge>
          ))}
          <Badge variant="warning" size="sm">
            {left === 1 ? '1 spot left' : `${left} spots left`}
          </Badge>
        </div>
        <h1 className={booking.title}>{tour.name}</h1>
        <p className={booking.lead}>{tour.lead}</p>
      </div>

      <div className={booking.columns}>
        <div className={booking.column}>
          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  {tab.label}
                </Tabs.Tab>
              ))}
              <Tabs.Indicator />
            </Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Panel key={tab.value} value={tab.value} className={booking.tabPanel}>
                {tab.text}
              </Tabs.Panel>
            ))}
          </Tabs.Root>

          <h2 className={booking.sectionTitle}>What’s included</h2>
          <Accordion.Root defaultValue={['guide']}>
            {included.map((item) => (
              <Accordion.Item key={item.value} value={item.value}>
                <Accordion.Header>
                  <Accordion.Trigger>{item.title}</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel>{item.text}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          <div className={booking.guide}>
            <Avatar fallback="JL" size="lg" alt="Jana Lind" />
            <div>
              <p className={booking.guideName}>Jana Lind</p>
              <p className={booking.guideRole}>Your guide · 8 years leading tours</p>
            </div>
          </div>
        </div>

        <aside className={styles.stack} aria-label="Booking">
          <Card.Root variant="elevated">
            <Card.Header>
              <Card.Title render={<h2 />}>
                {booked ? `You have ${guest.people} spots` : tour.price}
              </Card.Title>
              <Card.Description>{booked ? 'Sat 18 October · 10:00' : tour.schedule}</Card.Description>
            </Card.Header>
            <Card.Body>
              {booked ? 'Your guide’s number and a map arrive the day before.' : tour.cancellation}
            </Card.Body>
            <Card.Footer>
              {booked ? (
                <>
                  <Button variant="secondary">Add to calendar</Button>
                  <Button variant="ghost">Manage</Button>
                </>
              ) : (
                <>
                  <Button onClick={onBook}>Book a spot</Button>
                  <Button variant="ghost">Ask a question</Button>
                </>
              )}
            </Card.Footer>
          </Card.Root>

          <Meter label={`${taken} of ${tour.capacity} spots taken`} value={taken} max={tour.capacity} />
        </aside>
      </div>
    </>
  );
}

/* --------------------------------------------------------- 2 · Booking form */

function BookingForm({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <>
      <Progress
        className={booking.progress}
        label="Step 1 of 2 · Your details"
        value={50}
        showValue
        size="sm"
      />

      <div className={booking.header}>
        <h1 className={booking.title}>Book your spots</h1>
        <p className={booking.lead}>Takes about a minute. Free cancellation up to 24 hours before.</p>
      </div>

      <div className={booking.columns}>
        <Form onFormSubmit={() => onContinue()}>
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
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Optional, for a reminder text"
            />
          </Fieldset.Root>

          <RadioGroup
            label="Choose a time"
            description="Tours start at the harbour master’s office."
            name="time"
            defaultValue="sat-10"
          >
            {times.map((time) => (
              <RadioGroupItem key={time.value} value={time.value} label={time.label} disabled={time.disabled} />
            ))}
          </RadioGroup>

          <div className={styles.fieldGrid}>
            <NumberField
              label="People"
              name="people"
              description="Up to 8 per booking"
              defaultValue={guest.people}
              min={1}
              max={8}
            />
            <Select label="Tour language" name="language" items={languages} defaultValue="en">
              {Object.entries(languages).map(([value, label]) => (
                <Select.Item key={value} value={value}>
                  {label}
                </Select.Item>
              ))}
            </Select>
          </div>

          <Switch label="Text me a reminder the day before" name="reminder" defaultChecked />
          <Textarea
            label="Anything we should know?"
            name="notes"
            placeholder="Accessibility needs, a pram, questions…"
            rows={3}
          />

          <FormActions>
            <Button type="button" variant="secondary" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </FormActions>
        </Form>

        <aside className={styles.stack} aria-label="Summary">
          <Card.Root>
            <Card.Header>
              <Card.Title render={<h2 />}>Your booking</Card.Title>
              <Card.Description>Old Town & Harbour · Sat 18 October, 10:00</Card.Description>
            </Card.Header>
            <Card.Body>2 × €29 = €58. Free cancellation until 24 hours before.</Card.Body>
          </Card.Root>
          <Alert variant="info" title="Where to meet">
            In front of the harbour master’s office. We’ll text you a map the day before.
          </Alert>
        </aside>
      </div>
    </>
  );
}

/* ------------------------------------------- the flow: 3 · confirm, 4 · booked */

function Flow({ initialStep }: { initialStep: Step }) {
  const [step, setStep] = useState<Step>(initialStep);
  const toasts = Toast.useToastManager();
  const announced = useRef(false);
  const screen = step === 'book' || step === 'confirm' ? 'form' : 'tour';

  // A new screen starts at the top; opening the dialog does not.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [screen]);

  // The toast belongs to arriving on "booked", however you got there.
  useEffect(() => {
    if (step !== 'booked') {
      announced.current = false;
      return;
    }
    if (announced.current) return;
    announced.current = true;
    toasts.add({
      type: 'success',
      title: 'Booking confirmed',
      description: `Receipt sent to ${guest.email}`,
      actionProps: { children: 'View receipt' },
    });
  }, [step, toasts]);

  return (
    <div className={styles.shell}>
      <BookingTopBar onHome={() => setStep('tour')} />

      <main className={styles.main}>
        <div className={styles.mainInner}>
          {screen === 'form' ? (
            <BookingForm onBack={() => setStep('tour')} onContinue={() => setStep('confirm')} />
          ) : (
            <TourPage booked={step === 'booked'} onBook={() => setStep('book')} />
          )}
        </div>
      </main>

      <Dialog.Root
        open={step === 'confirm'}
        onOpenChange={(open) => {
          if (!open) setStep('book');
        }}
      >
        <Dialog.Content
          title="Confirm your booking?"
          description={`${guest.people} people on Sat 18 October at 10:00. €58, charged today. Free cancellation until 24 hours before.`}
        >
          <Dialog.Actions>
            <Dialog.Close render={<Button variant="secondary">Go back</Button>} />
            <Button onClick={() => setStep('booked')}>Confirm booking</Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

/** Provider once, viewport once — the way a real app mounts toasts. */
function BookingFlow({ initialStep = 'tour' }: { initialStep?: Step }) {
  return (
    <Toast.Provider>
      <Flow key={initialStep} initialStep={initialStep} />
      <Toast.Viewport />
    </Toast.Provider>
  );
}

/**
 * **Prototype, not a pattern.** Rebuilt from Figma *Version C — Booking flow*
 * (Playground file) using only components that exist in code. It clicks
 * through like the Figma prototype: *Book a spot* → *Continue* → *Confirm
 * booking*, with *Back*, *Go back* and *Tours* in the top bar to return.
 *
 * | In Figma | In code | Status |
 * | --- | --- | --- |
 * | Badges, Breadcrumb, Tabs, Accordion, Avatar, Card, Button, Alert | The same components | Match |
 * | Fieldset, TextField, RadioGroup, NumberField, Select, Switch, Textarea | The same components, inside `Form` | Match — `Form` adds validation on *Continue* |
 * | Confirm dialog over the dimmed page | `Dialog.Root` + `Dialog.Content` + `Dialog.Actions` | Match |
 * | Toast on screen 4 | `Toast.useToastManager().add()` | Match |
 * | Progress “50%” | `Progress` with `showValue` | Match |
 * | Meter showing “9 of 12” | `Meter` with `value` 9 of `max` 12 | **Swap** — `Meter` can only print a percentage, so the count moves into the label |
 * | Form rows 24px apart, actions left | `Form` (16px) and `FormActions` (right-aligned) | **Swap** — the system’s form decides this; Figma follows |
 * | People next to Language | `fieldGrid` from the patterns | Match — page layout, not a component |
 * | Top bar frame | `AppShell` classes, `space-between` | **Gap** — no top bar component yet; fourth copy in the repo |
 * | Nav links in a frame | `NavigationMenu` with flat `Link`s | **Gap** — Figma’s `NavigationMenu` has no flat-link variant |
 * | Titles, lead, section heading, guide name | Plain `h1` / `h2` / `p`, each on a whole text style | **Gap** — no text component; same as every pattern |
 *
 * A form cannot sit inside Figma’s `Dialog.Content` (it has no slot), so the
 * form is its own step and the dialog only confirms — kept that way here so
 * the two stay one design.
 */
const docs = prototypeDocs([
  { source, fn: 'TourPage' },
  { source, fn: 'BookingForm' },
  { source, fn: 'Flow' },
  { source, fn: 'BookingFlow' },
  { source: topBarSource, fn: 'BookingTopBar' },
]);

const meta = {
  title: 'Prototypes/Booking flow',
  component: BookingFlow,
  tags: ['autodocs'],
  // Every story's "Show code" is the whole flow, not `<BookingFlow initialStep=… />`.
  parameters: { layout: 'fullscreen', docs: { source: docs.source } },
  argTypes: {
    initialStep: { control: 'inline-radio', options: ['tour', 'book', 'confirm', 'booked'] },
  },
} satisfies Meta<typeof BookingFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Screen 1: the tour page. Click *Book a spot* to walk the whole flow. */
export const Tour: Story = {
  args: { initialStep: 'tour' },
  // The "Components used" table once, on the first story, not four times.
  parameters: { docs: { description: docs.description } },
};

/** Screen 2: the booking form. *Continue* validates, then opens the dialog. */
export const Book: Story = { args: { initialStep: 'book' } };

/** Screen 3: the confirm dialog over the form. Canvas only — an open modal would cover the docs page. */
export const Confirm: Story = { args: { initialStep: 'confirm' }, tags: ['!autodocs'] };

/** Screen 4: booked, with the success alert and the toast. Canvas only, for the same reason. */
export const Booked: Story = { args: { initialStep: 'booked' }, tags: ['!autodocs'] };
