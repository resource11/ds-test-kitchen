import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '../components/Alert';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Separator } from '../components/Separator';
import { articles, featured } from './blog/articles';
import { BlogTopBar } from './blog/BlogTopBar';
import { goTo, storyHref, storyIds } from './blog/prototypeNav';
import topBarSource from './blog/BlogTopBar.tsx?raw';
import source from './ArticleDetail.stories.tsx?raw';
import blog from './blog/Blog.module.css';
import styles from './Patterns.module.css';
import { prototypeDocs } from './prototypeDocs';

/* --------------------------------------------------------------- the screen */

function ArticleDetail() {
  return (
    <div className={styles.shell}>
      <BlogTopBar />

      <main className={styles.main}>
        <article className={blog.articlePage}>
          <Breadcrumb.Root>
            <Breadcrumb.Item>
              <Breadcrumb.Link href={storyHref(storyIds.index)} onClick={goTo(storyIds.index)}>
                Articles
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Current>{featured.title}</Breadcrumb.Current>
            </Breadcrumb.Item>
          </Breadcrumb.Root>

          <header className={blog.articleHeader}>
            <Badge variant={featured.variant} size="sm">
              {featured.topic}
            </Badge>
            <h1 className={styles.pageTitle}>{featured.title}</h1>
            <p className={styles.pageLead}>{featured.excerpt}</p>

            <div className={blog.byline}>
              <Avatar size="sm" fallback="TJ" />
              <div className={blog.bylineText}>
                <span className={blog.bylineName}>The Journal</span>
                <span className={blog.bylineMeta}>{featured.meta}</span>
              </div>
              <span className={styles.topBarSpacer} />
              <Button variant="ghost" size="sm">
                Save for later
              </Button>
            </div>
          </header>

          <Separator />

          {/* GAP: long-form text. No prose component exists; plain HTML on type tokens. */}
          <div className={blog.prose}>
            <p>
              Ask a model to build a screen from a design system it has only heard of, and it
              will. The buttons will have a <code>variant</code> prop, the cards will have a{' '}
              <code>footer</code>, and about a third of it will not exist.
            </p>
            <p>
              The fix is not a better prompt. It is giving the model something to read before it
              writes anything.
            </p>

            <h2>Three sources of truth, in order</h2>
            <ol>
              <li>
                <strong>The manifest.</strong> <code>components.json</code> is generated from
                source, so it cannot be out of date. It answers “does this prop exist”.
              </li>
              <li>
                <strong>The tokens.</strong> Two tiers of JSON. Components may only reach the
                semantic tier.
              </li>
              <li>
                <strong>The stories.</strong> How a component is actually used, and the patterns
                it already appears in.
              </li>
            </ol>

            <Alert variant="info" title="If it cannot read it, it will guess.">
              A wrong answer that looks confident is the failure mode. Point the model at the
              files, and tell it to stop if it cannot read them.
            </Alert>

            <h2>What it caught on the first real test</h2>
            <p>
              A blog prototype drawn in Figma used ghost buttons for navigation, because the Figma
              library had no navigation component. Code did. Mapping every element against the
              manifest before building flagged the swap; nothing else would have.
            </p>
          </div>

          <Separator />

          <section>
            <h2 className={styles.sectionTitle}>Keep reading</h2>
            <div className={blog.articleGrid}>
              {articles.slice(0, 2).map((article) => (
                <div key={article.id} className={blog.article}>
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
                </div>
              ))}
            </div>
          </section>

          <div>
            <Button variant="secondary" onClick={goTo(storyIds.index)}>
              Back to all articles
            </Button>
          </div>
        </article>
      </main>
    </div>
  );
}

/**
 * **Prototype, not a pattern.** The page every "Read" button on
 * *Prototypes/Blog index* opens. No Figma frame exists for it yet; it was
 * composed straight from the manifest.
 *
 * | Element | In code | Status |
 * | --- | --- | --- |
 * | Top bar | Shared `BlogTopBar`, on the `AppShell` classes | Match |
 * | Back to the list | `Breadcrumb` | Match |
 * | Topic | `Badge` | Match |
 * | Author | `Avatar` with initials | Match |
 * | Callout | `Alert` variant `info` | Match |
 * | Dividers | `Separator` | Match |
 * | Related articles | `Card` outlined + `Button` | Match |
 * | Title, lead, byline text | Plain `h1` / `p` / `span` on type tokens | **Gap** — no text component |
 * | Article body | Plain HTML in `.prose`, on type tokens | **Gap** — no prose / long-form component |
 * | Read / Back buttons navigate | `Button` with `onClick` | **Gap** — should be links; see `Button` in the Blog index table |
 *
 * Clicking between the two prototypes uses Storybook's own `selectStory` event
 * (`blog/prototypeNav.ts`). That is prototype glue, not app routing.
 */
const meta = {
  title: 'Prototypes/Article detail',
  component: ArticleDetail,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ArticleDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Grounding an AI in what actually exists", opened from the Blog index. */
export const Default: Story = {
  parameters: {
    docs: prototypeDocs([
      { source, fn: 'ArticleDetail' },
      { source: topBarSource, fn: 'BlogTopBar' },
    ]),
  },
};
