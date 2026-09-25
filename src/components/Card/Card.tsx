import { useRender } from '@base-ui/react/use-render';
import styles from './Card.module.css';

export type CardVariant = 'outlined' | 'elevated';

export type CardRootProps = React.ComponentProps<'div'> & {
  /** `outlined` leans on the border token, `elevated` on the raised elevation token. */
  variant?: CardVariant;
};

export type CardHeaderProps = React.ComponentProps<'div'>;
export type CardTitleProps = React.ComponentProps<'h3'> & {
  /**
   * Replace the rendered element, e.g. `render={<h2 />}`, so the card can sit
   * at the right depth in the page's heading order. Same shape as the `render`
   * prop on `Button` and `Dialog.Trigger`. Defaults to `<h3>`.
   */
  render?: useRender.RenderProp;
};
export type CardDescriptionProps = React.ComponentProps<'p'>;
export type CardBodyProps = React.ComponentProps<'div'>;
export type CardFooterProps = React.ComponentProps<'div'>;

const cx = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

/**
 * A surface container. Purely presentational: no interaction logic, so there is
 * no Base UI primitive to wrap. Composed as a namespace so consumers decide
 * which slots they need and in what order.
 *
 * Usage:
 *   <Card.Root variant="elevated">
 *     <Card.Header>
 *       <Card.Title>Title</Card.Title>
 *       <Card.Description>Supporting copy</Card.Description>
 *     </Card.Header>
 *     <Card.Body>...</Card.Body>
 *     <Card.Footer>...</Card.Footer>
 *   </Card.Root>
 */
function Root({ variant = 'outlined', className, ...props }: CardRootProps) {
  return <div className={cx(styles.root, styles[variant], className ?? '')} {...props} />;
}

function Header({ className, ...props }: CardHeaderProps) {
  return <div className={cx(styles.header, className ?? '')} {...props} />;
}

/**
 * The card's heading. `h3` by default, which is only correct when the card sits
 * under an `h2`. A page whose card follows an `h1`, or one nested a level
 * deeper, passes `render={<h2 />}` or `render={<h4 />}` instead: axe's
 * `heading-order` rule is about the page, and only the page knows the answer.
 */
function Title({ className, render, ...props }: CardTitleProps) {
  return useRender({
    render,
    defaultTagName: 'h3',
    props: { ...props, className: cx(styles.title, className ?? '') },
  });
}

function Description({ className, ...props }: CardDescriptionProps) {
  return <p className={cx(styles.description, className ?? '')} {...props} />;
}

function Body({ className, ...props }: CardBodyProps) {
  return <div className={cx(styles.body, className ?? '')} {...props} />;
}

function Footer({ className, ...props }: CardFooterProps) {
  return <div className={cx(styles.footer, className ?? '')} {...props} />;
}

/** `Card` is the root element and the namespace for its parts, so both
 *  `<Card>` and `<Card.Root>` work. Being a real component reference rather
 *  than a plain object is what lets Storybook resolve `component: Card` and
 *  publish this component's props into the manifest agents read. */
export const Card = Object.assign(Root, { Root, Header, Title, Description, Body, Footer });
