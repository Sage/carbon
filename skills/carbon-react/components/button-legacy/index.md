# Button

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A Button triggers a single action or event.
Use it to submit a form (Save), to advance to the next step in a process (Next), or to create a new item (New).

**Category:** Action

## Quickstart

```javascript
import Button from "carbon-react/lib/components/button";
```

## Examples

### Primary Buttons

For the single most prominent call to action on the page (e.g. Save, Submit, Continue).

See: `examples/PrimaryButton.md`

Primary buttons can be destructive.

See: `examples/PrimaryButtonDestructive.md`

Primary buttons can be disabled.

See: `examples/PrimaryButtonDisabled.md`

Primary buttons can have an icon positioned before or after the text.

See: `examples/PrimaryButtonIcon.md`

Primary buttons can be `fullWidth`.

See: `examples/PrimaryButtonFullWitdth.md`

Primary buttons can be set into `noWrap` mode to prevent text wrapping.

See: `examples/PrimaryButtonNoWrap.md`

### Secondary Buttons

Less prominent, there can be multiple secondary buttons on a page.
Secondary buttons are transparent, rather than white.

See: `examples/SecondaryButton.md`

Secondary buttons can be destructive.

See: `examples/SecondaryButtonDestructive.md`

Secondary buttons can be disabled.

See: `examples/SecondaryButtonDisabled.md`

Secondary buttons can have an icon positioned before or after the text.

See: `examples/SecondaryButtonIcon.md`

Secondary buttons can be `fullWidth`.

See: `examples/SecondaryButtonFullWidth.md`

Secondary buttons can be set into `noWrap` mode to prevent text wrapping.

See: `examples/SecondaryButtonNoWrap.md`

Secondary buttons offer a white variant via the `isWhite` prop. Disabled and destructive states take precedence when applied.

See: `examples/SecondaryButtonWhite.md`

### Tertiary Buttons

Tertiary or ‘ghost’ buttons are used for reversing actions, like ‘Cancel’ or ‘Back’.

See: `examples/TertiaryButton.md`

Tertiary buttons can be destructive.

See: `examples/TertiaryButtonDestructive.md`

Tertiary buttons can be disabled.

See: `examples/TertiaryButtonDisabled.md`

Tertiary buttons can have an icon positioned before or after the text.

See: `examples/TertiaryButtonIcon.md`

Tertiary buttons can be `fullWidth`.

See: `examples/TertiaryButtonFullWidth.md`

Tertiary buttons can be set to `noWrap` mode to prevent text wrapping.

See: `examples/TertiaryButtonNoWrap.md`

### Dark Background Buttons

Dark Background buttons are used for adding new content that replaces empty states.

See: `examples/DarkBackgroundButton.md`

Dark Background buttons can be disabled.

See: `examples/DarkBackgroundButtonDisabled.md`

Dark Background buttons can have an icon positioned before or after the text.

See: `examples/DarkBackgroundButtonIcon.md`

Dark Background buttons can be `fullWidth`.

See: `examples/DarkBackgroundButtonFullWidth.md`

Dark Background buttons can be set to `noWrap` mode to prevent text wrapping.

See: `examples/DarkBackgroundButtonNoWrap.md`

### Gradient Buttons

The `Button` component supports a `gradient-white` `buttonType`.

See: `examples/GradientWhite.md`

`gradient-white` buttons can also be `disabled`.

See: `examples/GradientWhiteDisabled.md`

`gradient-white` buttons can have an icon positioned before or after the text.

See: `examples/GradientWhiteIcon.md`

`gradient-white` buttons can be `fullWidth`.

See: `examples/GradientWhiteFullWidth.md`

`gradient-white` buttons can be set to `noWrap` mode to prevent text wrapping.

See: `examples/GradientWhiteNoWrap.md`

The `Button` component supports a `gradient-grey` `buttonType`.

See: `examples/GradientGrey.md`

`gradient-grey` buttons can also be `disabled`.

See: `examples/GradientGreyDisabled.md`

`gradient-grey` buttons can have an icon positioned before or after the text.

See: `examples/GradientGreyIcon.md`

`gradient-grey` buttons can be `fullWidth`.

See: `examples/GradientGreyFullWidth.md`

`gradient-grey` buttons can be set to `noWrap` mode to prevent text wrapping.

See: `examples/GradientGreyNoWrap.md`

### Button as a link

Passing in the `href` prop will render an anchor with `role="button"` and the Button styles. The `target` and `rel` props are also available.

See: `examples/ButtonAsALink.md`

### Icon Only Button

Buttons can be rendered with just an icon.

See: `examples/ButtonIconOnly.md`

## Props

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
