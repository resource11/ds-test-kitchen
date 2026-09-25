import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: { type: 'number', min: 2, max: 20 } },
    resize: { control: 'inline-radio', options: ['none', 'vertical'] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Release notes', placeholder: 'What changed in this version?', rows: 4 },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Markdown is supported. Keep it under 500 characters.' },
};

export const WithValue: Story = {
  args: {
    defaultValue:
      'Fixed a crash when opening a project with no members.\nSpeeded up the first paint by roughly 200ms.',
  },
};

/** A taller control for long-form input. */
export const Tall: Story = { args: { rows: 10, label: 'Incident write-up' } };

/** Fixed height, for layouts that must not shift. */
export const NotResizable: Story = { args: { resize: 'none' } };

/** `required` plus `Form`-driven validation surfaces the field error. */
export const Required: Story = {
  args: { required: true, description: 'This field cannot be left empty.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Locked while the release is publishing.' },
};
