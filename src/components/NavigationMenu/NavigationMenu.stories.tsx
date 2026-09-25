import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavigationMenu } from './NavigationMenu';

const meta = {
  title: 'Components/Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 14rem))',
  gap: 'var(--sds-space-1)',
  margin: 0,
  padding: 0,
  listStyle: 'none',
} as const;

const descriptionStyle = {
  color: 'var(--sds-color-content-muted)',
  fontSize: 'var(--sds-font-size-xs)',
  fontWeight: 'var(--sds-font-weight-regular)',
  lineHeight: 'var(--sds-line-height-normal)',
} as const;

/** A two-item nav. Both triggers share one panel, which resizes as you move between them. */
export const Default: Story = {
  render: (args) => (
    <NavigationMenu.Root {...args}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={gridStyle}>
              <li>
                <NavigationMenu.Link href="#components">
                  Components
                  <span style={descriptionStyle}>Buttons, inputs and overlays.</span>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#tokens">
                  Tokens
                  <span style={descriptionStyle}>Colour, spacing and motion.</span>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#patterns">
                  Patterns
                  <span style={descriptionStyle}>Composed flows and layouts.</span>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#changelog">
                  Changelog
                  <span style={descriptionStyle}>What shipped, and when.</span>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ ...gridStyle, gridTemplateColumns: 'minmax(0, 16rem)' }}>
              <li>
                <NavigationMenu.Link href="#docs">
                  Documentation
                  <span style={descriptionStyle}>Guides and API reference.</span>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#support">
                  Support
                  <span style={descriptionStyle}>Ask the design systems team.</span>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Panel />
    </NavigationMenu.Root>
  ),
};

/** A link can mark the current page, which picks up the accent treatment. */
export const WithActiveLink: Story = {
  render: (args) => (
    <NavigationMenu.Root {...args}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ ...gridStyle, gridTemplateColumns: 'minmax(0, 16rem)' }}>
              <li>
                <NavigationMenu.Link href="#components" active>
                  Components
                  <span style={descriptionStyle}>You are here.</span>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#tokens">
                  Tokens
                  <span style={descriptionStyle}>Colour, spacing and motion.</span>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ ...gridStyle, gridTemplateColumns: 'minmax(0, 16rem)' }}>
              <li>
                <NavigationMenu.Link href="#about">
                  About
                  <span style={descriptionStyle}>Who maintains the system.</span>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#careers">
                  Careers
                  <span style={descriptionStyle}>Open roles on the team.</span>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Panel />
    </NavigationMenu.Root>
  ),
};

/** A vertical nav for a sidebar: the panel opens to the side of the list. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <NavigationMenu.Root {...args}>
      <NavigationMenu.List style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Workspace</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ ...gridStyle, gridTemplateColumns: 'minmax(0, 14rem)' }}>
              <li>
                <NavigationMenu.Link href="#projects">Projects</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#members">Members</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Account</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ ...gridStyle, gridTemplateColumns: 'minmax(0, 14rem)' }}>
              <li>
                <NavigationMenu.Link href="#profile">Profile</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#billing">Billing</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Panel side="inline-end" align="start" sideOffset={8} />
    </NavigationMenu.Root>
  ),
};

/** A trigger can be switched off while its section is unavailable. */
export const DisabledTrigger: Story = {
  render: (args) => (
    <NavigationMenu.Root {...args}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ ...gridStyle, gridTemplateColumns: 'minmax(0, 16rem)' }}>
              <li>
                <NavigationMenu.Link href="#components">Components</NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link href="#tokens">Tokens</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger disabled>Labs</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul style={{ ...gridStyle, gridTemplateColumns: 'minmax(0, 16rem)' }}>
              <li>
                <NavigationMenu.Link href="#labs">Never reachable</NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Panel />
    </NavigationMenu.Root>
  ),
};
