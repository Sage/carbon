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
| orientation | "horizontal" \| "vertical" \| undefined | No |  | Orientation of the component. | "horizontal" |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
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

