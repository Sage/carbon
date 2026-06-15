# StepSequence

Indicate the progress of a step flow.

Progress indicators always directly mirror the number of pages, not general categories.

Try to keep label text for each step as short as possible.

For users on small screens or instances where horizontal space is limited, use the vertical version of this component.

**Category:** UI presentation

## Quick Start

```javascript
import {
  StepSequence,
  StepSequenceItem,
} from "carbon-react/lib/components/step-sequence";
```

## Examples

### Default

Horizontal step sequence showing numbered steps. Each `StepSequenceItem` has a `status` prop: `complete`, `current`, or `incomplete`. Completed steps show a tick mark.

See: `examples/DefaultStory.md`

### Vertical

Set `orientation="vertical"` to stack the steps vertically. Recommended for narrow screens or when more than five steps need to be shown.

See: `examples/Vertical.md`

### With hidden indicators

Set `hideIndicators` on `StepSequenceItem` to hide the numbered circles, showing only the label text. Useful when visual brevity is required.

See: `examples/WithHiddenIndicators.md`

### Responsive Example

Demonstrates switching between horizontal and vertical orientation based on viewport width, using a responsive layout to adapt the step sequence to smaller screens.

See: `examples/ResponsiveExample.md`

## Props

### StepSequence

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Step sequence items to be rendered |  |
| orientation | "vertical" \| "horizontal" \| undefined | No |  | The direction that step sequence items should be rendered | "horizontal" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### StepSequenceItem

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Content to be displayed |  |
| indicator | string | Yes |  | Value to be displayed before text for incomplete steps |  |
| ariaLabel | string \| undefined | No |  | Aria label |  |
| hiddenCompleteLabel | string \| undefined | No |  | Hidden label to be displayed if item is complete |  |
| hiddenCurrentLabel | string \| undefined | No |  | Hidden label to be displayed if item is current |  |
| hideIndicator | boolean \| undefined | No |  | Flag to hide the indicator for incomplete steps | false |
| status | "complete" \| "current" \| "incomplete" \| undefined | No |  | Status for the step | "incomplete" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
