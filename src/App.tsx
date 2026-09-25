import { Button } from './components/Button';
import { TextField } from './components/TextField';
import { Switch } from './components/Switch';
import { Dialog } from './components/Dialog';

/**
 * A scratch playground. Storybook is the real surface for this project;
 * this page exists so you can try components in a plain app context.
 */
export default function App() {
  return (
    <main
      style={{
        maxWidth: 480,
        margin: '0 auto',
        padding: 'var(--sds-space-10) var(--sds-space-4)',
        display: 'grid',
        gap: 'var(--sds-space-6)',
      }}
    >
      <h1 style={{ margin: 0 }}>Sample Design System</h1>
      <TextField label="Email address" placeholder="you@example.com" />
      <Switch label="Email notifications" defaultChecked />
      <div style={{ display: 'flex', gap: 'var(--sds-space-3)' }}>
        <Button>Save changes</Button>
        <Dialog.Root>
          <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
          <Dialog.Content title="Publish this release?" description="Everyone will be notified.">
            <Dialog.Actions>
              <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
              <Dialog.Close render={<Button>Publish</Button>} />
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </main>
  );
}
