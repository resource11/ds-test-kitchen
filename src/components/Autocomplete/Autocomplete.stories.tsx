import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from './Autocomplete';

const languages = [
  'C',
  'C++',
  'C#',
  'Elixir',
  'Go',
  'Haskell',
  'Java',
  'JavaScript',
  'Kotlin',
  'OCaml',
  'PHP',
  'Python',
  'Ruby',
  'Rust',
  'Scala',
  'Swift',
  'TypeScript',
  'Zig',
];

const meta = {
  title: 'Components/Forms/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Language',
    name: 'language',
    placeholder: 'Start typing',
    items: languages,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Autocomplete.Field {...args}>
      {(item: string) => (
        <Autocomplete.Item key={item} value={item}>
          {item}
        </Autocomplete.Item>
      )}
    </Autocomplete.Field>
  ),
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'Suggestions are hints. Any text you type is kept as the value.',
  },
};

/** `mode="both"` completes the highlighted suggestion inline as you type. */
export const InlineCompletion: Story = {
  args: { mode: 'both', autoHighlight: true, defaultValue: 'Ty' },
};

export const AlwaysHighlightFirst: Story = {
  args: { autoHighlight: 'always' },
};

export const NoSuggestions: Story = {
  args: {
    defaultValue: 'COBOL',
    defaultOpen: true,
    empty: 'No language matches that name.',
  },
};

export const Required: Story = {
  args: { required: true, description: 'Submitting empty surfaces the field error.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Rust' },
};

/** Adding the chevron button turns it into a browsable list. */
export const WithTriggerButton: Story = {
  args: { controlProps: { showTrigger: true } },
};
