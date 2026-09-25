import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup } from './ToggleGroup';
import { Toggle } from '../Toggle';

/** Decorative only: the toggle that wraps it carries the accessible name. */
function Icon({ d }: { d: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

const ALIGN_LEFT = 'M2.5 3.5h11M2.5 6.75h7M2.5 10h11M2.5 13.25h7';
const ALIGN_CENTER = 'M2.5 3.5h11M4.5 6.75h7M2.5 10h11M4.5 13.25h7';
const ALIGN_RIGHT = 'M2.5 3.5h11M6.5 6.75h7M2.5 10h11M6.5 13.25h7';
const BOLD = 'M4.5 2.5h4a2.75 2.75 0 0 1 0 5.5h-4zM4.5 8h4.75a2.75 2.75 0 0 1 0 5.5H4.5z';
const ITALIC = 'M10.5 2.75h-3M8.5 13.25h-3M9.75 2.75 6.25 13.25';
const UNDERLINE = 'M4.5 2.5v5a3.5 3.5 0 0 0 7 0v-5M3.75 13.5h8.5';

const meta = {
  title: 'Components/Display/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    segmented: { control: 'boolean' },
    disabled: { control: 'boolean' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: {
    multiple: false,
    segmented: false,
    defaultValue: ['list'],
    children: (
      <>
        <Toggle value="list">List</Toggle>
        <Toggle value="board">Board</Toggle>
        <Toggle value="calendar">Calendar</Toggle>
      </>
    ),
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single-select. Pressing one option releases the others, like a radio group. */
export const Default: Story = {};

/**
 * Single-select spelled out: `multiple` is false, so `value` never holds more
 * than one entry and there is always exactly one view chosen.
 */
export const SingleSelect: Story = {
  args: { multiple: false, defaultValue: ['board'] },
};

/**
 * Multi-select. With `multiple`, any number of options can be pressed and the
 * group value is the full array of pressed values.
 */
export const MultiSelect: Story = {
  args: {
    multiple: true,
    defaultValue: ['bold', 'underline'],
    children: (
      <>
        <Toggle value="bold" variant="ghost" iconOnly aria-label="Bold">
          <Icon d={BOLD} />
        </Toggle>
        <Toggle value="italic" variant="ghost" iconOnly aria-label="Italic">
          <Icon d={ITALIC} />
        </Toggle>
        <Toggle value="underline" variant="ghost" iconOnly aria-label="Underline">
          <Icon d={UNDERLINE} />
        </Toggle>
      </>
    ),
  },
};

/**
 * The segmented-control look: one joined track, the pressed segment lifted
 * onto the surface. Best for switching between views of the same content.
 */
export const Segmented: Story = {
  args: {
    segmented: true,
    defaultValue: ['month'],
    children: (
      <>
        <Toggle value="day">Day</Toggle>
        <Toggle value="week">Week</Toggle>
        <Toggle value="month">Month</Toggle>
      </>
    ),
  },
};

/** Segmented and icon-only, for an alignment control in a toolbar. */
export const SegmentedIcons: Story = {
  args: {
    segmented: true,
    defaultValue: ['left'],
    children: (
      <>
        <Toggle value="left" iconOnly aria-label="Align left">
          <Icon d={ALIGN_LEFT} />
        </Toggle>
        <Toggle value="center" iconOnly aria-label="Align centre">
          <Icon d={ALIGN_CENTER} />
        </Toggle>
        <Toggle value="right" iconOnly aria-label="Align right">
          <Icon d={ALIGN_RIGHT} />
        </Toggle>
      </>
    ),
  },
};

const CALENDAR_VIEWS = (
  <>
    <Toggle value="day">Day</Toggle>
    <Toggle value="week">Week</Toggle>
    <Toggle value="month">Month</Toggle>
  </>
);

/** Stacked vertically, e.g. down the side of a canvas. */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    segmented: true,
    defaultValue: ['week'],
    children: CALENDAR_VIEWS,
  },
};

/** The whole group disabled: no item can be pressed or released. */
export const Disabled: Story = {
  args: {
    disabled: true,
    segmented: true,
    defaultValue: ['week'],
    children: CALENDAR_VIEWS,
  },
};
