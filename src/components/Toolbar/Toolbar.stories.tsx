import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar } from './Toolbar';
import { Menu } from '../Menu';

const meta = {
  title: 'Components/Navigation/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

function BoldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4.5 2.5h4a2.5 2.5 0 0 1 0 5h-4z" />
      <path d="M4.5 7.5h4.75a2.75 2.75 0 0 1 0 5.5H4.5z" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9.5 2.5h4M2.5 13.5h4M9 2.5 7 13.5" />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 2.5v5a4 4 0 0 0 8 0v-5M3.5 13.5h9" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg {...iconProps}>
      <path d="m4 6.5 4 4 4-4" />
    </svg>
  );
}

export const Default: Story = {
  render: (args) => (
    <Toolbar.Root {...args} aria-label="Text formatting">
      <Toolbar.Button aria-label="Bold">
        <BoldIcon />
      </Toolbar.Button>
      <Toolbar.Button aria-label="Italic">
        <ItalicIcon />
      </Toolbar.Button>
      <Toolbar.Button aria-label="Underline">
        <UnderlineIcon />
      </Toolbar.Button>
    </Toolbar.Root>
  ),
};

/** Groups plus separators keep a long toolbar readable. */
export const Grouped: Story = {
  render: (args) => (
    <Toolbar.Root {...args} aria-label="Editor">
      <Toolbar.Group aria-label="Formatting">
        <Toolbar.Button aria-label="Bold">
          <BoldIcon />
        </Toolbar.Button>
        <Toolbar.Button aria-label="Italic">
          <ItalicIcon />
        </Toolbar.Button>
        <Toolbar.Button aria-label="Underline">
          <UnderlineIcon />
        </Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group aria-label="Insert">
        <Toolbar.Button>Link</Toolbar.Button>
        <Toolbar.Button>Image</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Link href="#help">Formatting help</Toolbar.Link>
    </Toolbar.Root>
  ),
};

/** An input joins the same roving tab stop as the buttons around it. */
export const WithInput: Story = {
  render: (args) => (
    <Toolbar.Root {...args} aria-label="Search and filter">
      <Toolbar.Input placeholder="Search issues" aria-label="Search issues" />
      <Toolbar.Separator />
      <Toolbar.Button>Filter</Toolbar.Button>
      <Toolbar.Button>Sort</Toolbar.Button>
    </Toolbar.Root>
  ),
};

/** A toolbar button can render a `Menu` trigger, keeping one tab stop for the strip. */
export const WithMenu: Story = {
  render: (args) => (
    <Toolbar.Root {...args} aria-label="Document">
      <Toolbar.Button aria-label="Bold">
        <BoldIcon />
      </Toolbar.Button>
      <Toolbar.Separator />
      <Menu.Root>
        <Toolbar.Button render={<Menu.Trigger />}>
          Paragraph
          <ChevronDownIcon />
        </Toolbar.Button>
        <Menu.Content>
          <Menu.Item>Heading 1</Menu.Item>
          <Menu.Item>Heading 2</Menu.Item>
          <Menu.Item>Body</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Quote</Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </Toolbar.Root>
  ),
};

/** A vertical toolbar for a side rail. The separator turns horizontal to match. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Toolbar.Root {...args} aria-label="Tools">
      <Toolbar.Button aria-label="Bold">
        <BoldIcon />
      </Toolbar.Button>
      <Toolbar.Button aria-label="Italic">
        <ItalicIcon />
      </Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button aria-label="Underline">
        <UnderlineIcon />
      </Toolbar.Button>
    </Toolbar.Root>
  ),
};

/**
 * Disabled toolbar items stay focusable by default, so a keyboard user can
 * still reach them and hear why they are unavailable.
 */
export const DisabledItems: Story = {
  render: (args) => (
    <Toolbar.Root {...args} aria-label="Text formatting">
      <Toolbar.Button aria-label="Bold">
        <BoldIcon />
      </Toolbar.Button>
      <Toolbar.Button aria-label="Italic" disabled>
        <ItalicIcon />
      </Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Input placeholder="Search" aria-label="Search" disabled />
    </Toolbar.Root>
  ),
};

/** The whole strip can be switched off while its target is unavailable. */
export const WholeToolbarDisabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Toolbar.Root {...args} aria-label="Text formatting">
      <Toolbar.Button aria-label="Bold">
        <BoldIcon />
      </Toolbar.Button>
      <Toolbar.Button aria-label="Italic">
        <ItalicIcon />
      </Toolbar.Button>
      <Toolbar.Button aria-label="Underline">
        <UnderlineIcon />
      </Toolbar.Button>
    </Toolbar.Root>
  ),
};
