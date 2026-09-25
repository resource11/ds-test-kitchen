import type { MouseEvent } from 'react';

import { Avatar } from '../../components/Avatar';
import { NavigationMenu } from '../../components/NavigationMenu';
import styles from '../Patterns.module.css';
import booking from './Booking.module.css';

/**
 * The booking prototype's top bar, on the `AppShell` classes: brand on the
 * left, actions on the right, pushed apart by `justify-content: space-between`
 * instead of the empty `topBarSpacer` the other patterns use.
 *
 * GAP: this is the fourth copy of a top bar in the repo. It should become a
 * component (code first, then the Figma library) — see the table in the docs.
 */
export function BookingTopBar({ onHome }: { onHome?: () => void }) {
  const home = (event: MouseEvent) => {
    event.preventDefault();
    onHome?.();
  };

  return (
    <header className={`${styles.topBar} ${booking.topBar}`}>
      <span className={booking.wordmark}>Wayline</span>

      <div className={styles.topBarActions}>
        {/* GAP: flat top-level links. Code supports them; Figma's NavigationMenu
            only has panel triggers, so the Figma bar holds bare links. */}
        <NavigationMenu.Root aria-label="Main">
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#tours" active onClick={home}>
                Tours
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#gift-cards">Gift cards</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#help">Help</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <Avatar fallback="AM" size="sm" alt="Alex Morgan" />
      </div>
    </header>
  );
}
