import type { ReactNode } from 'react';

import { Badge } from '../components/Badge';
import { Table } from '../components/Table';

/*
 * The toolkit page, drawn with the system's own Table and Badge: every check,
 * command, skill and MCP in one place, to look up and to demo. Keep it in step
 * with "The toolkit" in README.md.
 */

const REPO = 'https://github.com/christinevall/ds-base-ui/blob/main/';
const SKILLS = 'https://github.com/christinevall/skills/tree/main/';

type Row = ReactNode[];

function Rows({ caption, head, rows }: { caption: string; head: string[]; rows: Row[] }) {
  return (
    <Table.Root caption={caption} hideCaption>
      <Table.Head>
        <Table.Row>
          {head.map((h) => (
            <Table.HeaderCell key={h}>{h}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((row, i) => (
          <Table.Row key={i}>
            <Table.HeaderCell scope="row">{row[0]}</Table.HeaderCell>
            {row.slice(1).map((cell, j) => (
              <Table.Cell key={j}>{cell}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

const cmd = (text: string) => <code>{text}</code>;
const link = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noreferrer">
    {text}
  </a>
);

export function Checks() {
  return (
    <Rows
      caption="Checks"
      head={['Check', 'Answers', 'Run it']}
      rows={[
        ['Sync status', 'Are code and Figma still in sync? One column per check: Figma key, same name, same property names, options, defaults, code follows the rules', <>{cmd('npm run sync-status')} · or open <em>Sync status</em> in this sidebar</>],
        ['Session check', 'The same, as one line, at the start of every Claude session', 'Automatic (.claude/settings.json)'],
        ['validate', 'Tokens exist, no primitives or raw colours in components, whole text styles, Figma names and keys match the code', <>{cmd('npm run validate')} · {cmd('npm run validate -- --strict')} for CI</>],
        ['audit', 'Inside a Figma component: is every colour, padding, gap and radius bound to a variable?', 'Ask Claude, with Figma open: "audit the Accordion"'],
        ['contrast', 'Do the colour pairs pass WCAG contrast?', cmd('npm run check:contrast')],
        ['Before a pull request', 'Types and lint', <>{cmd('npx tsc -b --noEmit')} · {cmd('npm run lint')}</>],
      ]}
    />
  );
}

export function Commands() {
  return (
    <Rows
      caption="Commands"
      head={['Command', 'Does']}
      rows={[
        [cmd('npm run storybook'), 'This Storybook on localhost:6001, with the Storybook MCP at /mcp'],
        [cmd('npm run build-storybook'), 'The static Storybook, and the Storybook manifest (what exists in code)'],
        [cmd('npm run build:tokens'), 'Token JSON → the generated CSS. Run after editing a token'],
        [cmd('npm run sync-status'), 'Rewrites the Sync status page and docs/sync-status.md'],
        [cmd('npm run validate'), 'The rules check'],
        [cmd('npm run check:contrast'), 'The contrast check'],
        [cmd('npm run figma:tokens'), 'What the Figma variables and text styles should be'],
        [cmd('npm run figma:spec -- Button'), "A component's CSS as a Figma build spec"],
        ['Gaps', 'Where Figma cannot match the code, and why, plus what is open: open Gaps in this sidebar (figma/GAPS.md)'],
        ['Figma only', 'How to prototype with Claude from a Figma library alone: open Figma only in this sidebar (docs/figma-only.md)'],
        ['Layout rules', 'The six layout words and the page anatomy: open Layout in this sidebar (docs/layout.md)'],
        ['snapshot (in Figma)', 'Ask Claude: "take a snapshot of the library". Writes figma/manifest.json with the key map'],
      ]}
    />
  );
}

export function Skills() {
  return (
    <Rows
      caption="Skills"
      head={['Skill', 'For', 'Say', 'Needs']}
      rows={[
        [
          link(`${REPO}.claude/skills/figma-library-from-code/SKILL.md`, 'figma-library-from-code'),
          'Build or update the Figma library from the code: components, variables, text styles',
          '"Mirror the Accordion to Figma" · "the tokens changed, sync Figma"',
          <>Figma Console MCP · shared at {link(`${SKILLS}figma-library-from-code`, 'christinevall/skills')}</>,
        ],
        [
          link(`${REPO}.claude/skills/storybook-figma-sync/SKILL.md`, 'storybook-figma-sync'),
          <>Prototypes between Storybook and Figma, both ways, from real components only <Badge size="sm" variant="warning">being tested</Badge></>,
          '"Put the booking flow into Figma" · "bring this Figma screen back to Storybook"',
          <>Storybook MCP · Figma Console MCP · shared at {link(`${SKILLS}storybook-figma-sync`, 'christinevall/skills')}</>,
        ],
        [
          link(`${REPO}.claude/skills/ds-inspection/SKILL.md`, 'ds-inspection'),
          <>
            A health check of the whole system, with a red/yellow/green report and a work order. <strong>By Brad Frost</strong>,
            from {link('https://github.com/bradfrost/skills', 'bradfrost/skills')} (MIT), unchanged; customised for this system in{' '}
            {link(`${REPO}ds-inspection/GARAGE.md`, 'GARAGE.md')}: a report for designers and developers (🎨 / 🛠️ columns, plain language)
          </>,
          '"Run the inspection"',
          '–',
        ],
      ]}
    />
  );
}

export function Mcps() {
  return (
    <Rows
      caption="MCPs"
      head={['MCP', 'Connects Claude to', 'Set up']}
      rows={[
        ['Storybook MCP', 'This Storybook: which components exist, their props and stories', <>.mcp.json (Claude Code) · .cursor/mcp.json (Cursor) · needs {cmd('npm run storybook')}</>],
        ['Figma Console MCP', 'The Figma desktop app: read and build in any open file', 'Run the Figma Desktop Bridge plugin in the file (Plugins → Development)'],
        ['Figma MCP (official)', "Figma's own server: design context, screenshots, use_figma", 'Not needed here; the skills are tested with the Figma Console MCP'],
      ]}
    />
  );
}
