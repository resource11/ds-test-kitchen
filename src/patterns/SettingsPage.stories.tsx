import { useId } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../components/Badge';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { Select } from '../components/Select';
import { Separator } from '../components/Separator';
import { Switch } from '../components/Switch';
import { Table } from '../components/Table';
import { Tabs } from '../components/Tabs';
import { TextField } from '../components/TextField';
import styles from './Patterns.module.css';

/* ------------------------------------------------------------------ content */

const timezones = {
  'europe-london': 'London — GMT+0',
  'europe-berlin': 'Berlin — GMT+1',
  'europe-lisbon': 'Lisbon — GMT+0',
  'america-new-york': 'New York — GMT-5',
  'america-sao-paulo': 'São Paulo — GMT-3',
  'asia-singapore': 'Singapore — GMT+8',
};

type InvoiceStatus = 'Paid' | 'Due' | 'Failed';

const invoices: Array<{
  ref: string;
  issued: string;
  plan: string;
  amount: string;
  status: InvoiceStatus;
}> = [
  { ref: 'INV-2043', issued: '1 Sep 2026', plan: 'Team · 24 seats', amount: '€432.00', status: 'Due' },
  { ref: 'INV-2011', issued: '1 Aug 2026', plan: 'Team · 24 seats', amount: '€432.00', status: 'Paid' },
  { ref: 'INV-1984', issued: '1 Jul 2026', plan: 'Team · 22 seats', amount: '€396.00', status: 'Paid' },
  { ref: 'INV-1950', issued: '1 Jun 2026', plan: 'Team · 22 seats', amount: '€396.00', status: 'Failed' },
  { ref: 'INV-1921', issued: '1 May 2026', plan: 'Team · 20 seats', amount: '€360.00', status: 'Paid' },
];

const invoiceTone = {
  Paid: 'success',
  Due: 'warning',
  Failed: 'danger',
} as const;

/* -------------------------------------------------------------------- pieces */

/**
 * A preference row: label, supporting copy, and the control on the right.
 *
 * `Switch` has its own `label` and `description`, but they sit beside the
 * control. This row puts the text on the left and the switch on the right, so
 * the row owns the text and wires it up itself: `htmlFor` for the name,
 * `aria-describedby` for the explanation.
 */
function SettingRow({
  label,
  description,
  name,
  defaultChecked = false,
  disabled = false,
}: {
  label: string;
  description: string;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const id = useId();
  const descriptionId = `${id}-description`;

  return (
    <div className={styles.settingRow}>
      <div className={styles.settingText}>
        <label className={styles.settingLabel} htmlFor={id}>
          {label}
        </label>
        <p className={styles.settingDescription} id={descriptionId}>
          {description}
        </p>
      </div>
      <div className={styles.settingControl}>
        <Switch
          id={id}
          name={name}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-describedby={descriptionId}
        />
      </div>
    </div>
  );
}

function ProfilePanel() {
  return (
    <>
      <h2 className={styles.sectionTitle}>Profile</h2>
      <Card.Root>
        <Card.Header>
          <Card.Title>Personal details</Card.Title>
          <Card.Description>
            Shown to everyone in the Northwind workspace. Your email is only visible to admins.
          </Card.Description>
        </Card.Header>

        <Card.Body>
          <div className={styles.fieldGrid}>
            <TextField label="Full name" name="fullName" defaultValue="Nadia Okonkwo" required />
            <TextField label="Display name" name="displayName" defaultValue="Nadia" />
            <TextField
              label="Email address"
              name="email"
              type="email"
              defaultValue="nadia.okonkwo@northwind.co"
              description="Used for sign-in and billing receipts."
            />
            <TextField label="Job title" name="jobTitle" defaultValue="Staff product designer" />
            <div className={styles.fieldGridWide}>
              <Select.Field
                label="Timezone"
                name="timezone"
                items={timezones}
                defaultValue="europe-lisbon"
                placeholder="Choose a timezone"
                description="Meeting times and digests are shown in this timezone."
              >
                {Object.entries(timezones).map(([value, label]) => (
                  <Select.Item key={value} value={value}>
                    {label}
                  </Select.Item>
                ))}
              </Select.Field>
            </div>
          </div>

          <Separator style={{ marginBlock: 'var(--sds-space-5)' }} />

          <SettingRow
            name="showLocalTime"
            label="Show my local time on my profile"
            description="Teammates in other regions see the current time where you are before they message you."
            defaultChecked
          />
          <Separator />
          <SettingRow
            name="weeklyDigest"
            label="Weekly design review digest"
            description="A Monday summary of every review you were tagged in during the previous week."
            defaultChecked
          />
          <Separator />
          <SettingRow
            name="directoryListing"
            label="Appear in the member directory"
            description="Turning this off hides you from search. Admins can still see your account."
          />
        </Card.Body>

        <Card.Footer>
          <p className={styles.footerNote}>Last saved 4 September 2026 at 16:20.</p>
          <Button variant="ghost">Cancel</Button>
          <Button>Save changes</Button>
        </Card.Footer>
      </Card.Root>
    </>
  );
}

function NotificationsPanel() {
  return (
    <>
      <h2 className={styles.sectionTitle}>Notifications</h2>
      <div className={styles.stack}>
        <Card.Root>
          <Card.Header>
            <Card.Title>Email</Card.Title>
            <Card.Description>
              Sent to nadia.okonkwo@northwind.co. Batched hourly so a busy thread cannot flood
              your inbox.
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <CheckboxGroup
              label="Email me when"
              description="You always receive security and billing mail; those cannot be turned off."
              name="emailEvents"
              defaultValue={['mentions', 'reviewRequests']}
            >
              <Checkbox
                name="mentions"
                label="Someone mentions me"
                description="In a comment, a review or a document."
              />
              <Checkbox
                name="reviewRequests"
                label="I am asked to review something"
                description="Component proposals, token changes and release candidates."
              />
              <Checkbox
                name="statusChanges"
                label="A component I own changes status"
                description="For example moving from Draft to Stable."
              />
              <Checkbox
                name="releases"
                label="A release ships"
                description="One message per published version, with the changelog."
              />
            </CheckboxGroup>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>In product</Card.Title>
            <Card.Description>
              These take effect immediately, which is why they are switches rather than
              checkboxes waiting on a save.
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <SettingRow
              name="desktopPush"
              label="Desktop notifications"
              description="Show a system notification while the Northwind tab is open in the background."
              defaultChecked
            />
            <Separator />
            <SettingRow
              name="soundOnMention"
              label="Play a sound on direct mentions"
              description="Only for mentions of your name, never for channel-wide announcements."
            />
            <Separator />
            <SettingRow
              name="quietHours"
              label="Quiet hours, 19:00 to 08:00"
              description="Notifications are held and delivered as one summary the next morning."
              defaultChecked
            />
            <Separator />
            <SettingRow
              name="smsAlerts"
              label="SMS for incidents"
              description="Available on the Enterprise plan. Contact your admin to enable it."
              disabled
            />
          </Card.Body>
        </Card.Root>
      </div>
    </>
  );
}

function BillingPanel() {
  return (
    <>
      <h2 className={styles.sectionTitle}>Billing</h2>
      <Card.Root>
        <Card.Header>
          <Card.Title>Invoices</Card.Title>
          <Card.Description>
            Team plan, billed monthly on the 1st. Receipts go to the workspace billing contact.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Table.Root caption="Invoices from the last five months" hideCaption striped>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Reference</Table.HeaderCell>
                <Table.HeaderCell>Issued</Table.HeaderCell>
                <Table.HeaderCell>Plan</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {invoices.map((invoice) => (
                <Table.Row key={invoice.ref}>
                  <Table.Cell>
                    <span className={styles.mono}>{invoice.ref}</span>
                  </Table.Cell>
                  <Table.Cell>{invoice.issued}</Table.Cell>
                  <Table.Cell>{invoice.plan}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={invoiceTone[invoice.status]} size="sm">
                      {invoice.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell numeric>{invoice.amount}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Body>
        <Card.Footer>
          <p className={styles.footerNote}>Next invoice: 1 October 2026.</p>
          <Button variant="secondary">Download all</Button>
          <Button>Update payment method</Button>
        </Card.Footer>
      </Card.Root>
    </>
  );
}

/* --------------------------------------------------------------- the screen */

function SettingsPage({ defaultTab = 'profile' }: { defaultTab?: string }) {
  return (
    <div className={styles.page}>
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#home">Northwind</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#workspace">Workspace</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Current>Account settings</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.Root>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Account settings</h1>
        <p className={styles.pageLead}>
          Everything here applies to your account across every Northwind workspace you belong to.
          Workspace-wide policies are set by an admin under Workspace &rsaquo; Policies.
        </p>
      </div>

      <Tabs.Root defaultValue={defaultTab}>
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Panel value="profile">
          <ProfilePanel />
        </Tabs.Panel>
        <Tabs.Panel value="notifications">
          <NotificationsPanel />
        </Tabs.Panel>
        <Tabs.Panel value="billing">
          <BillingPanel />
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}

/**
 * An account settings screen, the shape most products land on eventually:
 * breadcrumb, page heading, tabbed sections, and a card per group of settings.
 *
 * What it is showing off:
 *
 * - **One heading ladder across composed components.** The page owns the `h1`,
 *   each tab panel owns an `h2`, and `Card.Title` supplies the `h3`. Cards are
 *   dropped into a page without breaking document outline.
 * - **Two kinds of preference, styled two ways.** Switches for things that take
 *   effect the moment you flip them; a `CheckboxGroup` for things that wait on
 *   a save. Same tokens, different affordance, and the copy says which is which.
 * - **Labels and descriptions that survive composition.** `TextField`,
 *   `Select.Field` and `CheckboxGroup` each wire their own label, description
 *   and error slot through Base UI's `Field`, so a page of them needs no ids.
 * - **A settings row built from parts.** The text sits apart from the `Switch`,
 *   so the row supplies the label and helper text and connects them with
 *   `htmlFor` / `aria-describedby` — the pattern to copy when a control is
 *   smaller than the row it lives in.
 * - **Status as colour and word together.** Invoice badges pair a tone token
 *   with the status name, so the meaning does not depend on colour alone.
 */
const meta = {
  title: 'Patterns/Settings page',
  component: SettingsPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The Profile tab: identity fields, a timezone select, and preference switches. */
export const Default: Story = {
  args: { defaultTab: 'profile' },
};

/**
 * The Notifications tab. A `CheckboxGroup` for the batched email preferences,
 * switches for the ones that apply immediately, and one disabled row showing
 * how a plan-gated setting reads.
 */
export const NotificationsTab: Story = {
  args: { defaultTab: 'notifications' },
};

/** The Billing tab: an invoice `Table` with `Badge` status cells. */
export const BillingTab: Story = {
  args: { defaultTab: 'billing' },
};
