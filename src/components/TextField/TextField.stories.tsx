import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'We only use this to send receipts.' },
};

export const Required: Story = {
  args: { required: true, description: 'Blur the empty field to see the error message.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'christine@example.com' },
};
