---
name: carbon-component-step-sequence-item
description: Carbon StepSequenceItem component props and usage examples.
---

# StepSequenceItem

## Import
`import { StepSequenceItem } from "carbon-sage/lib/components/step-sequence";`

## Source
- Export: `./components/step-sequence`
- Props interface: `StepSequenceItemProps`

## Props
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

## Examples
### Default

**Args**

```tsx
{}
```

