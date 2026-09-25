import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const items = [
  {
    value: 'billing',
    question: 'How does billing work?',
    answer:
      'Plans are billed monthly on the day you subscribed. Changing plan mid-cycle prorates the difference on your next invoice.',
  },
  {
    value: 'seats',
    question: 'Can I add teammates later?',
    answer:
      'Yes. Seats can be added or removed at any time from the workspace settings, and the change takes effect immediately.',
  },
  {
    value: 'export',
    question: 'What happens to my data if I cancel?',
    answer:
      'Your workspace stays readable for 30 days after cancellation so you can export everything, then it is permanently deleted.',
  },
];

const meta = {
  title: 'Components/Content/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ width: 480, maxWidth: '100%' }}>
      <Accordion.Root {...args}>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Header>
              <Accordion.Trigger>{item.question}</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `multiple={false}` closes the open item when another one is opened. */
export const SingleOpen: Story = {
  args: { multiple: false, defaultValue: ['billing'] },
};

/** The Base UI default: any number of panels can be open at once. */
export const MultipleOpen: Story = {
  args: { multiple: true, defaultValue: ['billing', 'seats'] },
};

/** The whole accordion is inert, including keyboard navigation. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: ['billing'] },
};

/** A single item can opt out while the rest stay interactive. */
export const ItemDisabled: Story = {
  render: (args) => (
    <div style={{ width: 480, maxWidth: '100%' }}>
      <Accordion.Root {...args}>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value} disabled={item.value === 'export'}>
            <Accordion.Header>
              <Accordion.Trigger>{item.question}</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
};
