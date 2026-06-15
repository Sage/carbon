# Split Button

A button that combines a primary action (left side) with a dropdown of secondary actions (right side, opened via a chevron). Use when a primary action has closely related secondary options.

**Category:** Actions

## Quick Start

```javascript
import SplitButton, { type SplitButtonHandle } from "carbon-react/lib/components/split-button";
```

## Examples

### Default

A `SplitButton` with a primary label and a chevron that opens a dropdown of child `Button` actions.

See: `examples/Default.md`

### Focusing Main and Toggle Buttons Programmatically

The `SplitButtonHandle` type provides an imperative handle for programmatic control over `SplitButton`. 
Using a `ref`, you can access its `focusMainButton()` and `focusToggleButton()` methods to set focus on the respective buttons as needed.

See: `examples/ProgrammaticFocus.md`

### Disabled

Use the `disabled` prop to prevent interaction with both the main button and the dropdown.

See: `examples/Disabled.md`

### Button types

The main button supports all `buttonType` values. Use `buttonType` on `SplitButton` to style the trigger.

See: `examples/ButtonTypes.md`

### Child button types

Buttons used as a content of `SplitButton` can be of any type.

See: `examples/ChildButtonTypes.md`

### Sizes

Available sizes: `small`, `medium` (default) and `large`. Set via the `size` prop.

See: `examples/Sizes.md`

### Button text alignment

Use the `align` prop to change the alignment of the text in the menu Buttons.

See: `examples/Align.md`

### Menu position

By default, the menu will open aligned to the "right" of the button, but you can use the `position` prop to change this to the "left". 

Note: The position of the menu will also be automatically adjusted to fit within the viewport.

See: `examples/Position.md`

### Subtext

Use the `subtext` prop to add a secondary line below the main label. Only supported when `size="large"`.

See: `examples/Subtext.md`

### With icon

Use the `iconType` and `iconPosition` props to add an icon to the main button label.

See: `examples/WithIcon.md`

### In overflow: hidden container

Demonstrates that the `SplitButton` dropdown renders correctly even inside a container with `overflow: hidden`, escaping the overflow boundary.

See: `examples/InOverflowHiddenContainer.md`

## Props

### SplitButton

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The additional button to display. |  |
| text | string | Yes |  | The text to be displayed in the main button. |  |
| align | "left" \| "right" \| undefined | No |  | Set align of the rendered content |  |
| buttonType | "primary" \| "secondary" \| undefined | No |  | Button type: "primary" \| "secondary" |  |
| disabled | boolean \| undefined | No |  | Gives the button a disabled state. |  |
| iconPosition | "before" \| "after" \| undefined | No |  | Defines an Icon position within the button: "before" \| "after" |  |
| iconType | IconType \| undefined | No |  | Defines an Icon type within the button |  |
| isWhite | boolean \| undefined | No |  | Renders the white variant of the secondary split button |  |
| position | "left" \| "right" \| undefined | No |  | Sets rendering position of menu |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  | The size of the buttons. |  |
| subtext | string \| undefined | No |  | Second text child, renders under main text, only when size is "large" |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify an aria-label for the component |  |

### Button

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The text the button displays |  |
| className | string \| undefined | No |  |  |  |  |  |
| disabled | boolean \| undefined | No |  |  |  | Apply disabled state to the button |  |
| fullWidth | boolean \| undefined | No |  |  |  | Apply fullWidth style to the button |  |
| iconPosition | ButtonIconPosition \| undefined | No |  |  |  | Defines an Icon position related to the children: "before" \| "after" |  |
| iconType | IconType \| undefined | No |  |  |  | Defines an Icon type within the button |  |
| id | string \| undefined | No |  |  |  | id attribute |  |
| name | string \| undefined | No |  |  |  | Name attribute |  |
| noWrap | boolean \| undefined | No |  |  |  | If provided, the text inside a button will not wrap |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| onChange | ((ev: React.FormEvent<HTMLButtonElement \| HTMLAnchorElement> \| React.ChangeEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on change |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | onClick handler |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on focus |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| size | SizeOptions \| undefined | No |  |  |  | Assigns a size to the button: "small" \| "medium" \| "large" |  |
| type | string \| undefined | No |  |  |  | HTML button type property |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Identifies the element(s) offering additional information about the button the user might require. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label attribute of the component Defaults to the iconType, when the component has only an icon |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element(s) labelling the button. |  |
| buttonType | ButtonTypes \| undefined | No |  | Yes | Color variants for new business themes: "primary" \| "secondary" \| "tertiary" \| "darkBackground" |  |  |
| destructive | boolean \| undefined | No |  | Yes | Apply destructive style to the button |  |  |
| href | string \| undefined | No |  | Yes | Used to transform button into anchor |  |  |
| iconTooltipMessage | string \| undefined | No |  | Yes | [Legacy] Provides a tooltip message when the icon is hovered. |  |  |
| iconTooltipPosition | TooltipPositions \| undefined | No |  | Yes | [Legacy] Provides positioning when the tooltip is displayed. |  |  |
| isWhite | boolean \| undefined | No |  | Yes | Whether to use the white-on-dark colour variant |  |  |
| rel | string \| undefined | No |  | Yes | HTML rel attribute |  |  |
| subtext | string \| undefined | No |  | Yes | Second text child, renders under main text, only when size is "large" |  |  |
| target | string \| undefined | No |  | Yes | HTML target attribute |  |  |

## Ref methods

`SplitButton`'s forwarded ref exposes the following imperative methods:

| Method Name             | Description                                  |
| ----------------------- | -------------------------------------------- |
| `focusMainButton()`   | Programmatically focuses the main button.    |
| `focusToggleButton()` | Programmatically focuses the toggle button.  |
