# Batch Selection

Batch Selection Component could be used to select multiple items, and apply a common action to all the items selected. It renders a toolbar with a selected-item count and a row of action buttons (IconButtons, Buttons or Links).

**Category:** Actions

## Quick Start

To use Batch Selection, import the `BatchSelection`, pass Icon Buttons with actions as children and number of selected in selectedCount prop.

```javascript
import BatchSelection from "carbon-react/lib/components/batch-selection";
import Button from "carbon-react/lib/components/button";
import ButtonMinor from "carbon-react/lib/components/button-minor";
import IconButton from "carbon-react/lib/components/icon-button";
import Link from "carbon-react/lib/components/link";
```

## Examples

### Default usage

Basic `BatchSelection` with a "Select All" `Button` and three `IconButton` actions. `selectedCount` is `0`, so the counter shows zero selected items.

See: `examples/Default.md`

### On dark background

Use `colorTheme="dark"` for a dark-coloured toolbar, suitable for use on dark page backgrounds.

See: `examples/Dark.md`

### On light background

Use `colorTheme="light"` for a light-coloured toolbar, suitable for use on light grey backgrounds.

See: `examples/Light.md`

### On white background

Use `colorTheme="white"` for a white toolbar, suitable for use on white page backgrounds.

See: `examples/White.md`

### Disabled

All Carbon components passed as children that can render as a button will be automatically disabled when the `disabled` prop is true.

See: `examples/Disabled.md`

## Props

### Batch Selection

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Content to be rendered after selected count |  |
| selectedCount | number | Yes |  | Number of selected elements |  |
| colorTheme | "white" \| "dark" \| "light" \| "transparent" \| undefined | No |  | Color of the background, transparent if not defined | "transparent" |
| disabled | boolean \| undefined | No |  | If true disables all user interaction | false |
| hidden | boolean \| undefined | No |  | Hidden if true |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Icon Button

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactElement<IconProps, string \| React.JSXElementConstructor<any>> | Yes |  | Icon meant to be rendered, should be an Icon component |  |
| disabled | boolean \| undefined | No |  | Set the button to disabled |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on blur |  |
| onClick | ((e: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on click |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on focus |  |
| onMouseEnter | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on mouse enter |  |
| onMouseLeave | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on mouse leave |  |
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the icon-button component |  |
