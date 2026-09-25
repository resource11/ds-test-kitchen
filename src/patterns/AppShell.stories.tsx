import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { IconButton } from '../components/IconButton';
import { Menu } from '../components/Menu';
import { Meter } from '../components/Meter';
import { NavigationMenu } from '../components/NavigationMenu';
import { Progress } from '../components/Progress';
import { Separator } from '../components/Separator';
import { Tooltip } from '../components/Tooltip';
import styles from './Patterns.module.css';

/* -------------------------------------------------------------------- icons */

function BoltIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8.9 1.5 3.6 8.6a.5.5 0 0 0 .4.8h2.7l-.9 5.1 5.4-7.1a.5.5 0 0 0-.4-.8H8.1z" />
    </svg>
  );
}

function BellIcon() {
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
      <path d="M4 6.5a4 4 0 0 1 8 0c0 3 1 4 1 4H3s1-1 1-4Z" />
      <path d="M6.5 13a1.75 1.75 0 0 0 3 0" />
    </svg>
  );
}

/* ------------------------------------------------------------------ content */

const activity = [
  { id: 'a1', initials: 'PR', text: 'Priya published Badge v2.1', time: '12m' },
  { id: 'a2', initials: 'TL', text: 'Tomas opened a token proposal: surface-sunken', time: '1h' },
  { id: 'a3', initials: 'HI', text: 'Hana deprecated Toggle in favour of Switch', time: '3h' },
  { id: 'a4', initials: 'MB', text: 'Marcus accepted the invite to Northwind', time: 'Yesterday' },
];

/* --------------------------------------------------------------- the screen */

function AppShell() {
  return (
    <Tooltip.Provider delay={300}>
      <div className={styles.shell}>
        <header className={styles.topBar}>
          <span className={styles.wordmark}>
            <span className={styles.wordmarkGlyph} aria-hidden="true">
              <BoltIcon />
            </span>
            Northwind
          </span>

          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Library</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <ul className={styles.navPanelList}>
                    <li>
                      <NavigationMenu.Link href="#components">
                        Components
                        <span className={styles.navLinkDescription}>
                          42 published, 3 in review.
                        </span>
                      </NavigationMenu.Link>
                    </li>
                    <li>
                      <NavigationMenu.Link href="#tokens">
                        Tokens
                        <span className={styles.navLinkDescription}>
                          Colour, spacing, type and motion.
                        </span>
                      </NavigationMenu.Link>
                    </li>
                    <li>
                      <NavigationMenu.Link href="#patterns">
                        Patterns
                        <span className={styles.navLinkDescription}>
                          Whole screens, assembled from parts.
                        </span>
                      </NavigationMenu.Link>
                    </li>
                    <li>
                      <NavigationMenu.Link href="#changelog">
                        Changelog
                        <span className={styles.navLinkDescription}>What shipped, and when.</span>
                      </NavigationMenu.Link>
                    </li>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Adoption</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <ul
                    className={styles.navPanelList}
                    style={{ gridTemplateColumns: 'minmax(0, 16rem)' }}
                  >
                    <li>
                      <NavigationMenu.Link href="#coverage">
                        Coverage by product
                        <span className={styles.navLinkDescription}>
                          Which surfaces are on the current version.
                        </span>
                      </NavigationMenu.Link>
                    </li>
                    <li>
                      <NavigationMenu.Link href="#drift">
                        Token drift
                        <span className={styles.navLinkDescription}>
                          Hard-coded values found in the last scan.
                        </span>
                      </NavigationMenu.Link>
                    </li>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>

            <NavigationMenu.Panel />
          </NavigationMenu.Root>

          <span className={styles.topBarSpacer} />

          <div className={styles.topBarActions}>
            <Tooltip.Root>
              <Tooltip.Trigger
                render={
                  <IconButton label="Notifications">
                    <BellIcon />
                  </IconButton>
                }
              />
              <Tooltip.Content>3 unread notifications</Tooltip.Content>
            </Tooltip.Root>

            <Menu.Root>
              <Menu.Trigger className={styles.avatarTrigger} aria-label="Account menu">
                <Avatar size="sm" fallback="NO" />
              </Menu.Trigger>
              <Menu.Content align="end" sideOffset={8}>
                <div className={styles.menuAccount}>
                  <span className={styles.menuAccountName}>Nadia Okonkwo</span>
                  <span className={styles.menuAccountEmail}>nadia.okonkwo@northwind.co</span>
                </div>
                <Menu.Separator />
                <Menu.Item>Account settings</Menu.Item>
                <Menu.Item>Keyboard shortcuts</Menu.Item>
                <Menu.Item>Switch workspace</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Sign out</Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.mainInner}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Overview</h1>
              <p className={styles.pageLead}>
                Northwind design system, week 37. Two releases went out and the v2 migration
                passed the two thirds mark.
              </p>
            </div>

            <section>
              <h2 className={styles.sectionTitle}>This week</h2>
              <div className={styles.cardGrid}>
                <Card.Root>
                  <Card.Header>
                    <Card.Title>v2 migration</Card.Title>
                    <Card.Description>
                      Surfaces moved off the v1 package. Two teams remain.
                    </Card.Description>
                  </Card.Header>
                  <Card.Body>
                    <Progress label="Surfaces migrated" value={68} showValue />
                    <p className={styles.metricCaption}>
                      17 of 25 surfaces. Checkout and Billing are scheduled for week 39.
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="secondary" size="sm">
                      View plan
                    </Button>
                  </Card.Footer>
                </Card.Root>

                <Card.Root>
                  <Card.Header>
                    <Card.Title>Seats</Card.Title>
                    <Card.Description>
                      A reading rather than a task, so a high value here is bad news.
                    </Card.Description>
                  </Card.Header>
                  <Card.Body>
                    <Meter label="Seats used" value={27} max={30} showValue variant="danger" />
                    <p className={styles.metricCaption}>
                      27 of 30 on the Team plan. Three invites are still pending.
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="secondary" size="sm">
                      Manage seats
                    </Button>
                  </Card.Footer>
                </Card.Root>

                <Card.Root>
                  <Card.Header>
                    <Card.Title>Library health</Card.Title>
                    <Card.Description>Status of the published components.</Card.Description>
                  </Card.Header>
                  <Card.Body>
                    <span className={styles.metricValue}>42</span>
                    <p className={styles.metricCaption}>components published</p>
                    <Separator style={{ marginBlock: 'var(--sds-space-4)' }} />
                    <div className={styles.stackTight}>
                      <span>
                        <Badge variant="success" size="sm">
                          Stable
                        </Badge>{' '}
                        36 components
                      </span>
                      <span>
                        <Badge variant="warning" size="sm">
                          In review
                        </Badge>{' '}
                        3 components
                      </span>
                      <span>
                        <Badge variant="danger" size="sm">
                          Deprecated
                        </Badge>{' '}
                        3 components
                      </span>
                    </div>
                  </Card.Body>
                </Card.Root>
              </div>
            </section>

            <section>
              <h2 className={styles.sectionTitle}>Recent activity</h2>
              <Card.Root>
                <Card.Body>
                  {activity.map((entry, index) => (
                    <Fragment key={entry.id}>
                      {index > 0 ? <Separator /> : null}
                      <div className={styles.activityRow}>
                        <Avatar size="sm" fallback={entry.initials} />
                        <span className={styles.activityText}>{entry.text}</span>
                        <span className={styles.activityTime}>{entry.time}</span>
                      </div>
                    </Fragment>
                  ))}
                </Card.Body>
              </Card.Root>
            </section>
          </div>
        </main>
      </div>
    </Tooltip.Provider>
  );
}

/**
 * The frame everything else sits inside: brand, navigation, account, and a
 * content area. This is the story that shows whether the system's pieces agree
 * with each other when they are all on screen at once.
 *
 * What it is showing off:
 *
 * - **A top bar made of four unrelated components that still line up.**
 *   Wordmark, `NavigationMenu`, a `Tooltip`-wrapped `IconButton` and an
 *   `Avatar` menu share one baseline because they all size from the same space
 *   and type scale.
 * - **`Tooltip.Provider` around the bar.** One shared delay, so once a tooltip
 *   has opened its neighbours open instantly instead of each waiting again.
 * - **Two triggers, two techniques.** The notification button uses
 *   `Tooltip.Trigger render={<IconButton/>}` to reuse a styled component; the
 *   avatar uses `Menu.Trigger` with a class, because the trigger is a bare
 *   button and the shell supplies the hit area and focus ring itself.
 * - **`Progress` and `Meter` side by side, doing different jobs.** The
 *   migration is a task that will finish; the seat count is a reading that can
 *   go up or down, so it uses `Meter` with `variant="danger"` as it nears the cap.
 * - **Surface layering from tokens alone.** The page is `--sds-color-background-default`, the
 *   bar and cards are `--sds-color-background-surface`, and the separation is a border
 *   token rather than a shadow — which is what keeps the dark theme legible.
 *
 * Switch the toolbar theme to dark: every surface, border and tone swaps
 * because nothing on this screen names a colour of its own.
 */
const meta = {
  title: 'Patterns/App shell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The whole frame, with the content area populated. */
export const Default: Story = {};
