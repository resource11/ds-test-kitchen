import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Button } from '../Button';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Publish this release?', description: 'Everyone on the team will be notified.' },
  render: (args) => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Publish</Button>} />
      <Dialog.Content {...args}>
        <Dialog.Actions>
          <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
          <Dialog.Close render={<Button>Publish</Button>} />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const Destructive: Story = {
  args: { title: 'Delete project?', description: 'This cannot be undone.' },
  render: (args) => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="danger">Delete project</Button>} />
      <Dialog.Content {...args}>
        <Dialog.Actions>
          <Dialog.Close render={<Button variant="secondary">Keep it</Button>} />
          <Dialog.Close render={<Button variant="danger">Delete</Button>} />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Root>
  ),
};
