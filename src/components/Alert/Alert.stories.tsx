import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    dismissLabel: { control: 'text' },
    onDismiss: { action: 'dismissed' },
  },
  args: {
    variant: 'info',
    title: 'Scheduled maintenance',
    children: 'Exports are paused on Sunday from 02:00 to 04:00 UTC.',
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `role="status"`: announced politely, without interrupting the user. */
export const Info: Story = {};

/** Also `role="status"`: a good outcome is worth saying, not worth interrupting for. */
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Import finished',
    children: '1,204 rows added and 18 updated. Nothing was skipped.',
  },
};

/**
 * `role="status"` too. Warning is the tone for something the user should deal
 * with soon; it is not an error, so it does not cut a screen reader off.
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Card expires next month',
    children: 'Update it before 31 October to avoid an interrupted subscription.',
  },
};

/** `role="danger"` is not a thing; danger maps to `role="alert"`, which interrupts. */
export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Payment failed',
    children: 'We could not charge the card ending 4242. Update it to avoid losing access.',
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Draft saved',
    children: 'Your changes are stored locally until you publish.',
    onDismiss: () => {},
  },
};

/** Title on its own, for the times the headline is the whole message. */
export const TitleOnly: Story = {
  args: { title: 'Two members are still awaiting an invite.', children: undefined },
};

/** Long body copy has to wrap under the title, not under the icon. */
export const LongBody: Story = {
  args: {
    variant: 'danger',
    title: 'Import stopped after 812 rows',
    children:
      'Row 813 has a date in an unrecognised format, and every row after it was skipped. Fix the file and re-run the import; already imported rows are not duplicated.',
    onDismiss: () => {},
  },
};

/** All four tones together, for eyeballing the set as a whole. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-3)', maxWidth: 520 }}>
      <Alert variant="info" title="Scheduled maintenance">
        Exports are paused on Sunday from 02:00 to 04:00 UTC.
      </Alert>
      <Alert variant="success" title="Import finished">
        1,204 rows added and 18 updated.
      </Alert>
      <Alert variant="warning" title="Card expires next month">
        Update it before 31 October to avoid an interrupted subscription.
      </Alert>
      <Alert variant="danger" title="Payment failed" onDismiss={() => {}}>
        We could not charge the card ending 4242.
      </Alert>
    </div>
  ),
};

