import {
  Controls,
  Description,
  Heading,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
  useOf,
} from '@storybook/addon-docs/blocks';

/*
 * Storybook's default Docs page, plus one section: the component's stylesheet.
 *
 * A designer reviewing a component should not have to open the codebase to see
 * how it is styled. Each stylesheet is read straight from its file (Vite's
 * `?raw`), so the CSS on the Docs page can never disagree with the CSS that
 * ships. Non-component pages (Foundations, Patterns, Prototypes) get the default
 * page unchanged.
 */
const stylesheets = import.meta.glob('../src/components/*/*.module.css', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function ComponentCss() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const { title } = preparedMeta;
  if (!title.startsWith('Components/')) return null;

  const name = title.split('/').pop();
  const path = Object.keys(stylesheets).find((p) => p.endsWith(`/${name}/${name}.module.css`));
  if (!path) return null;

  const css = stylesheets[path];
  const textStyles = [
    ...new Set([...css.matchAll(/--sds-typography-([a-z0-9-]+?)-font-family/g)].map((m) => m[1])),
  ];

  return (
    <>
      <Heading>CSS</Heading>
      <p>
        {textStyles.length ? (
          <>
            Text styles:{' '}
            {textStyles.map((style, i) => (
              <span key={style}>
                {i ? ', ' : ''}
                <code>{style}</code>
              </span>
            ))}
            .{' '}
          </>
        ) : null}
        Read from <code>{path.replace('../', '')}</code>, so it is always the CSS that ships.
      </p>
      <Source code={css} language="css" />
    </>
  );
}

export function ComponentDocsPage() {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
      <Stories />
      <ComponentCss />
    </>
  );
}
