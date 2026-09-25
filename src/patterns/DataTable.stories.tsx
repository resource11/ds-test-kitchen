import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AlertDialog } from '../components/AlertDialog';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import type { BadgeProps } from '../components/Badge';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { Menu } from '../components/Menu';
import { Select } from '../components/Select';
import { Table } from '../components/Table';
import { TextField } from '../components/TextField';
import styles from './Patterns.module.css';

/* ------------------------------------------------------------------ content */

type MemberStatus = 'Active' | 'Invited' | 'Suspended';

type Member = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  status: MemberStatus;
  lastActive: string;
};

const seedMembers: Member[] = [
  {
    id: 'm-01',
    name: 'Nadia Okonkwo',
    email: 'nadia.okonkwo@northwind.co',
    initials: 'NO',
    role: 'Owner',
    status: 'Active',
    lastActive: '2 minutes ago',
  },
  {
    id: 'm-02',
    name: 'Tomas Lindqvist',
    email: 'tomas.lindqvist@northwind.co',
    initials: 'TL',
    role: 'Admin',
    status: 'Active',
    lastActive: '1 hour ago',
  },
  {
    id: 'm-03',
    name: 'Priya Raghunathan',
    email: 'priya.r@northwind.co',
    initials: 'PR',
    role: 'Designer',
    status: 'Active',
    lastActive: 'Yesterday',
  },
  {
    id: 'm-04',
    name: 'Marcus Bell',
    email: 'marcus.bell@northwind.co',
    initials: 'MB',
    role: 'Engineer',
    status: 'Invited',
    lastActive: 'Never signed in',
  },
  {
    id: 'm-05',
    name: 'Ana Sofía Ruiz',
    email: 'ana.ruiz@northwind.co',
    initials: 'AR',
    role: 'Designer',
    status: 'Active',
    lastActive: '3 days ago',
  },
  {
    id: 'm-06',
    name: 'Jonah Weiss',
    email: 'jonah.weiss@contractor.dev',
    initials: 'JW',
    role: 'Contractor',
    status: 'Suspended',
    lastActive: '6 weeks ago',
  },
  {
    id: 'm-07',
    name: 'Hana Ito',
    email: 'hana.ito@northwind.co',
    initials: 'HI',
    role: 'Engineer',
    status: 'Active',
    lastActive: '4 hours ago',
  },
  {
    id: 'm-08',
    name: 'Declan Moore',
    email: 'declan.moore@northwind.co',
    initials: 'DM',
    role: 'Analyst',
    status: 'Invited',
    lastActive: 'Never signed in',
  },
];

const statusTone: Record<MemberStatus, BadgeProps['variant']> = {
  Active: 'success',
  Invited: 'warning',
  Suspended: 'danger',
};

const statusFilters = {
  all: 'All statuses',
  Active: 'Active',
  Invited: 'Invited',
  Suspended: 'Suspended',
};

/* -------------------------------------------------------------------- pieces */

function MoreIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="3" r="1.4" />
      <circle cx="8" cy="8" r="1.4" />
      <circle cx="8" cy="13" r="1.4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  );
}

/* --------------------------------------------------------------- the screen */

function MembersScreen({ initialQuery = '' }: { initialQuery?: string }) {
  const [members, setMembers] = useState(seedMembers);
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState('all');
  /** The row the delete confirmation is about. `null` closes the dialog. */
  const [pendingRemoval, setPendingRemoval] = useState<Member | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesQuery =
        needle === '' ||
        member.name.toLowerCase().includes(needle) ||
        member.email.toLowerCase().includes(needle) ||
        member.role.toLowerCase().includes(needle);
      const matchesStatus = status === 'all' || member.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [members, query, status]);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Members</h1>
        <p className={styles.pageLead}>
          Everyone with access to the Northwind workspace. Removing someone revokes their access
          immediately; their comments and component history stay.
        </p>
      </div>

      <div className={styles.toolbarRow}>
        <div className={styles.toolbarSearch}>
          <TextField
            label="Search members"
            name="search"
            type="search"
            placeholder="Name, email or role"
            value={query}
            onValueChange={(value) => setQuery(value)}
          />
        </div>
        <div className={styles.toolbarFilter}>
          <Select.Field
            label="Status"
            name="status"
            items={statusFilters}
            value={status}
            onValueChange={(value) => setStatus(value ?? 'all')}
          >
            {Object.entries(statusFilters).map(([value, label]) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Field>
        </div>
        <Button onClick={() => setLastAction('Invite dialog would open here.')}>
          <PlusIcon />
          Invite member
        </Button>
      </div>

      <div>
        <Table.Root caption="Workspace members" hideCaption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Member</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Last active</Table.HeaderCell>
              {/* `Table.headerCell` already sets `text-align: left`; the override is
                  inline so it does not depend on stylesheet order between modules. */}
              <Table.HeaderCell className={styles.rowActions} style={{ textAlign: 'right' }}>
                Actions
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {visible.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={5} className={styles.emptyCell}>
                  No members match &ldquo;{query}&rdquo;. Try a different search or clear the status
                  filter.
                </Table.Cell>
              </Table.Row>
            ) : (
              visible.map((member) => (
                <Table.Row key={member.id}>
                  <Table.Cell>
                    <div className={styles.personCell}>
                      <Avatar size="sm" fallback={member.initials} />
                      <span>
                        <span className={styles.personName}>{member.name}</span>
                        <span className={styles.personEmail}>{member.email}</span>
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{member.role}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={statusTone[member.status]} size="sm">
                      {member.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{member.lastActive}</Table.Cell>
                  <Table.Cell className={styles.rowActions}>
                    <Menu.Root>
                      <Menu.Trigger
                        render={
                          <IconButton size="sm" label={`Actions for ${member.name}`}>
                            <MoreIcon />
                          </IconButton>
                        }
                      />
                      <Menu.Content align="end">
                        <Menu.Item onClick={() => setLastAction(`Editing ${member.name}.`)}>
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => setLastAction(`Duplicated the role of ${member.name}.`)}
                        >
                          Duplicate
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item onClick={() => setPendingRemoval(member)}>Delete</Menu.Item>
                      </Menu.Content>
                    </Menu.Root>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>

        <div className={styles.tableFooter}>
          <span>
            Showing {visible.length} of {members.length} members
          </span>
          <span>{lastAction ?? 'Seats used: 24 of 30'}</span>
        </div>
      </div>

      {/*
        Controlled rather than trigger-based: the row menu closes as soon as an
        item is chosen, so the confirmation cannot hang off a trigger inside it.
        The row being confirmed lives in state, and clearing it closes the dialog.
      */}
      <AlertDialog.Root
        open={pendingRemoval !== null}
        onOpenChange={(open) => {
          if (!open) setPendingRemoval(null);
        }}
      >
        <AlertDialog.Content
          title={`Remove ${pendingRemoval?.name ?? 'this member'}?`}
          description={`${pendingRemoval?.name ?? 'They'} loses access to every project in this workspace straight away. Their comments and version history are kept.`}
        >
          <AlertDialog.Actions>
            <AlertDialog.Close render={<Button variant="secondary">Cancel</Button>} />
            <Button
              variant="danger"
              onClick={() => {
                if (pendingRemoval) {
                  setMembers((current) =>
                    current.filter((member) => member.id !== pendingRemoval.id),
                  );
                  setLastAction(`${pendingRemoval.name} was removed.`);
                }
                setPendingRemoval(null);
              }}
            >
              Remove member
            </Button>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}

/**
 * The list view every admin area needs: search and filter above, a table of
 * people in the middle, a per-row action menu, and a destructive action that
 * has to be confirmed.
 *
 * What it is showing off:
 *
 * - **A filter bar that is really three form controls.** `TextField`,
 *   `Select.Field` and `Button` line up on their baselines because each renders
 *   its own label above the control at the same scale. `Toolbar` is not used
 *   here on purpose: its roving-focus contract expects `Toolbar.*` children, and
 *   labelled field components are not that.
 * - **Identity cells that stay scannable.** `Avatar` at `sm` beside a two-line
 *   name and email, so the row reads as a person rather than a string.
 * - **Status as a `Badge` with a tone token,** with the word always present —
 *   never colour alone.
 * - **Row actions behind one `IconButton`.** `Menu.Trigger render={...}` reuses
 *   the real `IconButton`, so a table full of them keeps the same focus ring,
 *   hit area and disabled behaviour as every other button in the system. The
 *   required `label` prop makes each one say whose row it belongs to.
 * - **A controlled `AlertDialog` for the destructive path.** The menu closes on
 *   selection, so the dialog cannot hang off a trigger inside it: the pending
 *   row lives in state instead. Backdrop clicks cannot dismiss it — that is
 *   built into `AlertDialog`, not configured here.
 * - **A footer that answers "how many of what".** Result count on the left,
 *   the last thing that happened on the right.
 */
const meta = {
  title: 'Patterns/Data table',
  component: MembersScreen,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof MembersScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Eight members. Open a row menu, choose Delete, and confirm to see the row go. */
export const Default: Story = {};

/** The empty state: a search that matches nothing still explains what to do next. */
export const NoMatches: Story = {
  args: { initialQuery: 'zeppelin' },
};
