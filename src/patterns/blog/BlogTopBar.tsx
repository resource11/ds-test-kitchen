import { Button } from '../../components/Button';
import { NavigationMenu } from '../../components/NavigationMenu';
import styles from '../Patterns.module.css';
import { goTo, storyHref, storyIds } from './prototypeNav';

/** The top bar both blog prototypes share, built on the `AppShell` classes. */
export function BlogTopBar() {
  return (
    <header className={styles.topBar}>
      <span className={styles.wordmark}>The Journal</span>

      <span className={styles.topBarSpacer} />

      <div className={styles.topBarActions}>
        {/* GAP: flat top-level links. Every other NavigationMenu in the repo
            opens a panel; its Link is styled for that panel. */}
        <NavigationMenu.Root aria-label="Main">
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href={storyHref(storyIds.index)} onClick={goTo(storyIds.index)}>
                Articles
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* The Subscribe prototype was removed (2026-09-23); the button stays as designed. */}
        <Button>Subscribe</Button>
      </div>
    </header>
  );
}
