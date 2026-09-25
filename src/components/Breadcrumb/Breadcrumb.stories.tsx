import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: { 'aria-label': 'Breadcrumb' },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb.Root {...args}>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Projects</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Current>Northwind rebrand</Breadcrumb.Current>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};

/** Two levels: the shortest trail worth rendering. */
export const TwoLevels: Story = {
  render: (args) => (
    <Breadcrumb.Root {...args}>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Settings</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Current>Billing</Breadcrumb.Current>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};

/** Deep trails wrap onto a second line rather than overflowing. */
export const Deep: Story = {
  render: (args) => (
    <div style={{ maxWidth: 380 }}>
      <Breadcrumb.Root {...args}>
        {['Home', 'Workspace', 'Projects', 'Northwind rebrand', 'Assets'].map((label) => (
          <Fragment key={label}>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">{label}</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
          </Fragment>
        ))}
        <Breadcrumb.Item>
          <Breadcrumb.Current>Logo lockups v4</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    </div>
  ),
};

/** A very long label truncates instead of pushing the trail out of the layout. */
export const LongLabel: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Breadcrumb.Root {...args}>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Current>
            Quarterly brand audit and competitive positioning review
          </Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    </div>
  ),
};

/** A custom separator replaces the chevron, still hidden from screen readers. */
export const CustomSeparator: Story = {
  render: (args) => (
    <Breadcrumb.Root {...args}>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator>/</Breadcrumb.Separator>
      <Breadcrumb.Item>
        <Breadcrumb.Current>Reports</Breadcrumb.Current>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};
