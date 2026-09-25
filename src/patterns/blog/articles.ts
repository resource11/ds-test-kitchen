import type { BadgeVariant } from '../../components/Badge/Badge';

/* Prototype content shared by the Blog index and Article detail stories. */

export type Article = {
  id: string;
  topic: string;
  variant: BadgeVariant;
  title: string;
  meta: string;
  excerpt: string;
};

export const topics: Array<{ label: string; variant: BadgeVariant }> = [
  { label: 'Tokens', variant: 'accent' },
  { label: 'Components', variant: 'success' },
  { label: 'AI', variant: 'warning' },
  { label: 'Process', variant: 'neutral' },
];

export const featured: Article = {
  id: 'grounding',
  topic: 'AI',
  variant: 'warning',
  title: 'Grounding an AI in what actually exists',
  meta: '19 Aug 2026 · 6 min read',
  excerpt:
    'A generated manifest beats memory every time. We point the model at three sources of truth, in order, and it stops giving confident, wrong answers about props that never existed.',
};

export const articles: Article[] = [
  {
    id: 'semantic-tokens',
    topic: 'Tokens',
    variant: 'accent',
    title: 'Why components only speak in semantic tokens',
    meta: '3 Sep 2026 · 5 min read',
    excerpt: 'Primitives describe what a colour is. Semantic tokens describe what it is for.',
  },
  {
    id: 'wrap-dont-rebuild',
    topic: 'Components',
    variant: 'success',
    title: 'Wrap, don’t rebuild',
    meta: '27 Aug 2026 · 4 min read',
    excerpt: 'Base UI already solved focus, keyboard and ARIA. We own styling and the token contract.',
  },
  {
    id: 'playground',
    topic: 'Process',
    variant: 'neutral',
    title: 'The playground is not a merge source',
    meta: '8 Aug 2026 · 3 min read',
    excerpt: 'Prototypes are decisions, not code. Accepted ideas get rebuilt on a feature branch.',
  },
];
