import { Badge } from '../components/Badge';
import { Table } from '../components/Table';
import data from '../../docs/sync-status.json';
import styles from './SyncStatus.module.css';

/*
 * The sync status, drawn with the system's own Table and Badge.
 * Data: docs/sync-status.json, written by `npm run sync-status` — never edit it.
 */

type Finding = { check: string; message: string; rule: string };
type Row = {
  name: string;
  checks: Record<string, boolean | null>;
  issues: Finding[];
  status: 'match' | 'drift' | 'missing in Figma' | 'not mirrored';
};
type SyncData = {
  snapshotDate: string;
  howToRefresh: string;
  checks: { id: string; label: string; means: string }[];
  rows: Row[];
  systemWide: { message: string; rule: string; file: string }[];
};
const sync = data as unknown as SyncData;

function Verdict({ value }: { value: boolean | null }) {
  if (value === null) return <Badge variant="neutral" size="sm">not mirrored</Badge>;
  return value ? (
    <Badge variant="success" size="sm">✓ agree</Badge>
  ) : (
    <Badge variant="danger" size="sm">✗ differs</Badge>
  );
}

export function SyncSummary() {
  const rows = sync.rows;
  const mirrored = rows.filter((r) => r.status !== 'not mirrored');
  const matching = rows.filter((r) => r.status === 'match');
  const attention = rows.filter((r) => r.status === 'drift' || r.status === 'missing in Figma');
  return (
    <div className={styles.cluster}>
      <Badge variant={attention.length ? 'danger' : 'success'}>
        {matching.length} of {mirrored.length} mirrored components agree
      </Badge>
      {attention.length ? <Badge variant="danger">{attention.length} need attention</Badge> : null}
      <Badge variant="neutral">{rows.length - mirrored.length} not mirrored, by decision</Badge>
      <Badge variant="neutral">Figma snapshot: {sync.snapshotDate}</Badge>
      <p className={styles.note}>
        <strong>Figma side:</strong> the last snapshot of the library, not the live file. {sync.howToRefresh}
      </p>
    </div>
  );
}

export function SyncTable() {
  const rows = sync.rows;
  return (
    <Table.Root caption="Every component, code and Figma, one check per column" hideCaption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Component</Table.HeaderCell>
          {sync.checks.map((c) => (
            <Table.HeaderCell key={c.id}>{c.label}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((r) => (
          <Table.Row key={r.name}>
            <Table.HeaderCell scope="row">{r.name}</Table.HeaderCell>
            {sync.checks.map((c) => (
              <Table.Cell key={c.id}>
                <Verdict value={r.checks[c.id]} />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export function SyncIssues() {
  const rows = sync.rows.filter((r) => r.issues.length);
  if (!rows.length && !sync.systemWide.length) return <p className={styles.note}>Nothing. Code and Figma agree on every check.</p>;
  return (
    <ul className={styles.list}>
      {rows.flatMap((r) =>
        r.issues.map((f) => (
          <li key={r.name + f.message}>
            <strong>{r.name}</strong> · {sync.checks.find((c) => c.id === f.check)?.label}: {f.message}
          </li>
        )),
      )}
      {sync.systemWide.map((f) => (
        <li key={f.message}>{f.message}</li>
      ))}
    </ul>
  );
}
