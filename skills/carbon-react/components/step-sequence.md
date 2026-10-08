---
name: carbon-component-step-sequence
description: Carbon StepSequence component props and usage examples.
---

# StepSequence

## Import
`import { StepSequence } from "carbon-react/lib/components/step-sequence";`

## Source
- Export: `./components/step-sequence`
- Props interface: `StepSequenceProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Step sequence items to be rendered. |  |
| m | SpacingProperty | No |  |  |  |
| margin | SpacingProperty | No |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |
| marginX | SpacingProperty | No |  |  |  |
| marginY | SpacingProperty | No |  |  |  |
| mb | SpacingProperty | No |  |  |  |
| ml | SpacingProperty | No |  |  |  |
| mr | SpacingProperty | No |  |  |  |
| mt | SpacingProperty | No |  |  |  |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
| orientation | "horizontal" \| "vertical" \| undefined | No |  | Orientation of the component. | "horizontal" |
| p | SpacingProperty | No |  |  |  |
| padding | SpacingProperty | No |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |
| pb | SpacingProperty | No |  |  |  |
| pl | SpacingProperty | No |  |  |  |
| pr | SpacingProperty | No |  |  |  |
| pt | SpacingProperty | No |  |  |  |
| px | SpacingProperty | No |  |  |  |
| py | SpacingProperty | No |  |  |  |
| size | "small" \| "medium" \| undefined | No |  | The size of the component. | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### HorizontalOrientation

**Args**

```tsx
{
    orientation: "horizontal",
  }
```

**Render**

```tsx
({ ...args }) => (
    <StepSequence {...args}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        indicator="1"
        status="complete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Personal Details"
      />
      <StepSequenceItem
        aria-label="Step 2 of 5"
        indicator="2"
        status="complete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Delivery Address"
      />
      <StepSequenceItem
        aria-label="Step 3 of 5"
        indicator="3"
        status="current"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Delivery Details"
      />
      <StepSequenceItem
        aria-label="Step 4 of 5"
        indicator="4"
        status="incomplete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Payment"
      />
      <StepSequenceItem
        aria-label="Step 5 of 5"
        indicator="5"
        status="incomplete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Confirmation"
      />
    </StepSequence>
  )
```


### VerticalOrientation

**Args**

```tsx
{
    orientation: "vertical",
  }
```


### SmallSize

**Args**

```tsx
{
    size: "small",
  }
```


### WithItemDescription

**Render**

```tsx
({ ...args }) => (
    <StepSequence {...args}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        indicator="1"
        status="complete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Personal Details"
        description={description}
      />
      <StepSequenceItem
        aria-label="Step 2 of 5"
        indicator="2"
        status="complete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Delivery Address"
        description={description}
      />
      <StepSequenceItem
        aria-label="Step 3 of 5"
        indicator="3"
        status="current"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Delivery Details"
        description={description}
      />
      <StepSequenceItem
        aria-label="Step 4 of 5"
        indicator="4"
        status="incomplete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Payment"
        description={description}
      />
      <StepSequenceItem
        aria-label="Step 5 of 5"
        indicator="5"
        status="incomplete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Confirmation"
        description={description}
      />
    </StepSequence>
  )
```

