import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type {
  TabsRootProps as BaseTabsRootProps,
  TabsListProps as BaseTabsListProps,
  TabsTabProps as BaseTabsTabProps,
  TabsIndicatorProps as BaseTabsIndicatorProps,
  TabsPanelProps as BaseTabsPanelProps,
} from '@base-ui/react/tabs';
import styles from './Tabs.module.css';

/**
 * A set of tab buttons and the panels they reveal. Roving focus, arrow-key
 * navigation and the `tab`/`tabpanel` ARIA wiring all come from Base UI.
 *
 * Usage:
 *   <Tabs.Root defaultValue="overview">
 *     <Tabs.List>
 *       <Tabs.Tab value="overview">Overview</Tabs.Tab>
 *       <Tabs.Indicator />
 *     </Tabs.List>
 *     <Tabs.Panel value="overview">...</Tabs.Panel>
 *   </Tabs.Root>
 */

export type TabsRootProps = BaseTabsRootProps;
export type TabsListProps = BaseTabsListProps;
export type TabsTabProps = BaseTabsTabProps;
export type TabsIndicatorProps = BaseTabsIndicatorProps;
export type TabsPanelProps = BaseTabsPanelProps;

function Root({ className, ...props }: TabsRootProps) {
  return (
    <BaseTabs.Root
      className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function List({ className, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      className={[styles.list, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Tab({ className, ...props }: TabsTabProps) {
  return (
    <BaseTabs.Tab
      className={[styles.tab, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

/** Slides between tabs using the position CSS variables Base UI writes on it. */
function Indicator({ className, ...props }: TabsIndicatorProps) {
  return (
    <BaseTabs.Indicator
      className={[styles.indicator, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

function Panel({ className, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      className={[styles.panel, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export const Tabs = Object.assign(Root, {
  Root,
  List,
  Tab,
  Indicator,
  Panel,
});
