import { Meta, Canvas } from "@storybook/addon-docs/blocks";
import * as DeprecationMigrationStories from "./deprecation-migration.stories";
import * as TableStories from "../src/components/table/table.stories";

<Meta title="Documentation/Deprecation Migration" />

# Carbon Components Deprecation Migration Guide

Several Carbon components have been recently deprecated. This guide provides migration paths to facilitate the transition to alternative patterns and components. Some deprecated components can be rebuilt using other existing Carbon components. Consult the specific migration documentation below for implementation details.

## Recommended Alternatives

The following section provides migration guidance for deprecated components that can't be either fully replicated or almost fully replicated using a composition of Carbon components:

- For `ButtonBar`, a combination of [`Button`](?path=/docs/button--docs) components wrapped in a layout component such as [`Box`](?path=/docs/box--docs).
- For `ButtonMinor` or `MinorButton` use any relevant [`Button`](?path=/docs/button--docs) with the desired `buttonType`.
- For `DuellingPicklist`, a combination of [`Select`](?path=/docs/select--docs), [`Checkbox`](?path=/docs/checkbox--docs) and [`Profile`](?path=/docs/profile--docs) components, as well as layout components such as [`Box`](?path=/docs/box--docs) can be used to achieve an alternative pattern. See the [Design System pattern here](https://zeroheight.com/35ee2cc26/v/latest/p/7505ab-profile-selector) for more information.
- For `Grid`, [`Box`](?path=/docs/box--docs) is recommended as the preferred alternative, `Box` has all of the necessary grid layout capabilities through its style properties.
- For `IconButton`, eventually [`Button`](?path=/docs/button--docs) with an [`Icon`](?path=/docs/icon--docs) passed as a child will be the preferred alternative.
- For `InlineInput`, using inputs which are placed next to each other horizontally is recommended as the preferred alternative - **however** ensure labels are clearly associated with the relevant input for accessibility.
- For `Pages`, [`StepFlow`](?path=/docs/step-flow--docs) is recommended as the preferred alternative.
- For `Pod`, [`Tile`](?path=/docs/tile--docs) is recommended as the preferred alternative. Any additional button's for save/edit functionality can be added via [`Button`](?path=/docs/button--docs) with an [`Icon`](?path=/docs/icon--docs) passed as a child.
- For `Toast`, [`Message`](?path=/docs/message--docs) is recommended as the preferred alternative.
- For `Tooltip`, using visible input hints are recommended as the preferred alternative. Relying on a tooltip can lead to discoverability issues, it's better to provide context directly which is instantly available.
- For `Hr`, [`Divider`](?path=/docs/divider--docs) is recommended as the preferred alternative.
- For `VerticalDivider`, [`Divider`](?path=/docs/divider--docs) is recommended as the preferred alternative.
- For `LoaderBar`, `LoaderStar` and `LoaderSpinner`: the new [`Loader`](?path=/docs/loader--docs) is recommended as the preferred alternative.
- For `TileSelect`, there is no direct replacement. For new work, use the most appropriate Fusion pattern for your product. For standard form choices, consider [`RadioButton`](?path=/docs/radio-button--docs) when users select one option, or [`Checkbox`](?path=/docs/checkbox--docs) when they can select multiple independent options.
- For `FlatTable`, using the new [`Table`](?path=/docs/table--docs) component is recommended as the preferred alternative.

## Alternative Patterns

The following sections provide migration guidance for deprecated components that can be either be fully replicated or almost fully replicated using a composition of other Carbon components:

- [Alert](#alert)
- [Confirm](#confirm)
- [Content](#content)
- [Detail](#detail)
- [Dismissible Box](#dismissible-box)
- [Grouped Character](#grouped-character)
- [Heading](#heading)
- [Number](#number)
- [Setting sRow](#settings-row)
- [Hr](#hr)
- [VerticalDivider](#vertical-divider)
- [Tile Select](#tile-select)
- [FlatTable](#flat-table)

## Alert

The `Alert` component can be replaced by a `Dialog` with a role of `alertdialog`. This approach maintains semantic accessibility whilst providing the same functionality.

```js
import Dialog from "carbon-react/lib/components/dialog";
```

<Canvas of={DeprecationMigrationStories.Alert} />

## Confirm

The `Confirm` component can be replaced by a `Dialog` with a role of `alertdialog` containing cancel and confirm `Button` components passed as children. 
A layout-based component such as `Box` can be used to position the `Button` components as required to match the original design.

Since the `Button` components are passed as children, complete control over the `Button` properties is now available, allowing for customisation of appearance and behaviour. 
It is recommended to use the `Button` component's `buttonType` and `destructive` properties to differentiate between primary and secondary actions.

```js
import Dialog from "carbon-react/lib/components/dialog";
import Button from "carbon-react/lib/components/button";
import Box from "carbon-react/lib/components/box";
```

<Canvas of={DeprecationMigrationStories.Confirm} />

## Content

The `Content` component can be replaced with the `Typography` component, `Typography` provides consistent styling and typography hierarchy.

```js
import Typography from "carbon-react/lib/components/typography";
```

<Canvas of={DeprecationMigrationStories.Content} />

## Detail


The `Detail` component can be replaced with the `Typography` component, `Typography` provides consistent styling and typography hierarchy.

<Canvas of={DeprecationMigrationStories.Detail} />

## Dismissible Box

A close replication of the `DismissibleBox` component can be achieved using the `Box` component for layout and structure. An `IconButton` can be used for the close functionality. 
Additional styling can be achieved using the `Box` component's style props. The `VerticalDivider` component can be used to separate content sections as needed.

> **Note**: Currently there is no way to add a border using `Box`, however if one is required a border can be added to a `<div>` element. 

```js
import Box from "carbon-react/lib/components/box";
import IconButton from "carbon-react/lib/components/icon-button";
import Icon from "carbon-react/lib/components/icon";
import VerticalDivider from "carbon-react/lib/components/vertical-divider";
import Typography from "carbon-react/lib/components/typography";
```

<Canvas of={DeprecationMigrationStories.DismissibleBox} />

## Grouped Character

The `GroupedCharacter` component can be replaced with the `Textbox` component.

It is **strongly recommended** to consider the user experience implications of real-time formatting. 
While automatic formatting can improve data entry consistency, overly restrictive input handling may interfere with users who paste formatted data, use assistive technologies, or have different input patterns. 
Instead, consider validating the pattern on blur or submission events whilst providing clear visual feedback and error messages that show the expected format.

```js
import Textbox from "carbon-react/lib/components/textbox";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
```

<Canvas of={DeprecationMigrationStories.GroupedCharacter} />

## Heading

The `Heading` component can be replaced with the `Typography` component with a `variant` of `"h1"`, `Typography` provides consistent styling and typography hierarchy.

The `Hr` component provides a horizontal rule below the heading.

```js
import Typography from "carbon-react/lib/components/typography";
import Hr from "carbon-react/lib/components/hr";
```

### Basic Heading

<Canvas of={DeprecationMigrationStories.Heading} />

### Heading with Pills

The `Heading` component can also be enhanced with `Pill` components for additional context or categorisation. Use the `Box` component to control layout and alignment of the heading and pills.

```js
import Box from "carbon-react/lib/components/box";
import Pill from "carbon-react/lib/components/pill";
```

<Canvas of={DeprecationMigrationStories.HeadingWithPills} />

## Number

The `Number` component can be replaced with the `Textbox` component.

It is **strongly recommended** to avoid restricting user input to only numeric values during typing, as this can lead to poor user experience and accessibility issues. 
Instead, validate the input on submission or blur events whilst providing clear error messages.

```js
import Textbox from "carbon-react/lib/components/textbox";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
```

<Canvas of={DeprecationMigrationStories.Number} />

## Settings Row

The `SettingsRow` component can be replaced with a combination of `Box`, `Hr`, and `Typography` components. Specific style properties applied to the `Box` component achieve a similar layout structure. 
The layout uses a two-column approach with the title and description in the first column and the settings content in the second column.

```js
import Box from "carbon-react/lib/components/box";
import Hr from "carbon-react/lib/components/hr";
import Typography from "carbon-react/lib/components/typography";
```

### Basic Settings Row

<Canvas of={DeprecationMigrationStories.SettingsRow} />

### Settings Row with Multiple Heading Levels

The `variant` prop on the `Typography` component can be used to render heading levels from `"h1"` - `"h5"`, this allows for a consistent visual hierarchy whilst maintaining semantic structure.

<Canvas of={DeprecationMigrationStories.SettingsRowHeadingLevels} />

## Hr

The `Hr` component can be replaced by a `Divider` with type `horizontal`. The `Divider` component will provide consistent styling while maintaining the same functionality.

<Canvas of={DeprecationMigrationStories.Hr} />

## Vertical Divider

The `VerticalDivider` component can be replaced by a `Divider`. The `Divider` component will provide consistent styling while maintaining the same functionality.

<Canvas of={DeprecationMigrationStories.VerticalDivider} />

## Tile Select

`TileSelect` and `TileSelectGroup` are deprecated. The components have low adoption, their two known product implementations do not use the pattern as intended, and the pattern has not shown a good UX fit. Their overlap with existing Fusion patterns also creates unnecessary duplication and confusion. Carbon Tile Select is primarily a radio-style control, while the potentially overlapping Fusion pattern is more checkbox-like; they are not interchangeable.

### Migration

- There is no prescribed like-for-like replacement. Assess the user need and use the approved product-specific Fusion pattern rather than carrying the Carbon pattern forward.
- If the need is a conventional form choice, use `RadioButtonGroup` and `RadioButton` for mutually exclusive choices, or `CheckboxGroup` and `Checkbox` for independent choices. This is semantic guidance, not a replacement for Tile Select's card-like treatment.
- Keep the existing Report implementation unchanged until its approved replacement is available. Do not introduce Tile Select into new Report work.
- Migrate Client Management as part of its planned redesign; the redesign should use the approved Fusion pattern rather than a like-for-like Tile Select replacement.

## Flat Table

This guide is the canonical reference for replacing the legacy `FlatTable`
family with `Table`. It separates direct replacements from changes that need
new composition, state management, or product decisions.

Do not remove a legacy prop without checking its entry in the migration matrix.
Where there is no direct equivalent, preserve the existing behaviour until the
replacement has been agreed and tested.

### Migration statuses

| Status                   | Meaning                                                                         |
| ------------------------ | ------------------------------------------------------------------------------- |
| **Direct**               | Rename the component or prop without changing its responsibility.               |
| **Value mapping**        | An equivalent exists, but the accepted values have changed.                     |
| **Structural**           | The behaviour exists but has moved to a different component or composition.     |
| **Approximate**          | A similar API exists, but visual or behavioural parity must be checked.         |
| **No direct equivalent** | Make an explicit product or implementation decision; do not silently remove it. |

### Component matrix

| Legacy component         | Replacement                       | Status                   | Migration notes                                                                                 |
| ------------------------ | --------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| `FlatTable`              | `Table`                           | **Direct**               | Review the root props below.                                                                    |
| `FlatTableHead`          | `TableHead`                       | **Direct**               | Preserve the existing row and header-cell structure.                                            |
| `FlatTableBody`          | `TableBody`                       | **Direct**               | Preserve row order and controlled state.                                                        |
| `FlatTableBodyDraggable` | `TableBody`                       | **Structural**           | Set `isDraggable` on `Table` and move `getOrder` to `TableBody`.                                |
| `FlatTableRow`           | `TableRow`                        | **Value mapping**        | Rename row-state props and provide a required string `id`.                                      |
| `FlatTableHeader`        | `TableHeader`                     | **Value mapping**        | Use React's `colSpan` and `rowSpan` casing. Sorting is configured directly on this component.   |
| `FlatTableCell`          | `TableCell`                       | **Value mapping**        | Use React's `colSpan` and `rowSpan` casing. Review width, truncation and spacing.               |
| `FlatTableRowHeader`     | `<TableCell as="th" scope="row">` | **Structural**           | Preserve `<th scope="row">` semantics while agreeing the required styling and sticky behaviour. |
| `FlatTableCheckbox`      | `Checkbox` composed inside a cell | **Structural**           | Put the checkbox in `TableCell` or `TableHeader` and control `TableRow.isSelected` separately.  |
| `Sort`                   | `TableHeader` sorting props       | **Structural**           | Move `sortType` and the callback onto `TableHeader`; map `none` to `unsorted`.                  |

### Prop matrix

#### For FlatTable

| Legacy prop                           | Replacement                                      | Status                   | Migration notes                                                                                                                                                                                     |
| ------------------------------------- | ------------------------------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                            | `children`                                       | **Direct**               | Replace the child component family as described above.                                                                                                                                              |
| `isZebra`                             | `isZebraStriped`                                 | **Direct**               | Behaviour remains table-level.                                                                                                                                                                      |
| `size="compact"`                      | `size="extra-small"`                             | **Value mapping**        | Other values retain their hyphenated names; map `extraLarge` to `extra-large`.                                                                                                                      |
| `colorTheme`                          | `variant`                                        | **Approximate**          | `dark` is closest to `prominent`; `transparent-white` is closest to `subtle-white`; `transparent-base` is closest to `subtle-grey`. Visually review every mapping. `light` has no exact equivalent. |
| `hasStickyHead`                       | `stickyRow="header"`                             | **Value mapping**        | If both legacy sticky props are set, use `stickyRow="both"`.                                                                                                                                        |
| `hasStickyFooter`                     | `stickyRow="footer"`                             | **Approximate**          | Supported technically, but reconsider sticky footers because nested scrolling can create accessibility issues.                                                                                      |
| `width` and `overflowX`               | `maxWidth`                                       | **Approximate**          | `maxWidth` enables native horizontal overflow when the table is wider than its wrapper; verify the containing layout.                                                                               |
| `footer`                              | `pagination`, `TableFoot`, or external content   | **Structural**           | Use `pagination` for a `Pager`, `TableFoot` for tabular summaries, otherwise render the content outside `Table`.                                                                                    |
| `caption`                             | Native `<caption>` child                         | **Structural**           | Preserve the accessible table name. Apply visually-hidden styling when the caption should not be visible.                                                                                           |
| `ariaDescribedby`                     | Accessible description associated with the table | **No direct equivalent** | Do not discard the relationship. The new API may need to expose `aria-describedby` before migration.                                                                                                |
| `title`                               | Accessible naming or surrounding heading         | **No direct equivalent** | Determine whether the legacy value was being used as a tooltip, identifier, or accessible name.                                                                                                     |
| `height`                              | `maxHeight` or containing layout                  | **Approximate**          | `maxHeight` caps the scroll container rather than fixing its height. Convert numeric pixels to strings such as `"240px"`; use a parent for a fixed height. |
| `minHeight`                           | Containing layout                                | **No direct equivalent** | Move minimum-height constraints to an appropriate parent. |
| `hasMaxHeight`                        | `maxHeight`                                      | **Approximate**          | Replace the boolean with an explicit CSS limit. `maxHeight="100%"` needs a containing layout with a defined height; check the resulting scrolling. |
| `hasOuterVerticalBorders`             | `outerBorders`                                   | **Approximate**          | `false` is closest to `outerBorders="none"` for `subtle-white` and `subtle-grey`. `prominent` always has an outer border; review the full border treatment. |
| `bottomBorderRadius`                  | Built-in Table roundness                         | **No direct equivalent** | The new table owns its corner styling.                                                                                                                                                              |
| Styled-system margin props            | Parent layout component                          | **Structural**           | Move external spacing to the component that owns the surrounding layout.                                                                                                                            |

#### For FlatTableRow

| Legacy prop             | Replacement                          | Status                   | Migration notes                                                                                                                                      |
| ----------------------- | ------------------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------                                                   |
| `id?: string \| number` | `id: string`                         | **Value mapping**        | Every new row requires a stable, unique string ID. Do not use the array index.                                                                       |
| `selected`              | `isSelected`                         | **Direct**               | Selection behaviour remains controlled by the consumer.                                                                                              |
| `highlighted`           | No direct equivalent                 | **No direct equivalent** | Agree an accessible replacement for any required highlight state; `TableRow` does not provide one.                                                   |
| `expanded`              | `isExpanded` and `onExpansionChange` | **Structural**           | Omit `isExpanded` for initially collapsed, uncontrolled rows. When supplied, it is controlled: update application state through `onExpansionChange`. |
| `subRows`               | `subRows`                            | **Direct**               | Replace nested row and cell components too. Only one child-row level is supported.                                                                   |
| `expandable`            | Presence of `subRows`                | **Structural**           | The new row becomes expandable when `subRows` is supplied.                                                                                           |
| `expandableArea`        | First-cell expand control            | **No direct equivalent** | Whole-row expansion is intentionally not carried forward.                                                                                            |
| `horizontalBorderSize`  | `borderThickness`                    | **Value mapping**        | The values `small`, `medium`, and `large` are retained.                                                                                              |
| `horizontalBorderColor` | Table border tokens                  | **No direct equivalent** | Do not reproduce arbitrary colour overrides without design review.                                                                                   |
| `bgColor`               | Table variants and row states        | **No direct equivalent** | Use supported row states rather than arbitrary background colours.                                                                                   |
| `onClick`               | Interactive control within a cell    | **Structural**           | Avoid clickable rows; place the action in a button or link with an accessible name.                                                                  |

#### For Header and body cells

| Legacy prop                 | Replacement                                                     | Status                   | Migration notes                                                                                                  |
| --------------------------- | --------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `align`                     | `align`                                                         | **Direct**               | Preserve meaningful alignment; generally use left for text and right for calculated numbers.                     |
| `colspan`                   | `colSpan`                                                       | **Value mapping**        | Pass a number using React's DOM prop casing.                                                                     |
| `rowspan`                   | `rowSpan`                                                       | **Value mapping**        | Pass a number using React's DOM prop casing.                                                                     |
| Header `width?: number`     | `TableHeader width?: string`                                    | **Value mapping**        | Convert pixel numbers to strings such as `"160px"`.                                                              |
| Cell `width`                | Header width or table layout                                    | **Structural**           | Define the column width on its header where possible.                                                            |
| `verticalBorder`            | Cell `borderThickness` or table-level `verticalBorderThickness` | **Approximate**          | Decide whether the override belongs to one boundary or the whole table.                                          |
| `verticalBorderColor`       | Table border tokens                                             | **No direct equivalent** | Custom border colours are not carried forward.                                                                   |
| `truncate` and `title`      | Wrapping content                                                | **No direct equivalent** | The new guidance favours wrapping so the full value remains available.                                           |
| Styled-system padding props | Table `size`                                                    | **Approximate**          | Prefer the standard size scale. Escalate genuine custom-padding requirements rather than silently dropping them. |

### Basic table

Replace the component imports and give every row a stable string ID.

#### Before

```tsx
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "carbon-react/lib/components/flat-table";

<FlatTable caption="Products">
  <FlatTableHead>
    <FlatTableRow>
      <FlatTableHeader>Product</FlatTableHeader>
      <FlatTableHeader>Price</FlatTableHeader>
    </FlatTableRow>
  </FlatTableHead>
  <FlatTableBody>
    <FlatTableRow id="product-1">
      <FlatTableCell>Product A</FlatTableCell>
      <FlatTableCell align="right">£12.00</FlatTableCell>
    </FlatTableRow>
  </FlatTableBody>
</FlatTable>;
```

#### After

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-react/lib/components/table";

<Table>
  <caption>Products</caption>
  <TableHead>
    <TableRow id="products-header">
      <TableHeader>Product</TableHeader>
      <TableHeader align="right">Price</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow id="product-1">
      <TableCell>Product A</TableCell>
      <TableCell align="right">£12.00</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

### Appearance and sizing

Use the standard `Table` size, variant and border props instead of recreating
legacy styles with custom colours or styled-system spacing.

```tsx
<Table
  size="medium"
  variant="subtle-white"
  isZebraStriped
  outerBorders="small"
  horizontalBorderThickness="small"
  verticalBorderThickness="small"
>
  {/* table content */}
</Table>
```

Treat `colorTheme` mappings as starting points, not guaranteed visual matches.
The new variants use different design tokens and interaction states.

### Selection

`TableRow.isSelected` supplies the visual row state. The consumer still owns
the selected IDs and the `Checkbox` state. A row is selected through its
checkbox rather than by making the whole row clickable.

```tsx
<TableRow id={row.id} isSelected={selectedIds.includes(row.id)}>
  <TableCell>
    <Checkbox
      aria-label={`Select ${row.product}`}
      checked={selectedIds.includes(row.id)}
      onChange={() => toggleSelected(row.id)}
    />
  </TableCell>
  <TableCell>{row.product}</TableCell>
</TableRow>
```

Batch actions and select-all behaviour remain application concerns. Ensure the
checkbox and row state are updated from the same source of truth.

<Canvas of={TableStories.Selectable} />

### Sorting

Remove the standalone `Sort` child and configure `TableHeader` directly.

#### Before

```tsx
<FlatTableHeader>
  <Sort sortType={sortType} onClick={handleSort}>
    Product
  </Sort>
</FlatTableHeader>
```

#### After

```tsx
<TableHeader
  sortType={sortType === undefined || sortType === "none" ? "unsorted" : sortType}
  onSort={handleSort}
>
  Product
</TableHeader>
```

Only one column should be actively sorted. Keep the row data, active column and
direction in controlled application state. Activating another header should
clear the previous header's direction.

Supply both `sortType` and `onSort` to make a header sortable. The header sets
`aria-sort` automatically, and the sort button uses the table's header styling.
Use `sortAriaRoleDescription` when a custom description is required.

### Expandable rows

Supplying `subRows` makes a new `TableRow` expandable. The first cell receives
the expand control automatically, so remove `expandable` and
`expandableArea`. Whole-row activation is not supported.

Omit `isExpanded` to let the row manage its own expansion state, initially
collapsed. For controlled expansion, supply both `isExpanded` and
`onExpansionChange` and update the state when the callback fires:

```tsx
<TableRow
  id="product-a"
  isExpanded={expanded}
  onExpansionChange={setExpanded}
  subRows={
    <TableRow id="product-a-child">
      <TableCell>Product A1</TableCell>
      <TableCell>Child data</TableCell>
    </TableRow>
  }
>
  <TableCell>Product A</TableCell>
  <TableCell>Parent data</TableCell>
</TableRow>
```

Use only one level of child rows. Verify that **Enter** and **Space** operate
the first-cell control and that collapsed child content cannot receive focus.
The first cell becomes a disclosure button, so keep other buttons, links, and
inputs in separate cells to avoid nesting interactive controls.

<Canvas of={TableStories.Expandable} />

### Draggable rows

Move draggable configuration from the body component to `Table`, while keeping
the order callback on `TableBody`.

#### Before

```tsx
<FlatTable>
  <FlatTableBodyDraggable getOrder={handleOrderChange}>
    {rows.map((row) => (
      <FlatTableRow id={row.id} key={row.id}>
        {/* cells */}
      </FlatTableRow>
    ))}
  </FlatTableBodyDraggable>
</FlatTable>
```

#### After

```tsx
<Table isDraggable>
  <TableBody getOrder={handleOrderChange}>
    {rows.map((row) => (
      <TableRow id={row.id} key={row.id}>
        {/* cells */}
      </TableRow>
    ))}
  </TableBody>
</Table>
```

Use the order returned by `getOrder` to update the same canonical row array
used by sorting and move actions. Dragging must also have keyboard-accessible
alternatives such as **Move up**, **Move down**, **Move to top**, and
**Move to bottom**.

<Canvas of={TableStories.Draggable} />

### Sticky rows

Map the legacy boolean props onto `stickyRow`:

```tsx
// hasStickyHead
<Table maxHeight="240px" stickyRow="header">{/* content */}</Table>

// hasStickyFooter
<Table maxHeight="240px" stickyRow="footer">{/* content */}</Table>

// both legacy props
<Table maxHeight="240px" stickyRow="both">{/* content */}</Table>
```

`maxHeight` constrains the table's scroll container and enables native vertical
scrolling when its content exceeds the limit. It accepts a CSS string, not a
number. Unlike legacy sticky tables, `stickyRow` does not supply a default
height; choose an explicit limit when a vertically scrolling table is needed.

When either axis overflows, the scroll container becomes keyboard focusable.
The table also scrolls focused body controls into view when sticky headers or
footers would obscure them. Verify this with the controls used by your table.

Prefer a sticky header only and reconsider sticky footers because nested
scrolling regions can be difficult for keyboard and screen-reader users.

<Canvas of={TableStories.StickyRows} />

### Sticky columns

Legacy sticky columns are inferred from `FlatTableRowHeader` and can include
multiple cells before or after it. The new component explicitly supports only
the first column, last column, or one on each side:

```tsx
<Table maxWidth="600px" stickyColumn="both">
  {/* content wider than 600px */}
</Table>
```

This is not a mechanical replacement. Confirm which edge columns are essential
and remove additional locked columns. Horizontal scrolling uses the browser's
native scrollbar and applies to the whole table.

<Canvas of={TableStories.StickyColumns} />

### Footers and pagination

Classify the old `footer` content before moving it:

- A `Pager` belongs in `Table.pagination`.
- A tabular total or summary belongs in `TableFoot` as rows and cells.
- Controls unrelated to pagination should remain outside `Table` in the
  surrounding layout.

```tsx
<Table pagination={<Pager {...pagerProps} />}>
  <TableHead>{/* headers */}</TableHead>
  <TableBody>{/* data */}</TableBody>
  <TableFoot>
    <TableRow id="table-summary">
      <TableCell>Total</TableCell>
      <TableCell align="right">£120.00</TableCell>
    </TableRow>
  </TableFoot>
</Table>
```

Pagination should update only the table data while preserving the current
sorting, filtering and table settings.

### Row headers

`FlatTableRowHeader` has no direct new component. The `TableCell` component supports row headers via `<TableCell as="th" scope="row">`.

Sticky row headers also need separate review because the new `stickyColumn` API operates on the first
or last column rather than on a row-header component.

### Unsupported and changed behaviour

These cases require manual review:

- Arbitrary row background and border colours.
- Per-cell styled-system padding.
- Truncated cells and tooltip titles.
- Clickable or focusable whole rows.
- Whole-row expansion.
- More than one level of expandable children.
- Multiple sticky columns on either side.
- `FlatTableRowHeader` semantics and styling.
- Fixed-height and minimum-height layouts, and percentage `maxHeight` limits.
- Custom bottom corner radii.
- Legacy `data-role` or `data-element` selectors used by tests or integrations.

Search application tests and styles for legacy selectors before removing the
old components. A successful TypeScript build does not prove visual,
interaction or accessibility parity.

### Verification checklist

After migrating each table:

- Confirm every row has a stable, unique string ID.
- Confirm the table retains an accessible name and any description.
- Check header and row-header semantics with accessibility tooling.
- Test sorting, selection, expansion and row actions using only the keyboard.
- For draggable rows, test both pointer dragging and the alternative move
  actions against the same row state.
- Check selected, highlighted, hover and focus contrast.
- Test horizontal scrolling at narrow widths and at browser zoom.
- Test vertical overflow with `maxHeight`, keyboard scrolling, and focus
  visibility beneath sticky headers and above sticky footers.
- Check sticky cells with `rowSpan` and `colSpan` where used.
- Confirm pagination preserves sorting, filters and page-size state.
- Compare all supported sizes and variants visually.
- Run focused unit, interaction and accessibility tests.
