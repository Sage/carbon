# Tile

Tiles are containers for static content such as text, and don't contain controls.

**Category:** UI presentation

## Quick Start

```javascript
import {
  Tile,
  TileContent,
  TileFooter,
  FlexTileContainer,
  FlexTileCell,
} from "carbon-react/lib/components/tile";
```

## Examples

### Default

By default, the Tile component will have a horizontal layout.

See: `examples/DefaultStory.md`

### Roundness variants for corners

Control the border-radius of the tile using the `roundness` prop. `large` produces a more pronounced curve; `small` (default) keeps corners subtly rounded.

See: `examples/LargeRoundness.md`

See: `examples/SmallRoundness.md`

### Vertical

The Tile component can be also have a vertical layout.

See: `examples/Vertical.md`

### With TileFooter

Place a `TileFooter` as the last child to add a visually separated footer area, ideal for actions or summary information.

See: `examples/WithTileFooter.md`

### With TileHeader

Place a `TileHeader` as the first child to add a visually separated header area, suitable for titles or toolbar-style content.

See: `examples/WithTileHeader.md`

### With Button in TileHeader

Add an action button directly inside `TileHeader` to give users quick access to tile-level actions without cluttering the content area.

See: `examples/WithButtonInTileHeader.md`

### With custom widths

The Tile component can also have a custom `width` which accepts either numbers or strings: any decimal between 0 and 1.0
will be converted into a percentage, any number greater will be be treated as pixels and any valid CSS string will also work.
Any child wrapped by a Tile component can be passed an optional `width` prop if its interface supports it.

See: `examples/CustomWidths.md`

### With custom heights

The Tile component can also have a custom `height` which accepts either numbers or strings: any decimal between 0 and 1.0
will be converted into a percentage, any number greater will be be treated as pixels and any valid CSS string will also work.
Any child wrapped by a Tile component can be passed an optional `height` prop if its interface supports it.

See: `examples/CustomHeights.md`

### Active Tile

Set `isActive` to visually highlight the tile, indicating it is the currently selected or focused item in a set.

See: `examples/Active.md`

### Grey variant

Set `variant="grey"` for a muted background. Use when the tile should be de-emphasised relative to surrounding content.

See: `examples/Grey.md`

### Custom borders

You can set the `borderVariant` property to alter the border colour as well as the border width with the `borderWidth` property.

See: `examples/CustomBorders.md`

### With inline styling

The Tile component can also have inline styling applied to the content.

See: `examples/WithInline.md`

### With different padding and margin

Use the spacing props (`p`, `m`, and their directional variants) on `Tile` and its children to control internal padding and external spacing.

See: `examples/WithDifferentPaddingAndMargin.md`

### With Definition List

The Definition List component should only be used inside of the Tile component. The purpose of the Definition List component is to mimic
the same tags used in HTML5 but instead they are React elements.

Please note that Dl, Dd and Dt use our common spacing props.

See: `examples/WithDefinitionListDefault.md`

### With Definition List and custom `StyledDtDiv` width

Providing a number value to the `w` prop, sets the width of the `<Dt />` element as a percentage. The remaining percentage is then assigned to `<Dd />` to occupy the available space.

See: `examples/WithDefinitionListAndCustomWidth.md`

### With Definition List with custom text alignment

In this example `dtTextAlign` has been provided the string 'left' and `ddTextAlign` has been provided the string 'right'.

See: `examples/WithDefinitionListAndCustomTextAlignment.md`

### With Definition List and ActionPopover and Icon support

Combines a `DefinitionList` inside a tile with an `ActionPopover` and `Icon` in the header, showing how richer interactive layouts can be composed.

See: `examples/WithDefinitionListAndActionPopoverAndIconSupport.md`

### With Accordion and Definition List

Nests an `Accordion` inside the tile alongside a `DefinitionList`, allowing content to be progressively disclosed within the tile.

See: `examples/WithAccordion.md`

### With Accordion and TileFooter

Combines an expandable `Accordion` with a `TileFooter`, enabling collapsible detail sections within a structured tile layout.

See: `examples/WithAccordionAndTileFooter.md`

### Responsive Tile

To make the content of a tile responsive, use `FlexTileCell` components inside a `FlexTileContainer`.
The content of a `FlexTileCell` can be what you want.

When the size of the screen is too small to display all the cells on one line, some will be automatically wrapped to a new line.
If you add a `FlexTileDivider` in each cell, a divider will appear between the lines.

See: `examples/ResponsiveDefaultStory.md`

### Responsive Tile with custom gaps

Use the `columnGap` and `rowGap` props on `FlexTileContainer` to control the spacing between cells independently.

See: `examples/CustomGaps.md`

### Responsive Tile with fixed width for cells

With `flexGrow={0}`, the width of each cell will be defined by `flexBasis`. It will not grow or shrink according to the remaining space.

See: `examples/FixedContainers.md`

### Responsive Tile with flex width for cells

If `flexGrow` is **not** `0`, the width (= `flexBasis`) of each cell will be a min-width. It will grow to fill the remaining space and shrink until reaching that min-width.
You can use `maxWidth` to constrain the growth.

See: `examples/FlexContainers.md`

### Responsive Tile with proportionate widths

Responsive cells can be set so that they have a proportionate width to other cells in the same tile.

Use this values on `flexGrow`:

- 1: The remaining space in the container will be distributed equally to all cells.
- 2: That cell will try to take up twice as much of the space than the others.
- 3: That cell will try to take up thrice as much of the space than the others.
- ...

See: `examples/ProportionateWidths.md`

### Responsive Tile with align content

Use `justifyContent` to place your content inside the width allocated to the cell.

See: `examples/Align.md`

### Responsive Tile with overflow visible

Use the `overflow` prop to override the overflow styling, it is set to `"hidden"` by default. It is not 
recommended to override this styling if you are rendering `FlexTileDivider` components.

See: `examples/ResponsiveWithOverflowVisibleStory.md`

### Highlight variants

Setting the `highlightVariant` prop will add a highlight to the Tile on the left border.

#### Gradient

Applies a gradient highlight on the left border.

See: `examples/HighlightVariantGradientStory.md`

#### Success

Applies a green success-state highlight on the left border.

See: `examples/HighlightVariantSuccessStory.md`

#### Neutral

Applies a grey neutral-state highlight on the left border.

See: `examples/HighlightVariantNeutralStory.md`

#### Error

Applies a red error-state highlight on the left border.

See: `examples/HighlightVariantErrorStory.md`

#### Warning

Applies an amber warning-state highlight on the left border.

See: `examples/HighlightVariantWarningStory.md`

#### Info

Applies a blue informational highlight on the left border.

See: `examples/HighlightVariantInfoStory.md`

#### Important

Applies an orange important-state highlight on the left border.

See: `examples/HighlightVariantImportantStory.md`

## Props

### Tile

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| borderVariant | "default" \| "info" \| "negative" \| "positive" \| "selected" \| "caution" \| undefined | No |  | Sets the border variant that should be used |  |
| borderWidth | "borderWidth100" \| "borderWidth200" \| "borderWidth300" \| "borderWidth400" \| "borderWidth600" \| "borderWidth000" \| undefined | No |  | Sets the border width by using these design tokens |  |
| children | React.ReactNode | No |  | The content to render within the tile. Each child will be wrapped with a TileContent wrapper, which allows any individual child component to take a percentage-based width prop, dictating the percentage of the tile width it will take up. Width will have no effect on a child component if the tile orientation is set to 'vertical'. |  |
| height | string \| number \| undefined | No |  | Set a percentage-based height for the whole Tile component, relative to its parent. |  |
| highlightVariant | string \| undefined | No |  | Sets the highlight variant |  |
| orientation | "vertical" \| "horizontal" \| undefined | No |  | The orientation of the tile - set to either horizontal or vertical | "horizontal" |
| roundness | "small" \| "large" \| "default" \| undefined | No |  | Sets the level of roundness of the corners, "default" is 8px, "large" is 16px and "small" is 4px | "default" |
| variant | "transparent" \| "grey" \| "tile" \| "active" \| undefined | No |  | Sets the theme of the tile | "tile" |
| width | string \| number \| undefined | No |  | Set a percentage-based width for the whole Tile component, relative to its parent. If unset or zero, this will default to 100%. | "100%" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### TileFooter

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  |
| variant | "default" \| "black" \| "transparent" \| "grey" \| undefined | No |  | set which background color variant should be used |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### TileHeader

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  |
| variant | "default" \| "black" \| "transparent" \| "grey" \| undefined | No |  | set which background color variant should be used |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Dl

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | prop to render children. |  |
| asSingleColumn | boolean \| undefined | No |  | Render the DefinitionList as a single column | false |
| ddTextAlign | ElementAlignment \| undefined | No |  | This string will specify the text align styling of the `<dd></dd>`. | "left" |
| dtTextAlign | ElementAlignment \| undefined | No |  | This string will specify the text align styling of the `<dt></dt>`. | "right" |
| id | string \| undefined | No |  | HTML id attribute of the input |  |
| w | number \| undefined | No |  | This value will specify the width of the `StyledDtDiv` as a percentage. The remaining space will be taken up by the `StyledDdDiv`. This prop has no effect when `asSingleColumn` is set. | 50 |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Dd

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Prop for what will render in the `<Dd></Dd>` tags |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Dt

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Prop for what will render in the `<Dd></Dd>` tags |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### FlexTileContainer

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The child elements of FlexTileContainer need to be FlexTileCell components. |  |
| columnGap | Gap \| undefined | No |  | Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." | 2 |

### FlexTileCell

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The content to render within the responsive cell. |  |
| as | keyof JSX.IntrinsicElements \| React.ComponentType<any> \| undefined | No |  |  |  |
| backgroundColor | string \| undefined | No |  | Set the backgroundColor attribute of the Box component |  |
| bg | string \| undefined | No |  | Set the bg attribute of the Box component |  |
| borderRadius | BorderRadiusType \| undefined | No |  | Design Token for Border Radius. Note: please check that the border radius design token you are using is compatible with the Box component. |  |
| boxShadow | BoxShadowsType \| undefined | No |  | Design Token for Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Box component. |  |
| boxSizing | BoxSizing \| undefined | No |  | Set the box-sizing attribute of the Box component |  |
| className | string \| undefined | No |  |  |  |
| color | string \| undefined | No |  | Set the color attribute of the Box component |  |
| columnGap | Gap \| undefined | No |  | Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| gap | Gap \| undefined | No |  | Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| hidden | boolean \| undefined | No |  | Whether the component is hidden from view. In this state, the component will not be visible to users but will remain in the HTML document |  |
| id | string \| undefined | No |  | Set the ID attribute of the Box component |  |
| opacity | string \| number \| undefined | No |  | Set the opacity attribute of the Box component |  |
| overflowWrap | OverflowWrap \| undefined | No |  | String to set Box content break strategy. Note "anywhere" is not supported in Safari |  |
| role | string \| undefined | No |  | Set the Role attribute of the Box component |  |
| rowGap | Gap \| undefined | No |  | Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| scrollVariant | ScrollVariant \| undefined | No |  | Scroll styling attribute |  |
| tabIndex | number \| undefined | No |  |  |  |
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-atomic | "true" \| "false" \| undefined | No |  | Indicates whether AT will announce all, or only parts of, the changed region |  |
| aria-hidden | "true" \| "false" \| undefined | No |  | Set the container to be hidden from screen readers |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  | Make the container an aria-live region |  |
