# Where Figma cannot mirror the code exactly

Every entry here is a decision, not an oversight: what the code does, what
Figma does instead, and why. Add an entry whenever the `figma-library-from-code` skill
meets something it cannot express. Anything not listed is expected to match.

## Tokens

| Code | Figma | Why |
| --- | --- | --- |
| Line height is unitless (`1.2`), letter spacing is `em` | Resolved pixels (24 × 1.2 = 28.8px) in `typography/<style>/line-height` and `letter-spacing` | Figma reads a bound line-height or letter-spacing variable as pixels (tested). Renders the same, but does not follow a font-size change on its own |
| `text-transform` is part of a text style | Case on the Figma text style | Figma has no case variable |
| A shadow is one token, `--sds-elevation-*`, different in Light and Dark | An effect style whose colour is bound to `elevation/<level>/color` (Light/Dark) | Effect styles have no modes. The geometry is the same in both themes in code; only the alpha changes. The colour variables are Figma-only and carry no code syntax |
| Tier-1 `shadow.*`, `line.height.*`, `letter.spacing.*`, `text.transform.*` | Not mirrored as variables | Internal to the text and effect styles above |
| `TIMING` and `EASING` variables | `ALL_SCOPES` | Figma has no motion scopes; these types can only fill a timing or easing field anyway |

## Components

| Component | Code | Figma | Why |
| --- | --- | --- | --- |
| Card | `.header + .body` gives the body 8px top padding only when a header comes first | The body always has 8px | Figma has no sibling selectors. The default composition is exact; with `Card.Header` hidden the body sits 4px tighter than in code |
| All | `:hover`, `:active`, `:focus-visible` styles | Not mirrored | They are CSS states, not props, so they are not in the contract. Candidate for prototype interactions later |
| All | Values Base UI computes in the browser (`--anchor-width`, `--popup-height`, `--active-tab-left`, …) | A representative fixed value, stated in the page documentation | They only exist at runtime |
| Icons | Every component draws its own inline SVG, so the same shape has drifted: **chevron-down** is `M4 6l4 4 4-4` in Accordion and `m4 6.5 4 4 4-4` in Select, Combobox, Autocomplete and NavigationMenu; **chevron-right** is `M6 3.5 10.5 8 6 12.5` in Breadcrumb and Menu and `M6 4l4 4-4 4` in Collapsible; **check** is the same geometry at stroke 1.75 in Select and Combobox and stroke 2 in Checkbox (so it is two icons); **close** is one shape written in absolute and relative notation (so it is one icon) | Every distinct drawing is its own icon, so each component keeps exactly what it renders | Figma follows the code, including its drift. Merging them into one shared icon module is a code decision — CLAUDE.md allows inline SVG, and consolidating changes components |
| Story icons | Toolbar's stories draw bold, italic and underline differently from Toggle's and ToggleGroup's | One drawing each, from Toggle and ToggleGroup; `scripts/figma/icons.mjs --summary` lists the skipped ones | They are example content, not system decisions — but the same drift, one layer out |
| Checkbox | Standalone, every story crashes: `Field.Item` needs an enclosing `Field.Root` | Mirrored as it renders inside `CheckboxGroup` | A code bug, found while comparing with Storybook and flagged for a separate fix. The Figma component shows the intended render |
| Checkbox | `data-invalid` gives the box a danger border | No `invalid` variant | Checkbox has no `invalid` prop. The state comes from an enclosing `Field.Root` (its `invalid` prop, or validation), so a variant would name a prop that does not exist |
| Checkbox | A description renders without a label | `Field.Label` hides the whole text column, description included | In code the column exists when either is given; Figma binds a layer's visibility to one property. No story uses a description without a label |
| Checkbox | `indeterminate` wins over `checked`: the dash replaces the tick | Both are variants, so two pairs of variants look identical | Each pair is a real prop combination. Dropping one would make it unreachable from Figma |
| Tabs | `Tabs.Indicator` is a sibling of the tabs, sized and moved by Base UI (`--active-tab-width`, `--active-tab-left`, …) | Drawn inside the active `Tabs.Tab`, 2px along its bottom (right edge when vertical), behind a `Tabs.Indicator` boolean | That is where the runtime geometry puts it, and it follows the tab a designer marks `active`. Structurally it is one level off |
| Tabs | `Tabs.List`'s border is `box-shadow: inset 0 -1px 0 0` (`-1px 0` when vertical), painted beneath the tabs | A 1px rectangle as the list's bottom layer | A Figma inner shadow on a frame with no fill applies to the frame's children — it blurred the tab labels — and a stroke draws over them, covering the indicator |
| Select | While nothing is selected, `data-placeholder` is set and the value slot shows the `placeholder` prop | A variant `placeholder` (Base UI state) and a TEXT property `value` for the slot's text | The wrapper's `placeholder` is a string prop and Base UI's `placeholder` a boolean state; one Figma name cannot be both. `value` names the part it fills (`Select.Value`), as `panel` does `Tabs.Panel`. Coming back: `placeholder=true` with a value is the placeholder prop; `placeholder=false` is the `defaultValue` of the item with that label |
| Select | `.item[data-selected]` sets `font-weight: medium` on top of body-md | No text style: body-md's four fields and `font/weight/medium` bound one by one, marked `textStyle` for the audit | Figma cannot override one field of a text style. Setting the weight detaches the style, and a bound font-weight on a styled text is ignored (tested) |
| Select | `<Select.Separator />` in the Grouped story | Not mirrored | It has no class and no styles in `Select.module.css`, so it renders nothing visible. A code question: style it or drop it from the story |
| Select | Field.Error and the danger border (`data-invalid`) after failed validation | Not mirrored | Validation state, not a prop — as with Checkbox |
| Select | Scroll arrows | Not mirrored | Base UI mounts them only while the list overflows |
| Spinner | The indicator is a circle with `stroke-dasharray: 10 31`, spinning (900ms; slowed under reduced motion) | The arc that dash pattern produces, drawn as a path, at rest | Figma restarts a dash pattern at every segment of a path, and an imported circle is four segments: it drew four arcs. Motion is not in the contract |
| Spinner | Colour is `currentcolor`: inside a Button it takes the button's text colour (`InheritsColor` story) | `color/content/accent` on both strokes | Figma has no inherited colour. Override the strokes on the instance |
| IconButton | `label` is required and becomes `aria-label`; nothing visible renders it | A hidden text layer bound to a `label` text property | The frame has to carry the accessible name back; a hidden layer takes no space |
| IconButton | The icon (`children`) takes the button's text colour (`currentColor`) | Each variant overrides the icon's ink; the story icons edit, trash and more-vertical were flattened to one path each | Figma carries an override across an instance swap layer by layer, so a four-path icon swapped in kept the ink on two paths only. With one `Vector` per icon, the ink survives any swap |
| Progress, Meter | The indicator's width is `value` as a share of the track, written inline by Base UI | A rectangle at the stories' reading (40%, 42%), constrained to scale with the track | A runtime value. Resize it on an instance for another reading, and put the number in the `value` text |
| Progress, Meter | The header renders when there is a label or `showValue` | `Progress.Label` / `Meter.Label` hides the header; `showValue` hides the value | One layer takes one visibility property, so a value without a label cannot be drawn |
| Progress | `status=indeterminate` slides a 35% indicator across the track (1.4s) | Drawn at rest at the start of the track | Motion is not in the contract |
| Progress, Meter | `font-variant-numeric: tabular-nums` on the value | Not mirrored | It changes nothing in a still frame: tabular figures only stop digits shifting while the number changes |
| Meter | `.danger .value` is body-sm at medium weight | Fields bound one by one, marked `textStyle` | As `Select.Item`: Figma cannot override one field of a text style |
| Toggle | `children` is text, or an icon when `iconOnly` | The text has the TEXT property `children`; the icon is swapped on its layer | Figma keeps one property per name: a second `children` was silently renamed `children2`. Text is the common case |
| Toggle | An icon-only toggle is named by `aria-label` (`IconOnly` story) | A hidden layer with an `aria-label` text property | As IconButton's `label`: the frame carries the name back |
| Toggle | An icon beside a label (`WithIcon` story) | Not mirrored | It would need an optional icon in every text variant, with no prop to name the switch that shows it |
| Toggle | 48 variants | — | Over the ~30 guideline. variant, size, pressed, disabled and iconOnly are all real props, and there is no repeating part to split off |
| Switch | With no label or description it renders the bare control | `Field.Label` hides the whole text column, so a description without a label (`DescriptionOnly` story) cannot be drawn | An auto-layout frame whose children are all hidden keeps its last size instead of collapsing (tested), so the column itself has to be hidden. The story notes that such a switch has no accessible name |
| Switch | `.wrapper:has(.description)` aligns the row to the top instead of the centre | Always centred | Figma cannot change alignment with a boolean. Top-aligned, the label sits a few pixels higher |
| RadioGroup | `margin-top: space/1` on the group | Top padding bound to `space/1` | Same result; Figma has no margin |
| RadioGroup | Field.Error and the danger border (`data-invalid`) | Not mirrored | Validation state, not a prop — as with Checkbox and Select |
| Slider | The indicator ends and the thumb sits at `value` as a share of the track, computed by Base UI | Drawn at the stories' 40, scaling with the track | A runtime value, as for Progress |
| Slider | Two values render two thumbs (`Range` story) | Not mirrored | No prop names it: the thumb count follows the length of an array `value` |
| Slider | The thumb's shadow deepens to `elevation/floating` while dragging | Not mirrored | `data-dragging` is runtime |
| TextField, Textarea | `::placeholder` colours the placeholder; a value replaces it | A variant `filled` (Base UI Field state) with the placeholder and the value on separate layers | Each keeps its own text. Coming back: `filled=false` is the placeholder prop, `filled=true` the `defaultValue` |
| Textarea | `rows` (default 4) sets the height; `resize: vertical \| none` shows or hides the browser's grip | Four body-md lines tall; `resize` not drawn | `rows` is a number, so resize the control on an instance. The grip is browser chrome, not the component |
| TextField, Textarea, Slider, NumberField | Field.Error and the danger border after failed validation | Not mirrored | Validation state, not a prop |
| NumberField | While scrubbing, a cursor (`icon/scrub-cursor`) stands in for the locked pointer | Not drawn | It exists only during the drag |
| ToggleGroup | `segmented` restyles its Toggles from the parent (`.segmented > button`): transparent at rest, lifted onto the surface when pressed | The look is an override on each Toggle instance | Figma has no parent selectors. Figma also keeps an override when the instance's variant changes, so after moving the selection, reapply the pressed and resting looks. A code option would be a `segmented` look on Toggle itself — a design decision, not a Figma one |
| ToggleGroup | `flex: 1` shares the joined track equally | Segments fill a track sized to the default labels | Edit a label and the track does not grow; widen it on the instance |
| Table | Row headers are styled by position (`.body .headerCell`: medium weight, default border) | `Table.HeaderCell` `scope=row` carries that look | The stories always pair the two. A column header placed in the body would render as a row header in code |
| Table | `.row:last-child` drops the bottom border; `striped` shades `:nth-of-type(even)` rows | Overrides on the cells of those rows | Figma has no structural selectors. Add a row and set its borders and fill by hand |
| Table | `border-collapse` table layout sizes columns to their content | Columns fixed to the default content's widths | Figma has no table layout. Widen a column by resizing its cells |
| Table | `overflow-x: auto` scrolls a table wider than its container | Not mirrored | Behaviour, not a look |
| Table | 35 cells | Not exposed | Exposing every cell would bury the Table's own properties. Select a cell to edit its text |
| Collapsible, Accordion | The panel's height animates from 0 to `--collapsible-panel-height` / `--accordion-panel-height` | Open: the panel at its natural height. Closed: no panel | A runtime value, and motion |
| Accordion | `.item:first-child` adds a top border | An override on the first item inside `Accordion` | Figma has no structural selectors |
| Toolbar | `.button[data-pressed]` and `[data-popup-open]` tint a button that renders a Toggle or a Menu trigger (`render` prop, `WithMenu` story) | Not a `Toolbar.Button` variant | Toolbar.Button has no `pressed` or `open` prop; the state belongs to the component it renders. Mirrored with Menu |
| Toolbar | A button holds an icon or text (`children`) | Both layers exist; the text layer starts hidden. Show it and hide the icon on the instance | No prop names the choice, so it is layer visibility rather than a property |
| Toolbar | `.separator` stretches to the toolbar's height (`align-self: stretch`) | 32px in `Toolbar.Separator`, marked `height`; stretched inside `Toolbar` | Its height is the toolbar's, known only in place |
| Menu | `.item` sets `line-height: var(--sds-line-height-tight)` on top of body-sm — an open decision in the CSS (`validate-allow: type`: no text style is 14px with a tight line height) | body-sm's other fields bound; line height 120% raw, marked `textStyle,lineHeight` | Figma carries tier-1 line heights only inside text styles. If the decision becomes a text style, the item switches to it |
| Menu | A submenu opens beside its trigger (`WithSubmenu` story) | `Menu.SubmenuTrigger` `open=true`; the nested popup is another `Menu.Content` | Placement is runtime |
| Menu | `Menu.Trigger` renders what it is given — a secondary Button in the stories | No `Menu.Trigger` component; the open example uses the Button | It has no styles of its own |
| Tooltip, Popover, PreviewCard | The arrow is placed per side (`.arrow[data-side]`, 8px out, 13px on left and right, rotated), and the popup's width is capped by `--available-width` | `side` is a variant with the arrow drawn there, pinned by constraints; widths hug the content | `side` is a prop, so a designer chooses it. The cap is runtime |
| Tooltip, Popover, PreviewCard, Menu, Select | Popups fade and scale in on open (`data-starting-style`) | Drawn open, at rest | Motion is not in the contract |
| Dialog, AlertDialog | The popup is fixed at the viewport's centre over a full-screen backdrop | The `Content` component alone; each page shows it centred over the backdrop | The viewport is the page's, not the component's |
| Dialog, AlertDialog, Toast | Widths are `min(28rem \| 26rem \| 24rem, 100vw − space/8)` | Fixed at 448, 416 and 384px | They narrow only on small screens |
| Toast | Toasts are created in code — `useToastManager().add({ title, description, type, actionProps })` — not written as JSX | `Toast.Root` with `type` as a variant (`none` = not given) and the texts as properties | Coming back, a toast frame becomes an `add()` call rather than an element |
| Toast | Swipe to dismiss, the stack limit (`data-limited`), enter and exit | Not mirrored | Runtime and motion |
| Combobox, Autocomplete | `.inputWithActions` adds `space/12` end padding only when a clear or trigger button renders | The padding stays when both booleans are off | One layer, one binding: padding cannot follow two booleans |
| Avatar | With no `fallback`, it draws the person glyph (`GlyphFallback` story) | Not mirrored as a state: the Figma set has `fallback` as text and `size` | The glyph state is "no fallback given", not a prop value a designer picks. `icon/person` exists on the Icons page for when it is modelled |

## Status, open points and uncertainties

What is known to be out of date, done by hand, or not checked. Clear an entry
when it is resolved.

- **Accordion named "Accordion1": fixed (2026-09-23, 16:40).** A live snapshot
  at 16:29 found the library's Accordion renamed to "Accordion1" (same key, same
  description, only the name), most likely by accident; not checked who or why.
  Renamed back by hand in Figma. A new live snapshot is byte-identical to the
  committed 16:03 one, and sync status is 39 of 39. Not checked: whether the
  library was published after the rename back, so files using it may still
  offer "Accordion1" until it is.
- **2026-09-23, a standalone Checkbox crashes in code, and it breaks a pattern.**
  `Checkbox` renders a `Field.Item`, which needs an enclosing `Field.Root`; on
  its own Base UI throws "FieldRootContext is missing". Every Checkbox story
  and the *Patterns › Sign-up form* story fail to render. Inside a
  `CheckboxGroup` it works. The Figma component is right (it shows the intended
  render); the code needs a fix on a `feature/*` branch. Until then prototypes
  put a single checkbox in a one-option `CheckboxGroup` (the workshop sign-up
  does).
- **2026-09-23, found by rebuilding the booking flow in Figma.**
  - **Accordion.Item panel padding: fixed in the library and published (2026-09-23).**
    The `content` frame had left/right `space/4` and top/bottom `space/2`, the
    CSS shorthand `padding: 0 space-2 space-4` read the wrong way round. Now top
    0, left/right `space/2`, bottom `space/4`, checked against Storybook (text
    at 8px, panel 58px). Files that use the library still have to accept the
    update (the Playground: not checked).
  - **Meter and Progress: the bar length is not a property.** `Meter.Indicator`
    is a fixed-width rectangle (42% by default) and an instance cannot resize
    it, so an instance shows the default fill whatever its `value` text says.
    Open: a variant per step, or a width bound to a number variable.
  - **Dialog.Content: its description says "portal, backdrop and popup"**, but
    the component is the popup only. A page draws the backdrop itself with
    `color/background/overlay` (as the rows above say). Open: fix the
    description, or add the backdrop.
  - **Not checked:** Collapsible was compared for the same padding mistake and
    matches; no other component's padding was compared. The parked "Same look"
    check on the Sync status page would do that.

- **2026-09-23, Inter and Roboto Mono.** Code now names both fonts
  (`src/fonts/`), so the font rows above are gone. Figma already used Inter and
  Roboto Mono, so no text in the library changes. The descriptions on the
  `font/sans` and `font/mono` variables still say "system font stack … stands
  in"; `npm run figma:tokens` now produces the new text, but the library was
  not updated because Figma was not connected. Run `figma-library-from-code` on the
  Typography collection to refresh them.
- **Not checked:** text widths in Storybook against Figma, component by
  component, after the switch. They should now match on any machine where
  Inter loads, but that was not measured.
- **Fallback:** until a font loads (`font-display: swap`), text shows in the
  system font and can shift slightly when it arrives. Only Latin and Latin
  Extended are bundled; Cyrillic, Greek and Vietnamese fall back to the system
  font.
