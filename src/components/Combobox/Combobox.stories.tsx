import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './Combobox';

const countries = [
  'Argentina',
  'Australia',
  'Belgium',
  'Brazil',
  'Canada',
  'Denmark',
  'Finland',
  'France',
  'Germany',
  'Ireland',
  'Japan',
  'Mexico',
  'Netherlands',
  'Norway',
  'Portugal',
  'Spain',
  'Sweden',
  'United Kingdom',
];

const meta = {
  title: 'Components/Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Country',
    name: 'country',
    placeholder: 'Search countries',
    items: countries,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Combobox.Field {...args}>
      {(item: string) => (
        <Combobox.Item key={item} value={item}>
          {item}
        </Combobox.Item>
      )}
    </Combobox.Field>
  ),
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Type to filter the list, then pick a match.' },
};

export const WithSelectedValue: Story = {
  args: { defaultValue: 'Portugal' },
};

export const Required: Story = {
  args: {
    required: true,
    description: 'Submitting without a value surfaces the field error.',
  },
};

export const NoMatches: Story = {
  args: {
    defaultInputValue: 'Atlantis',
    defaultOpen: true,
    empty: 'No country matches that name.',
    description: 'The empty state needs the `items` prop on the root.',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Canada' },
};

/** Without the clear and open buttons the control is a plain filtering input. */
export const InputOnly: Story = {
  args: {
    controlProps: { clearable: false, showTrigger: false },
    description: 'Opens as soon as you focus the input.',
  },
};
