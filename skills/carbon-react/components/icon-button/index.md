# Icon Button

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated icon-only clickable button. Wrap a Carbon `Icon` as children to render an accessible button without visible text. Use `Button` with an icon-only composition in new implementations.

**Category:** Actions

## Quick Start

```javascript
import IconButton from "carbon-react/lib/components/icon-button";
```

## Examples

### Default

An `IconButton` wrapping a Carbon `Icon`. The `onClick` handler is triggered on click or keyboard Enter/Space.

See: `examples/Default.md`

### With tooltip

Attach a `Tooltip` to the `IconButton` to provide a visible label on hover/focus for accessibility.

See: `examples/WithTooltip.md`

### Disabled

Use the `disabled` prop to prevent interaction with the icon button.

See: `examples/Disabled.md`

## Props

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
