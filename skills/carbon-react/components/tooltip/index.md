# Tooltip

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Tooltip has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

## Import

```javascript
import Tooltip from "carbon-react/lib/components/tooltip";
```

## Examples

### Default

To use the Tooltip, pass in the component you want it to display on in via the `children` prop, any component passed in
must support `forwardRef`. By default the Tooltip does not need to be controlled and will display when the target element
is focused or hovered. The default `position` is "top" and `size` is "M". The `message` prop is the text displayed in the
tooltip and it and the `children` prop are required.

See: `examples/Default.md`

### Controlled

The Tooltip can also be controlled via the `isVisible` prop.

See: `examples/Controlled.md`

### Positioning

The Tooltip supports four `position`s: "top", "bottom", "left" and "right". However, if there is no room for it to display
in this position it will attempt to flip and dynamically place itself in the opposite position. The Tooltip will also track
the target element when a user scrolls. The flipping and tracking features can be seen by adjusting the window size
(ideally in the canvas tab) and scrolling.

See: `examples/Positioning.md`

### Overriding the default flip behaviour

By default if there is no room for the Tooltip to display in the given position it will attempt to flip and dynamically
place itself in the opposite position. You can pass an array of `flipOverrides` which will alter the behaviour from the
default, the Tooltip will flip to the positions defined in the array in the order they are defined. The overriding
can be seen by adjusting the window size (ideally in the canvas tab) and scrolling. The example should render the
Tooltip "bottom" initially, then flip to "right" when there is not enough room below, and finally to the "left" position
when there is no space to render to the right any more.

See: `examples/FlipBehaviourOverrides.md`

### Large tooltip

See: `examples/LargeTooltip.md`

### Types

The `Tooltip` can be rendered as two different `type`s which will alter the colour of the background: "error"
or if no value is passed it will default to a black background.

See: `examples/Types.md`

### Color overrides

The `Tooltip` background and font color can be overridden via the `bgColor` and `fontColor` props and accept any valid
css value. Any values passed to the `bgColor` prop will override the color applied by the `type`

See: `examples/ColorOverrides.md`

## Props

### Tooltip

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactElement<any, string \| React.JSXElementConstructor<any>> | Yes |  | Children elements |  |
| message | React.ReactNode | Yes |  | The message to be displayed within the tooltip |  |
| bgColor | string \| undefined | No |  | Override background color of the Tooltip, provide any color from palette or any valid css color value. |  |
| flipOverrides | TooltipPositions[] \| undefined | No |  | Overrides the default flip behaviour of the Tooltip, must be an array containing some or all of ["top", "bottom", "left", "right"] (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) |  |
| fontColor | string \| undefined | No |  | Override font color of the Tooltip, provide any color from palette or any valid css color value. |  |
| id | string \| undefined | No |  | The id attribute to use for the tooltip |  |
| inputSize | InputSizes \| undefined | No |  |  |  |
| isPartOfInput | boolean \| undefined | No |  |  |  |
| isVisible | boolean \| undefined | No |  | Whether to to show the Tooltip |  |
| position | TooltipPositions \| undefined | No |  | Sets position of the tooltip |  |
| size | "medium" \| "large" \| undefined | No |  | Defines the size of the tooltip content |  |
| target | HTMLElement \| undefined | No |  |  |  |
| type | string \| undefined | No |  | Defines the message type |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
