import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from '../Checkbox';

const meta = {
  title: 'Components/Forms/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Notify me about',
    orientation: 'vertical',
    children: (
      <>
        <Checkbox name="mentions" label="Mentions" />
        <Checkbox name="replies" label="Replies" />
        <Checkbox name="releases" label="Releases" />
      </>
    ),
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'You can change this at any time in settings.' },
};

export const DefaultSelection: Story = { args: { defaultValue: ['mentions', 'releases'] } };

export const Horizontal: Story = { args: { orientation: 'horizontal' } };

/** Item descriptions make a long list of options scannable. */
export const WithItemDescriptions: Story = {
  args: {
    label: 'Data to export',
    children: (
      <>
        <Checkbox name="profile" label="Profile" description="Name, avatar and bio." />
        <Checkbox name="posts" label="Posts" description="Everything you have published." />
        <Checkbox name="logs" label="Activity log" description="Sign-ins for the last 90 days." />
      </>
    ),
  },
};

/** Disabling the group disables every checkbox inside it. */
export const Disabled: Story = { args: { disabled: true, defaultValue: ['replies'] } };
