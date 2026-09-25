import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertDialog } from './AlertDialog';
import type { AlertDialogContentProps } from './AlertDialog';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Menu } from '../Menu';

const meta = {
  title: 'Components/Overlays/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Discard draft?',
    description: 'Your changes since the last save will be lost.',
  },
  render: (args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="secondary">Discard draft</Button>} />
      <AlertDialog.Content {...args}>
        <AlertDialog.Actions>
          <AlertDialog.Close render={<Button variant="secondary">Keep editing</Button>} />
          <AlertDialog.Close render={<Button>Discard</Button>} />
        </AlertDialog.Actions>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
};

export const Destructive: Story = {
  args: {
    title: 'Delete project?',
    description: 'Every environment, deployment and secret in this project is removed permanently.',
  },
  render: (args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="danger">Delete project</Button>} />
      <AlertDialog.Content {...args}>
        <AlertDialog.Actions>
          <AlertDialog.Close render={<Button variant="secondary">Cancel</Button>} />
          <AlertDialog.Close render={<Button variant="danger">Delete forever</Button>} />
        </AlertDialog.Actions>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
};

/**
 * Clicking the backdrop does nothing. Base UI's `AlertDialog.Root` hardcodes
 * `disablePointerDismissal: true`, so the only ways out are Escape or an
 * explicit `AlertDialog.Close`. Open this story and click outside to confirm.
 */
export const DoesNotDismissOnOutsideClick: Story = {
  args: {
    title: 'Revoke every API key?',
    description: 'Click outside this dialog: it stays open. Choose an action to continue.',
  },
  render: (args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="danger">Revoke API keys</Button>} />
      <AlertDialog.Content {...args}>
        <AlertDialog.Actions>
          <AlertDialog.Close render={<Button variant="secondary">Cancel</Button>} />
          <AlertDialog.Close render={<Button variant="danger">Revoke</Button>} />
        </AlertDialog.Actions>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
};

/** Title only. `description` is optional, so no `AlertDialog.Description` is rendered. */
export const WithoutDescription: Story = {
  args: { title: 'Sign out of all devices?' },
  render: (args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="secondary">Sign out everywhere</Button>} />
      <AlertDialog.Content {...args}>
        <AlertDialog.Actions>
          <AlertDialog.Close render={<Button variant="secondary">Cancel</Button>} />
          <AlertDialog.Close render={<Button>Sign out</Button>} />
        </AlertDialog.Actions>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
};

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
      <circle cx="8" cy="3.25" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="8" cy="12.75" r="1.25" />
    </svg>
  );
}

type Member = { id: string; name: string; email: string };

const initialMembers: Member[] = [
  { id: 'm1', name: 'Ines Barros', email: 'ines@northwind.example' },
  { id: 'm2', name: 'Tomas Reiter', email: 'tomas@northwind.example' },
  { id: 'm3', name: 'Ayo Fadeyi', email: 'ayo@northwind.example' },
];

/**
 * The row-menu-then-confirm pattern. The dialog is a single instance that lives
 * outside every menu; the menu item only records which row is pending, and
 * `AlertDialog.Root` is controlled from that state.
 */
function MemberList(args: AlertDialogContentProps) {
  const [members, setMembers] = useState(initialMembers);
  const [pending, setPending] = useState<Member | null>(null);

  return (
    <div style={{ width: 320, display: 'grid', gap: 'var(--sds-space-2)' }}>
      {members.map((member) => (
        <div
          key={member.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--sds-space-3)',
            padding: 'var(--sds-space-2) var(--sds-space-3)',
            border: '1px solid var(--sds-color-border-default)',
            borderRadius: 'var(--sds-radius-md)',
            background: 'var(--sds-color-background-surface)',
            fontFamily: 'var(--sds-font-sans)',
            fontSize: 'var(--sds-font-size-sm)',
          }}
        >
          <span>{member.name}</span>
          <Menu.Root>
            <Menu.Trigger
              render={
                <IconButton label={`Actions for ${member.name}`}>
                  <MoreIcon />
                </IconButton>
              }
            />
            <Menu.Content align="end">
              <Menu.Item>Change role</Menu.Item>
              <Menu.Item>Resend invite</Menu.Item>
              <Menu.Separator />
              {/*
                No AlertDialog.Trigger here. Selecting an item closes the menu
                and unmounts this popup, so a trigger inside it would disappear
                before the dialog could open. Record the row instead.
              */}
              <Menu.Item onClick={() => setPending(member)}>Remove from workspace</Menu.Item>
            </Menu.Content>
          </Menu.Root>
        </div>
      ))}

      {members.length === 0 ? (
        <p style={{ fontFamily: 'var(--sds-font-sans)', color: 'var(--sds-color-content-muted)' }}>
          Everyone has been removed. Reload the story to start again.
        </p>
      ) : null}

      <AlertDialog.Root
        open={pending !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPending(null);
          }
        }}
      >
        <AlertDialog.Content
          {...args}
          description={
            pending
              ? `${pending.name} (${pending.email}) loses access immediately. Anything they authored stays in the workspace.`
              : args.description
          }
        >
          <AlertDialog.Actions>
            <AlertDialog.Close render={<Button variant="secondary">Keep access</Button>} />
            {/*
              The onClick merges with the close: it runs first, then Base UI
              closes the dialog. No need to close it by hand.
            */}
            <AlertDialog.Close
              render={
                <Button
                  variant="danger"
                  onClick={() => setMembers((current) => current.filter((m) => m.id !== pending?.id))}
                >
                  Remove
                </Button>
              }
            />
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}

/**
 * Confirming an action chosen from a row menu. `AlertDialog.Trigger` cannot go
 * inside `Menu.Content`: the menu unmounts on selection and takes the trigger
 * with it. Lift the pending row into state and control `AlertDialog.Root` with
 * `open` / `onOpenChange` instead, as `MemberList` above does. Open a row menu,
 * choose "Remove from workspace", and the dialog opens after the menu has gone.
 */
export const FromAMenu: Story = {
  args: {
    title: 'Remove from workspace?',
    description: 'They lose access immediately.',
  },
  render: (args) => <MemberList {...args} />,
};
