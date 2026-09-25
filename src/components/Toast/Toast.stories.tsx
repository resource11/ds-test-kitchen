import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';
import { Button } from '../Button';

/**
 * Every story wraps its content in `Toast.Provider` and mounts one
 * `Toast.Viewport`, which is how a real app is set up: provider once at the
 * root, viewport once beside it.
 */
const meta = {
  title: 'Components/Overlays/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <Toast.Provider>
        <Story />
        <Toast.Viewport />
      </Toast.Provider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A button that fires a plain toast. */
function FireToast() {
  const manager = Toast.useToastManager();

  return (
    <Button
      onClick={() =>
        manager.add({
          title: 'Deployment queued',
          description: 'Build #482 starts as soon as a runner frees up.',
        })
      }
    >
      Show toast
    </Button>
  );
}

export const Default: Story = {
  render: () => <FireToast />,
};

/**
 * `type` lands on the root as `data-type`, so the border colour is a CSS
 * concern rather than a prop the component has to thread through.
 */
function FireTypedToasts() {
  const manager = Toast.useToastManager();

  return (
    <div style={{ display: 'flex', gap: 'var(--sds-space-2)' }}>
      <Button
        onClick={() =>
          manager.add({
            type: 'success',
            title: 'Published',
            description: 'Release 2.4 is live for everyone.',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          manager.add({
            type: 'error',
            priority: 'high',
            title: 'Build failed',
            description: 'Three tests failed in packages/core.',
          })
        }
      >
        Error
      </Button>
    </div>
  );
}

export const Types: Story = {
  render: () => <FireTypedToasts />,
};

/** `actionProps` renders `Toast.Action`; without it the action button is absent. */
function FireActionToast() {
  const manager = Toast.useToastManager();

  return (
    <Button
      variant="secondary"
      onClick={() => {
        const id = manager.add({
          title: 'Message archived',
          description: 'Moved out of your inbox.',
          actionProps: {
            children: 'Undo',
            onClick: () => manager.close(id),
          },
        });
      }}
    >
      Archive message
    </Button>
  );
}

export const WithAction: Story = {
  render: () => <FireActionToast />,
};

/**
 * `timeout: 0` keeps a toast up until it is dismissed. Use it for anything the
 * reader must acknowledge.
 */
function FirePersistentToast() {
  const manager = Toast.useToastManager();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        manager.add({
          type: 'error',
          timeout: 0,
          title: 'Connection lost',
          description: 'This one stays until you close it.',
        })
      }
    >
      Show persistent toast
    </Button>
  );
}

export const Persistent: Story = {
  render: () => <FirePersistentToast />,
};

/**
 * `manager.promise` swaps one toast through loading, success and error states
 * as the promise settles.
 */
function FirePromiseToast() {
  const manager = Toast.useToastManager();

  return (
    <div style={{ display: 'flex', gap: 'var(--sds-space-2)' }}>
      <Button
        onClick={() =>
          manager.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
              loading: 'Uploading…',
              success: { type: 'success', title: 'Uploaded', description: 'report.pdf is ready.' },
              error: { type: 'error', title: 'Upload failed' },
            },
          )
        }
      >
        Upload (resolves)
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          manager
            .promise(
              new Promise((_, reject) => setTimeout(() => reject(new Error('offline')), 1500)),
              {
                loading: 'Uploading…',
                success: { type: 'success', title: 'Uploaded' },
                error: { type: 'error', title: 'Upload failed', description: 'You appear to be offline.' },
              },
            )
            .catch(() => undefined)
        }
      >
        Upload (rejects)
      </Button>
    </div>
  );
}

export const PromiseLifecycle: Story = {
  render: () => <FirePromiseToast />,
};

/** A disabled trigger fires nothing; the queue and viewport stay empty. */
export const DisabledTrigger: Story = {
  render: () => (
    <Button disabled onClick={() => undefined}>
      Show toast
    </Button>
  ),
};
