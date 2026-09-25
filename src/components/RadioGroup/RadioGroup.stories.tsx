import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

const meta = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Deployment target',
    name: 'target',
    defaultValue: 'staging',
    orientation: 'vertical',
    children: (
      <>
        <RadioGroupItem value="preview" label="Preview" />
        <RadioGroupItem value="staging" label="Staging" />
        <RadioGroupItem value="production" label="Production" />
      </>
    ),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Where the next build is published.' },
};

export const Horizontal: Story = { args: { orientation: 'horizontal' } };

/** Per-option descriptions turn the group into a decision list. */
export const WithItemDescriptions: Story = {
  args: {
    label: 'Plan',
    defaultValue: 'team',
    children: (
      <>
        <RadioGroupItem value="solo" label="Solo" description="One editor, unlimited drafts." />
        <RadioGroupItem value="team" label="Team" description="Up to ten editors and review." />
        <RadioGroupItem
          value="enterprise"
          label="Enterprise"
          description="SSO, audit log and a support contract."
        />
      </>
    ),
  },
};

/** One option unavailable while the rest stay usable. */
export const ItemDisabled: Story = {
  args: {
    children: (
      <>
        <RadioGroupItem value="preview" label="Preview" />
        <RadioGroupItem value="staging" label="Staging" />
        <RadioGroupItem value="production" label="Production" disabled />
      </>
    ),
  },
};

export const Disabled: Story = { args: { disabled: true } };

export const ReadOnly: Story = { args: { readOnly: true } };
