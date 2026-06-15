# Button Minor

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated smaller-scale variant of the `Button` component sharing the same `primary`, `secondary`, and `tertiary` types. Use `Button` with the appropriate `size` prop in new implementations.

**Category:** Actions

## Quickstart

```javascript
import ButtonMinor from "carbon-react/lib/components/button-minor";
```

## Examples

### Primary Buttons

For the single most prominent call to action on the page (e.g. Save, Submit, Continue).

See: `examples/PrimaryButton.md`

Primary buttons can be destructive.

See: `examples/PrimaryDestructiveButton.md`

Primary buttons can be disabled.

See: `examples/PrimaryDisabledButton.md`

Primary buttons can have an icon positioned before or after the text.

See: `examples/PrimaryIconButton.md`

Primary buttons can be `fullWidth`.

See: `examples/PrimaryFullWidthButton.md`

Primary buttons can be set into `noWrap` mode to prevent text wrapping.

See: `examples/PrimaryNoWrapButton.md`

### Secondary Buttons

Less prominent, there can be multiple secondary buttons on a page.
Secondary buttons are transparent, rather than white.

See: `examples/SecondaryButton.md`

Secondary buttons can be destructive.

See: `examples/SecondaryDestructiveButton.md`

Secondary buttons can be disabled.

See: `examples/SecondaryDisabledButton.md`

Secondary buttons can have an icon positioned before or after the text.

See: `examples/SecondaryIconButton.md`

Secondary buttons can be `fullWidth`.

See: `examples/SecondaryFullWidthButton.md`

Secondary buttons can be set into `noWrap` mode to prevent text wrapping.

See: `examples/SecondaryNoWrapButton.md`

### Tertiary Buttons

Tertiary Buttons or 'ghost' buttons are used for reversing actions, like 'Cancel' or 'Back'.

See: `examples/TertiaryButton.md`

Tertiary buttons can be destructive.

See: `examples/TertiaryDestructiveButton.md`

Tertiary buttons can be disabled.

See: `examples/TertiaryDisabledButton.md`

Tertiary buttons can have an icon positioned before or after the text.

See: `examples/TertiaryIconButton.md`

Tertiary buttons can be `fullWidth`.

See: `examples/TertiaryFullWidthButton.md`

Tertiary buttons can be set to `noWrap` mode to prevent text wrapping.

See: `examples/TertiaryNoWrapButton.md`

### Icon Only Button

Buttons can be rendered with just an icon.

See: `examples/IconOnlyButton.md`

## Props

### Button Minor

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The text the button displays |  |
| className | string \| undefined | No |  |  |  |  |  |
| disabled | boolean \| undefined | No |  |  |  | Apply disabled state to the button |  |
| fullWidth | boolean \| undefined | No |  |  |  | Apply fullWidth style to the button |  |
| iconPosition | ButtonIconPosition \| undefined | No |  |  |  | Defines an Icon position related to the children: "before" \| "after" |  |
| iconType | IconType \| undefined | No |  |  |  | Defines an Icon type within the button |  |
| id | string \| undefined | No |  |  |  | id attribute |  |
| isInPassword | boolean \| undefined | No |  |  |  |  |  |
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
