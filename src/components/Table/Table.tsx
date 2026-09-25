import styles from './Table.module.css';

export type TableRootProps = React.ComponentProps<'table'> & {
  /** Rendered as a real `<caption>`; it is the table's accessible name. */
  caption?: React.ReactNode;
  /** Visually hide the caption while keeping it for assistive tech. */
  hideCaption?: boolean;
  /** Tint every other body row. */
  striped?: boolean;
  /** Props forwarded to the horizontal scroll container around the table. */
  containerProps?: React.ComponentProps<'div'>;
};

export type TableHeadProps = React.ComponentProps<'thead'>;
export type TableBodyProps = React.ComponentProps<'tbody'>;
export type TableRowProps = React.ComponentProps<'tr'>;
export type TableHeaderCellProps = React.ComponentProps<'th'> & {
  /** Right-align the header, to sit over a column of `numeric` cells. */
  numeric?: boolean;
};
export type TableCellProps = React.ComponentProps<'td'> & {
  /** Right-align the cell, the usual treatment for numbers. */
  numeric?: boolean;
};

const cx = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

/**
 * A data table. Base UI ships no table primitive, and it should not: the value
 * here is real `<table>` semantics, which the browser already gives us. The
 * table is wrapped in an `overflow-x: auto` container so a wide table scrolls
 * inside its own box instead of breaking the page layout.
 *
 * Usage:
 *   <Table.Root caption="Invoices" striped>
 *     <Table.Head>
 *       <Table.Row><Table.HeaderCell>Ref</Table.HeaderCell></Table.Row>
 *     </Table.Head>
 *     <Table.Body>
 *       <Table.Row><Table.Cell>INV-001</Table.Cell></Table.Row>
 *     </Table.Body>
 *   </Table.Root>
 */
function Root({
  caption,
  hideCaption = false,
  striped = false,
  containerProps,
  className,
  children,
  ...props
}: TableRootProps) {
  const { className: containerClassName, ...restContainer } = containerProps ?? {};

  return (
    <div className={cx(styles.container, containerClassName ?? '')} {...restContainer}>
      <table
        className={cx(styles.table, striped ? styles.striped : '', className ?? '')}
        {...props}
      >
        {caption ? (
          <caption className={cx(styles.caption, hideCaption ? styles.visuallyHidden : '')}>
            {caption}
          </caption>
        ) : null}
        {children}
      </table>
    </div>
  );
}

function Head({ className, ...props }: TableHeadProps) {
  return <thead className={cx(styles.head, className ?? '')} {...props} />;
}

function Body({ className, ...props }: TableBodyProps) {
  return <tbody className={cx(styles.body, className ?? '')} {...props} />;
}

function Row({ className, ...props }: TableRowProps) {
  return <tr className={cx(styles.row, className ?? '')} {...props} />;
}

function HeaderCell({ numeric = false, className, scope = 'col', ...props }: TableHeaderCellProps) {
  return (
    <th
      scope={scope}
      className={cx(styles.headerCell, numeric ? styles.numeric : '', className ?? '')}
      {...props}
    />
  );
}

function Cell({ numeric = false, className, ...props }: TableCellProps) {
  return (
    <td className={cx(styles.cell, numeric ? styles.numeric : '', className ?? '')} {...props} />
  );
}

export const Table = Object.assign(Root, { Root, Head, Body, Row, HeaderCell, Cell });
