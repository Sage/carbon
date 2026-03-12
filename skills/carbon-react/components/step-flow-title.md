---
name: carbon-component-step-flow-title
description: Carbon StepFlowTitle component props and usage examples.
---

# StepFlowTitle

## Import
`import StepFlowTitle from "carbon-react/lib/components/step-flow/step-flow-title/step-flow-title.component";`

## Source
- Export: `./components/step-flow/step-flow-title/step-flow-title.component`
- Props interface: `StepFlowTitleProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| titleString | string | Yes |  | The title of the current step. |  |
| screenReaderOnlyTitle | string \| undefined | No |  | Override the screen reader only title with any additional context or information. If not provided, only the `titleString` prop will be used. |  |
| titleVariant | "h1" \| "h2" \| undefined | No |  | Set the variant of the internal 'Typography' component which contains the title. However, despite the chosen variant the styling will always be overridden. |  |

## Examples
No Storybook examples found.