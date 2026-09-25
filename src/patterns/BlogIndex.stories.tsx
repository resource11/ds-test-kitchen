import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { articles, featured, topics } from './blog/articles';
import { BlogTopBar } from './blog/BlogTopBar';
import { goTo, storyIds } from './blog/prototypeNav';
import topBarSource from './blog/BlogTopBar.tsx?raw';
import source from './BlogIndex.stories.tsx?raw';
import blog from './blog/Blog.module.css';
import styles from './Patterns.module.css';
import { prototypeDocs } from './prototypeDocs';

/* --------------------------------------------------------------- the screen */

function BlogIndex() {
  return (
    <div className={styles.shell}>
      <BlogTopBar />

      <main className={styles.main}>
        <div className={styles.mainInner}>
          <div className={blog.blogHeader}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Latest articles</h1>
              <p className={styles.pageLead}>
                Short essays on tokens, components, and working with AI without drift.
              </p>
            </div>

            <div className={blog.topicList}>
              <span className={blog.topicLabel}>Topics</span>
              {topics.map((topic) => (
                <Badge key={topic.label} variant={topic.variant} size="sm">
                  {topic.label}
                </Badge>
              ))}
            </div>
          </div>

          <section aria-label="Featured article" className={blog.article}>
            <div className={blog.topicList}>
              <Badge variant="accent" size="sm">
                Featured
              </Badge>
              <Badge variant={featured.variant} size="sm">
                {featured.topic}
              </Badge>
            </div>

            <Card.Root variant="elevated" className={blog.articleCard}>
              <Card.Header>
                <Card.Title render={<h2 />}>{featured.title}</Card.Title>
                <Card.Description>{featured.meta}</Card.Description>
              </Card.Header>
              <Card.Body>{featured.excerpt}</Card.Body>
              <Card.Footer>
                {/* GAP: opening an article is navigation and should be a link.
                    Button cannot render one cleanly yet — see the table below. */}
                <Button onClick={goTo(storyIds.article)}>Read the story</Button>
                <Button variant="ghost">Save for later</Button>
              </Card.Footer>
            </Card.Root>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>More articles</h2>
            <div className={blog.articleGrid}>
              {articles.map((article) => (
                <article key={article.id} className={blog.article}>
                  <Badge variant={article.variant} size="sm">
                    {article.topic}
                  </Badge>
                  <Card.Root className={blog.articleCard}>
                    <Card.Header>
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Description>{article.meta}</Card.Description>
                    </Card.Header>
                    <Card.Body>{article.excerpt}</Card.Body>
                    <Card.Footer>
                      <Button onClick={goTo(storyIds.article)}>Read article</Button>
                    </Card.Footer>
                  </Card.Root>
                </article>
              ))}
            </div>
          </section>

          <div className={blog.loadMore}>
            <Button variant="secondary">Load more articles</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * **Prototype, not a pattern.** Rebuilt from Figma *Version B — Featured + grid*
 * (Playground file) using only components that exist in code. Figma supplied
 * the layout and the copy; the manifest supplied the parts.
 *
 * | In Figma | In code | Status |
 * | --- | --- | --- |
 * | Subscribe, Save for later, Load more | `Button` primary / ghost / secondary | Match |
 * | Topic labels | `Badge` | Match |
 * | Featured card, grid cards | `Card` elevated / outlined | Match |
 * | Top bar, wordmark | Shared `BlogTopBar`, on the `AppShell` classes | Match |
 * | Articles / About as ghost `Button`s | `NavigationMenu.Link` | **Swap** — Figma had no nav component |
 * | Read article, Read the story | `Button` | **Gap** — these navigate, so they should be links. `Button render={<a />}` makes Base UI log a `nativeButton` error (the wrapper's props are typed as `<button>`, so `nativeButton={false}` cannot be passed) and the link picks up the browser underline. Fix belongs in `Button` on a `feature/*` branch, not here |
 * | Page title, lead, section heading | Plain `h1` / `p` / `h2` on type tokens | **Gap** — no text component; same as every pattern |
 * | Flat nav links | `NavigationMenu.Link` outside a panel | **Gap** — allowed by Base UI, not shown in any story |
 *
 * Every "Read" button opens *Prototypes/Article detail* through Storybook's own
 * `selectStory` event (`blog/prototypeNav.ts`) — prototype glue, not app routing.
 *
 * Differences from the Figma frame, by design: the page and top bar take the
 * `AppShell` surfaces (page `background-default`, bar `background-surface`)
 * rather than the frame's own, because the pattern is what code already agreed.
 */
const meta = {
  title: 'Prototypes/Blog index',
  component: BlogIndex,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BlogIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The page as designed in Figma Version B. */
export const Default: Story = {
  parameters: {
    docs: prototypeDocs([
      { source, fn: 'BlogIndex' },
      { source: topBarSource, fn: 'BlogTopBar' },
    ]),
  },
};
