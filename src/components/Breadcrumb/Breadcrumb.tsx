import styles from './Breadcrumb.module.css';

export type BreadcrumbRootProps = React.ComponentProps<'nav'> & {
  /** Accessible name for the landmark. */
  'aria-label'?: string;
  /** Props forwarded to the inner `<ol>`. */
  listProps?: React.ComponentProps<'ol'>;
};

export type BreadcrumbItemProps = React.ComponentProps<'li'>;
export type BreadcrumbLinkProps = React.ComponentProps<'a'>;
export type BreadcrumbSeparatorProps = React.ComponentProps<'li'>;
export type BreadcrumbCurrentProps = React.ComponentProps<'span'>;

const cx = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

/**
 * A trail of ancestor links. No Base UI primitive is needed: the semantics are
 * the component. A `<nav aria-label="Breadcrumb">` wraps an ordered list, the
 * separators are `aria-hidden` so they are not read out, and the last entry is
 * `Breadcrumb.Current` with `aria-current="page"`.
 *
 * Usage:
 *   <Breadcrumb.Root>
 *     <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
 *     <Breadcrumb.Separator />
 *     <Breadcrumb.Item><Breadcrumb.Current>Settings</Breadcrumb.Current></Breadcrumb.Item>
 *   </Breadcrumb.Root>
 */
function Root({
  'aria-label': ariaLabel = 'Breadcrumb',
  listProps,
  className,
  children,
  ...props
}: BreadcrumbRootProps) {
  const { className: listClassName, ...restList } = listProps ?? {};

  return (
    <nav aria-label={ariaLabel} className={cx(styles.root, className ?? '')} {...props}>
      <ol className={cx(styles.list, listClassName ?? '')} {...restList}>
        {children}
      </ol>
    </nav>
  );
}

function Item({ className, ...props }: BreadcrumbItemProps) {
  return <li className={cx(styles.item, className ?? '')} {...props} />;
}

function Link({ className, ...props }: BreadcrumbLinkProps) {
  return <a className={cx(styles.link, className ?? '')} {...props} />;
}

function Separator({ className, children, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cx(styles.separator, className ?? '')}
      {...props}
    >
      {children ?? <ChevronIcon />}
    </li>
  );
}

function Current({ className, ...props }: BreadcrumbCurrentProps) {
  return <span aria-current="page" className={cx(styles.current, className ?? '')} {...props} />;
}

export const Breadcrumb = Object.assign(Root, { Root, Item, Link, Separator, Current });
