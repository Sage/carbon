# Help

Typically triggered by the user hovering on an icon, displaying a single, short sentence.
Useful for explaining the difference between commands represented with icons, for example, batch table actions.
Bear in mind that tooltips may not work well (or at all) on mobile devices, so alternatives may be needed.

## Import

```javascript
import Help from "carbon-react/lib/components/help";
```

## Examples

### Default

See: `examples/Default.md`

### Help with Tooltip custom message

See: `examples/WithTooltipCustomMessage.md`

### Help with Tooltip Position

The tooltip can be position `right`, `left`, `top` or `bottom`.
Hover over the help component to see the different positions.

See: `examples/WithTooltipPosition.md`

### Help with Tooltip color overrides

The tooltip background and font colors can be overridden using the `tooltipBgColor` and `tooltipFontColor` props. These
props accept and valid css color value.

See: `examples/WithTooltipColorOverrides.md`

### Help with Icons

Using the `type` prop, different icons can be specified. In this example type has been assigned `error`, `add`, `minus` and `settings`

See: `examples/WithIconsAndFocused.md`

### Help with href

Using the `href` prop, a link can be specified.

See: `examples/WithHref.md`

## Props

### Help

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaLabel | string \| undefined | No |  | Aria label | "help" |
| as | keyof JSX.IntrinsicElements \| undefined | No |  | Overrides the default 'as' attribute of the Help component |  |
| children | React.ReactNode | No |  | The message to be displayed within the tooltip |  |
| helpId | string \| undefined | No |  | The unique id of the component (used with aria-describedby for accessibility) |  |
| href | string \| undefined | No |  | A path for the anchor |  |
| isFocused | boolean \| undefined | No |  | A boolean received from IconWrapper |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| tabIndex | number \| undefined | No |  | Overrides the default tabindex of the component | 0 |
| tooltipBgColor | string \| undefined | No |  | Override background color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipFlipOverrides | TooltipPositions[] \| undefined | No |  | Overrides the default flip behaviour of the Tooltip, must be an array containing some or all of ["top", "bottom", "left", "right"] (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) |  |
| tooltipFontColor | string \| undefined | No |  | Override font color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipId | string \| undefined | No |  | Id passed to the tooltip container, used for accessibility purposes |  |
| tooltipPosition | TooltipPositions \| undefined | No |  | Position of tooltip relative to target | "top" |
| type | IconType \| undefined | No |  | Help Icon type | "help" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
