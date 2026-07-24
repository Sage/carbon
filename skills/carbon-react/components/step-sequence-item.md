---
name: carbon-component-step-sequence-item
description: Carbon StepSequenceItem component props and usage examples.
---

# StepSequenceItem

## Import
`import { StepSequenceItem } from "carbon-react/lib/components/step-sequence";`

## Source
- Export: `./components/step-sequence`
- Props interface: `StepSequenceItemProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| indicator | string | Yes |  |  |  | Indicator for the step. |  |
| description | string \| undefined | No |  |  |  | Description for the step item, rendered below the title. |  |
| hiddenCompleteLabel | string \| undefined | No |  |  |  | Hidden accessible label to be rendered if item is complete. |  |
| hiddenCurrentLabel | string \| undefined | No |  |  |  | Hidden accessible label to be rendered if item is current. |  |
| status | "complete" \| "current" \| "incomplete" \| undefined | No |  |  |  | Status for the step item. | "incomplete" |
| title | string \| undefined | No |  |  |  | Title for the step item |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Accessible label for the step item. |  |
| ariaLabel | string \| undefined | No |  | Yes | Please use native `aria-label` attribute instead. | Aria label for the step item. |  |
| children | React.ReactNode | No |  | Yes | Please use the `title` prop instead. | Content to render as the item's title. |  |
| hideIndicator | boolean \| undefined | No |  | Yes | Indicators will always be shown on incomplete steps. | Flag to hide the indicator for incomplete steps. |  |

## Examples
No Storybook examples found.