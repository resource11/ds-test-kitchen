# Layout vocabulary

> **Draft for review.** Nothing in code or Figma changes with this page. It names
> what is already there, so a layout can travel between Figma and code without
> guessing.

## The idea in one sentence

**Components are the furniture. Layout is how the furniture is arranged.**

A Button, a Card, an Accordion already know their own insides: that part is
solved. What travels badly is the arrangement *between* them: the badges in a
row, the card on the right, three cards side by side. Code already has rules for
this, but under many one-off names (`stack`, `stackTight`, `pageHeader`,
`settingText` are all the same shape). Figma has auto layout, but no names at
all ("Frame 1"). This page gives both sides the same six words.

## The six words

| Name | The sentence | Looks like | Booking flow example |
| --- | --- | --- | --- |
| **Stack** | Things on top of each other, a fixed gap apart | `▭`<br>`▭`<br>`▭` | Page header, the side panel, the main column |
| **Cluster** | Things in a row that wrap to the next line when space runs out | `▭ ▭ ▭`<br>`▭ ▭` | The badges, the nav links, Back + Continue |
| **Split** | Two groups in a row, pushed to either end | `▭        ▭` | The top bar: wordmark left, nav and avatar right |
| **Columns** | A main column that grows, and a side column of fixed width | `▭▭▭▭▭ ▭▭` | Tour page: content left, booking card right |
| **Grid** | Equal columns, same width each | `▭▭ ▭▭ ▭▭` | The three article cards, People + Language |
| **Page** | Top bar, then the content centred, never wider than a set width | `━━━━━━━`<br>`  ▭▭▭  ` | Every screen |

Every gap and padding is a space token (`space/2`, `space/4`, …). A layout never
has a number of its own: 47px is not a word in this vocabulary, `space/12` is.

## Page anatomy: how this codebase builds a screen

The words say *how* things are arranged; this says *which* arrangement a page
uses, with which gaps and text styles. It is read from the code
(`Patterns.module.css`'s app shell and the booking flow, the newest and
cleanest source) so a screen designed in Figma by these rules comes back into
code unchanged. Where the code disagrees with itself, it is listed at the end.

```
Page
├─ Top bar ········· Split · padding space/3 × space/6 · surface, bottom border   GAP: no component
│   ├─ wordmark (heading-md)
│   └─ Cluster · space/2: NavigationMenu.Link …, Avatar sm
└─ main ············ padding space/8 × space/6, content centred, max 1024px
    └─ Stack · space/6 ··· the page's sections, top to bottom
        ├─ Breadcrumb (if the page sits in a hierarchy)
        ├─ Page header ···· Stack · space/2
        │   ├─ title (heading-xl, content/default) · one per screen
        │   ├─ lead (body-md, content/muted)
        │   └─ Cluster · space/2: Badge sm … (optional)
        ├─ Columns · space/8 ··· main (Fill) + aside (320px), if there is a side panel
        │   ├─ Stack · space/6: sections
        │   └─ Stack · space/4: Card, Meter, Alert …
        └─ Section ········ Stack · space/4: title (heading-lg), then its content
```

| Part | Rule | From |
| --- | --- | --- |
| Screen width in Figma | 1280px; content max 1024px, centred | `.main`, `.mainInner` |
| Between sections | `space/6` | `.mainInner`, booking `.column` |
| Page header | title `heading-xl`, lead `body-md` muted, `space/2` apart | booking `.header` |
| Section | title `heading-lg`, content `space/4` below | `.sectionTitle`, `.stack` |
| Side panel | 320px, `space/8` from the main column | booking `.columns` |
| Forms | the `Form` component: fields `space/4` apart; related fields in a `Fieldset`; two short fields side by side in a Grid (`space/4`, each at least 240px); `FormActions` last, right-aligned, secondary before primary | `Form`, `.fieldGrid` |
| Cards | a Card owns its insides; cards side by side in a Grid | `Card` |
| Overlays | Dialog centred over a backdrop (`color/background/overlay`); Toast bottom-right, `space/4` from the edges | `Dialog`, `Toast` |

### Which text style for what

Every text is one whole style from `tokens/tier-2-usage/text-style.json`, never
a size set by hand. The file says what each is for:

| Style | For |
| --- | --- |
| `heading-xl` | The page title. One per screen |
| `heading-lg` | Section headings, and card titles that head a section |
| `heading-md` | Sub-section headings inside a section |
| `title-md` · `title-sm` | Titles of overlays (popover, toast) · titles in compact surfaces (alert) |
| `body-md` · `body-sm` | Default reading text · secondary text: descriptions, table cells |
| `label-xl` … `label-sm` | Control labels, from large buttons to badges |
| `caption` | Hints, helper text and errors under fields |
| `overline` · `code-sm` | Group labels in menus · inline code |

Colour of text: `content/default`, or `content/muted` for secondary text.
Content is neutral demo content: fictional names, `example.com` emails.

### Where the code disagrees with itself (open)

- **Page width:** `.page` (settings, sign-up) is 62rem (992px); `.mainInner`
  (app shell, booking) is 64rem (1024px). This page uses 1024px.
- **Pattern titles:** `.pageTitle`, `.pageLead` and `.sectionTitle` in
  `Patterns.module.css` set size and weight by hand instead of a whole text
  style, which CLAUDE.md does not allow; `validate` only checks components, so
  it never flagged them. The booking flow uses whole styles; this page follows
  it.
- **Cards in a row:** no rule for the gap yet (the booking flow's article row
  took `space/12` from a Figma frame).

## In Figma

A layout is an **auto-layout frame named after its word and its gap**:

| Word | Auto layout | Name the frame |
| --- | --- | --- |
| Stack | Vertical, gap bound to a space variable | `Stack · space/4` |
| Cluster | Horizontal, **wrap** on | `Cluster · space/2` |
| Split | Horizontal, **space between** | `Split` (optional gap: `Split · space/4`) |
| Columns | Horizontal: first child *Fill*, second child *Fixed* width | `Columns · space/8` |
| Grid | Horizontal, wrap on, every child the same *Fill* width (or Figma's grid auto layout) | `Grid · 3 · space/8` (the number is the columns) |
| Page | Vertical: top bar, then content at a fixed max width, centred | `Page` |

You may add a role after a dash when it helps you read the file:
`Stack · space/2 — Page header`. The part before the dash is what travels.

**No groups.** Figma groups have no auto layout and no gap to bind, so there is
nothing to read back.

## In code

Today each pattern has its own classes. The vocabulary maps them, it does not
rename them:

| Word | Existing classes |
| --- | --- |
| Stack | `stack` (space-4), `stackTight` (space-2), `pageHeader`, `settingText`, booking `header`, `column` |
| Cluster | `toolbarRow`, booking `cluster` |
| Split | `settingRow`, `tableFooter`, `topBar` |
| Columns | booking `columns` (main + 20rem aside) |
| Grid | `fieldGrid`, booking `articles` |
| Page | `page`, and `shell` → `main` → `mainInner` |

A frame coming back from Figma becomes the matching shape with its token gap,
reusing an existing class where one fits.

## The layout pass (what the skill does)

**When Claude builds in Figma,** every layout frame is named and bound as above.
You do not have to do anything.

**When a Figma screen comes back to code,** Claude reads each frame:

| If the frame is… | It is probably… |
| --- | --- |
| Vertical | Stack |
| Horizontal with wrap | Cluster, or Grid if the children are equal widths |
| Horizontal with space between | Split |
| Horizontal, one child Fill and one Fixed | Columns |
| The screen's outer frame with a centred, fixed-width child | Page |

A named frame is taken at its word. An unnamed one gets a **proposal**, shown to
you before anything is written: *"Frame 1 → Grid · 3, gap 47 → space/12 (48)?"*
You confirm or correct it, and Claude renames the frame in Figma, so the next
round trip needs no question.

## Open questions for review

1. **The names.** These follow common use; *Every Layout* (Heydon Pickering and
   Andy Bell) is the best-known vocabulary and calls *Columns* a **Sidebar** and
   *Page* a **Center**. Keep ours, or use theirs?
2. **Split** is new: the code uses it three times but has no name for it. Keep it
   as its own word, or treat it as a Cluster with space between?
3. **Should the words become real layout components later** (code first, then
   mirrored to Figma, maybe with Figma slots)? Not needed for the skill: names on
   frames are enough to start.
