# TileSelect

Tile Select is an input visualized as a single or grouped set of tiles. It behaves like a `radio` or a `checkbox` depending on the mode it operates in.

**Category:** Inputs

## Quick Start

To use this component, import the `TileSelect` and `TileSelectGroup` if you want to have `TileSelects` grouped.

```javascript
import {
  TileSelectGroup,
  TileSelect,
} from "carbon-react/lib/components/tile-select";
```

## Examples

### Single Select

By default, when grouped with the `TileSelectGroup`, this component operates in single select mode and `TileSelect` inputs are of type `radio`.

In this mode all input props like `onChange`, `onBlur`, `name` and currently selected `value` are meant to be passed on the `TileSelectGroup`.
These props are then internally distributed on each of the `TileSelects` making the whole composed group act like a single form field.

See: `examples/Default.md`

#### Custom action button

It is possible to overide the default action button via the `customActionButton` prop. It is a render prop which allows
access to the `onClick` functionality.

See: `examples/WithCustomActionButton.md`

#### Action button adornment

It is possible to render an additional adornment next to the action button through the `actionButtonAdornment` prop.

See: `examples/WithActionButtonAdornment.md`

### Multi select

To enable multi select mode on a `TileSelectGroup` `multiSelect` boolean prop has to be passed as `true`, `TileSelects` in this mode are of type `checkbox`.

In multi select mode all input props like `onChange`, `onBlur`, `name`, `value` and `checked` are meant to be passed individually on each of the `TileSelects` instead of on the `TileSelectGroup`.

In this mode `TileSelectGroup` serves only a visual purpose - it only renders `legend` and `description` props and applies spacing to each of the `TileSelects`

See: `examples/MultiSelect.md`

### Single tile

`TileSelect` can be also used as a single component - it operates as a type `checkbox` by default.

Same as in multi select example grouped by `TileSelectGroup`, `onChange`, `onBlur`, `name`, `value` and `checked` are meant to be passed directly on the `TileSelect`.

See: `examples/SingleTile.md`

### With a footer

To render a `footer` pass anything renderable to the prop like in the example below.

See: `examples/WithAFooter.md`

### With a prefix adornment

To render a prefixed adornment in the top left corner of the `TileSelect` you can pass any node in via the `prefixAdornment` prop.

See: `examples/WithAPrefixAdornment.md`

### With additional information

It is possible to render an additional row of information or content between the `title` and the `description` by passing in
any node to the `additionalInformation` prop.

See: `examples/WithAdditionalInformation.md`

### With accordion footer

It is possible to render an `Accordion` footer for the `TileSelect`. Pass a desired layout to the `accordionContent` prop
and a use the `accordionControl` render prop to supply the control for the expanded state of the accordion by toggling the
`accordionExpanded` prop.

To ensure proper screen reader behaviour, please pass the `aria-controls` and `aria-expanded` props to the control for the 
Accordion as shown in the example.

See: `examples/WithAccordionFooter.md`

### With custom spacing

The `TileSelect` and `TileSelectGroup` components support the custom margin spacing (see prop table below). The modifiers
support being passed either a number between 1 and 8 that is then multiplied by `8px` or any valid CSS string.

See: `examples/WithCustomSpacing.md`

## Props

### TileSelect

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| accordionContent | React.ReactNode | No |  | Components to render in the TileSelect Accordion |  |
| accordionControl | ((controlId: string, contentId: string) => JSX.Element) \| undefined | No |  | Callback to toggle expanded state of TileSelect Accordion |  |
| accordionExpanded | boolean \| undefined | No |  | Flag to control the open state of TileSelect Accordion |  |
| actionButtonAdornment | React.ReactNode | No |  | An additional help info icon rendered next to the action button |  |
| additionalInformation | React.ReactNode | No |  | Component to render additional information row between title and description |  |
| checked | boolean \| undefined | No |  | determines if this tile is selected or unselected |  |
| customActionButton | ((onClick: () => void) => JSX.Element) \| undefined | No |  | Render prop that allows overriding the default action button. |  |
| description | React.ReactNode | No |  | description of the TileSelect |  |
| disabled | boolean \| undefined | No |  | disables the TileSelect input |  |
| footer | React.ReactNode | No |  | footer of the TileSelect |  |
| id | string \| undefined | No |  | input id |  |
| name | string \| undefined | No |  | input name |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Callback triggered when the user blurs this tile |  |
| onChange | ((ev: React.ChangeEvent<HTMLInputElement> \| TileSelectDeselectEvent) => void) \| undefined | No |  | Callback triggered when user selects or deselects this tile |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Callback triggered when the user focus this tile |  |
| prefixAdornment | React.ReactNode | No |  | Component to render in the top left corner of TileSelect |  |
| subtitle | React.ReactNode | No |  | subtitle of the TileSelect |  |
| title | React.ReactNode | No |  | title of the TileSelect |  |
| titleAdornment | React.ReactNode | No |  | adornment to be rendered next to the title |  |
| type | "radio" \| "checkbox" \| undefined | No |  | Type of the TileSelect input |  |
| value | string \| undefined | No |  | the value that is represented by this TileSelect |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### TileSelectGroup

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The TileSelect components to be rendered in the group |  |
| name | string | Yes |  | The name to apply to the input - only for single select mode. |  |
| description | string \| undefined | No |  | Description to be rendered below the legend |  |
| legend | string \| undefined | No |  | The content for the TileSelectGroup Legend |  |
| multiSelect | boolean \| undefined | No |  | When passed as true TileSelectGroup serves only visual purpose It wraps TileSelects in fieldset element and renders the legend and description props content onChange, onBlur, value, checked and name props are meant to be passed individually on each of the TileSelects | false |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | A callback triggered when one of tiles is blurred - only for single select mode. |  |
| onChange | ((ev: React.ChangeEvent<HTMLInputElement> \| TileSelectDeselectEvent) => void) \| undefined | No |  | A callback triggered when one of tiles is selected - only for single select mode. |  |
| value | string \| null \| undefined | No |  | The currently selected value - only for single select mode. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
