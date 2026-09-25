import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import sync from '../../docs/sync-status.json';
import styles from './GettingStarted.module.css';

/*
 * The top of Getting started, built from the system's own components, so the
 * first page people see is also a demo of it. Every link works for everyone,
 * on the live Storybook and locally: Storybook pages open in the same window,
 * files and repositories open on GitHub.
 */

const GITHUB = 'https://github.com/christinevall/ds-base-ui';
const LINKS = {
  github: GITHUB,
  template: `${GITHUB}/generate`,
  file: (path: string) => `${GITHUB}/blob/main/${path}`,
  folder: (path: string) => `${GITHUB}/tree/main/${path}`,
  figma: 'https://www.figma.com/community/file/1681312616396112992',
  skills: 'https://github.com/christinevall/skills',
  baseUi: 'https://base-ui.com',
  dtcg: 'https://www.designtokens.org',
  styleDictionary: 'https://styledictionary.com',
  moonlearning: 'https://moonlearning.io',
  newsletter: 'https://moonlearning.io/newsletter',
};

/** A Storybook page, opened in the whole window rather than inside the docs frame. */
const page = (id: string) => `./?path=/${id.endsWith('--docs') ? 'docs' : 'story'}/${id}`;

type Row = { status: string };
const rows = (sync as unknown as { rows: Row[] }).rows;
const mirrored = rows.filter((r) => r.status !== 'not mirrored').length;
const agree = rows.filter((r) => r.status === 'match').length;

function Link({ href, children, variant = 'ghost' }: { href: string; children: string; variant?: 'primary' | 'secondary' | 'ghost' }) {
  const internal = href.startsWith('./');
  return (
    <Button
      variant={variant}
      size="sm"
      render={<a href={href} target={internal ? '_top' : '_blank'} rel={internal ? undefined : 'noreferrer'} />}
    >
      {children}
    </Button>
  );
}

function Tile({ title, text, href, label }: { title: string; text: string; href: string; label: string }) {
  return (
    <Card.Root className={styles.card}>
      <Card.Header>
        <Card.Title render={<h3 />}>{title}</Card.Title>
      </Card.Header>
      <Card.Body>{text}</Card.Body>
      <Card.Footer>
        <Link href={href}>{`${label} →`}</Link>
      </Card.Footer>
    </Card.Root>
  );
}

export function Hero() {
  return (
    <div className={styles.stack}>
      <h1 className={styles.title}>Sample Design System</h1>
      <p className={styles.lead}>
        A small, real design system for designers learning to work with AI. It is built on Base UI, styled by a token
        pipeline, documented here, and mirrored into Figma, so a screen can move between Figma and code without drifting.
      </p>
      <div className={styles.cluster}>
        <Badge variant="accent">Built on Base UI</Badge>
        <Badge variant="neutral">{rows.length} components</Badge>
        <Badge variant={agree === mirrored ? 'success' : 'danger'}>
          {`${agree} of ${mirrored} in sync with Figma`}
        </Badge>
        <Badge variant="neutral">MIT licence</Badge>
      </div>
      <div className={styles.cluster}>
        <Link href={LINKS.github} variant="primary">
          Code on GitHub
        </Link>
        <Link href={LINKS.template} variant="secondary">
          Use this template
        </Link>
        <Link href={LINKS.figma} variant="secondary">
          Figma library
        </Link>
        <Link href={LINKS.skills}>The skills</Link>
      </div>
    </div>
  );
}

export function HowItIsBuilt() {
  return (
    <div className={styles.stack}>
      <h2 className={styles.section}>How it is built</h2>
      <p className={styles.lead}>One source, read left to right. Change a token and everything after it follows.</p>
      <div className={styles.grid}>
        <Tile title="1 · Base UI" text="Unstyled primitives with the hard parts done: behaviour, keyboard, focus and ARIA. Every interactive component wraps one." href={LINKS.baseUi} label="base-ui.com" />
        <Tile title="2 · Tokens" text="Design decisions as DTCG JSON. Tier 1 defines raw values, tier 2 names what they are for, in light and dark, plus text styles." href={LINKS.folder('tokens')} label="The token files" />
        <Tile title="3 · Style Dictionary" text="npm run build:tokens turns the JSON into CSS variables and breakpoints. The CSS is output: edit the JSON, never the CSS." href={LINKS.styleDictionary} label="styledictionary.com" />
        <Tile title="4 · Components" text="Base UI wrapped and styled with semantic tokens and whole text styles only, one CSS Module per component." href={LINKS.folder('src/components')} label="The components" />
        <Tile title="5 · Storybook" text="Every component in every state, with a Storybook MCP so AI tools can look up what exists and with which props." href={page('components-button--docs')} label="Start with Button" />
        <Tile title="6 · Figma" text="The library is generated from the code with the figma-library-from-code skill: same names, props and tokens. Sync status proves it." href={page('sync-status--docs')} label="Sync status" />
      </div>
    </div>
  );
}

export function StartHere() {
  return (
    <div className={styles.stack}>
      <h2 className={styles.section}>Start here</h2>
      <div className={styles.grid}>
        <Tile title="Foundations" text="Colour, type, space and motion: the decisions everything else inherits. Flip the theme in the toolbar while you read." href={page('foundations-colour--semantic')} label="Colour" />
        <Tile title="Components" text="Each has a Default story and a story per state. Change props in Controls, check the Accessibility panel." href={page('components-button--docs')} label="Button" />
        <Tile title="Patterns" text="Real screens assembled from the library: where you find out whether the system holds together." href={page('patterns-settings-page--docs')} label="Settings page" />
        <Tile title="Prototypes" text="Screens that moved between Figma and code: the booking flow, and a sign-up page designed in Figma from a brief." href={page('prototypes-workshop-sign-up--docs')} label="Workshop sign-up" />
      </div>
    </div>
  );
}

export function FigmaAndCode() {
  return (
    <div className={styles.stack}>
      <h2 className={styles.section}>Figma and code, together</h2>
      <div className={styles.grid}>
        <Tile title="Sync status" text="Every component, code and Figma side by side: same key, name, properties, options and defaults." href={page('sync-status--docs')} label="Open" />
        <Tile title="Toolkit" text="Every check, command, skill and MCP, and a five-minute demo." href={page('toolkit--docs')} label="Open" />
        <Tile title="Layout" text="The six layout words and how this code builds a page, so a Figma screen comes back into code unchanged." href={page('layout--docs')} label="Open" />
        <Tile title="Figma only" text="Prototyping with Claude from a Figma library alone, before there is a Storybook." href={page('figma-only--docs')} label="Open" />
        <Tile title="Gaps" text="Where Figma cannot match the code, and why, plus what is still open." href={page('gaps--docs')} label="Open" />
        <Tile title="The skills" text="figma-library-from-code and storybook-figma-sync, shared for other design systems, MIT licensed." href={LINKS.skills} label="On GitHub" />
      </div>
    </div>
  );
}

export function GetIt() {
  return (
    <div className={styles.stack}>
      <h2 className={styles.section}>Get it, learn it</h2>
      <div className={styles.cluster}>
        <Link href={LINKS.github} variant="secondary">
          GitHub repository
        </Link>
        <Link href={LINKS.template} variant="secondary">
          Use this template
        </Link>
        <Link href={LINKS.figma} variant="secondary">
          Figma Community file
        </Link>
        <Link href={LINKS.skills} variant="secondary">
          Skills
        </Link>
        <Link href={LINKS.moonlearning}>Course: moonlearning.io</Link>
        <Link href={LINKS.newsletter}>Newsletter</Link>
      </div>
    </div>
  );
}

export function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <HowItIsBuilt />
      <StartHere />
      <FigmaAndCode />
      <GetIt />
    </div>
  );
}
