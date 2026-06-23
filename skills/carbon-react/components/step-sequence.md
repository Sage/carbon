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
| children | React.ReactNode | Yes |  | Step sequence items to be rendered |  |
| currentStep | number | Yes |  | The active step within the sequence |  |
| hiddenCompleteLabel | string \| undefined | No |  | Hidden label to be used when a step is completed | "complete" |
| hiddenCurrentLabel | string \| undefined | No |  | Hidden label to be used when a step is the current step | "current" |
| hiddenIncompleteLabel | string \| undefined | No |  | Hidden label to be used when a step is incomplete | "incomplete" |
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
| orientation | "horizontal" \| "vertical" \| undefined | No |  | The orientation to display the sequence in | "vertical" |
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
### Default

**Args**

```tsx
{
  currentStep: 1,
}
```

**Render**

```tsx
(props: StepSequenceProps) => {
  return (
    <StepSequence {...props}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
      <StepSequenceItem stepNumber={3} title="Development" />
      <StepSequenceItem stepNumber={4} title="QA" />
      <StepSequenceItem
        stepNumber={5}
        title="Release"
        description={"This is step 5"}
      />
    </StepSequence>
  );
}
```


### Horizontal

**Render**

```tsx
(props: StepSequenceProps) => {
  return (
    <StepSequence {...props} orientation={"horizontal"}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
      <StepSequenceItem stepNumber={3} title="Development" />
      <StepSequenceItem stepNumber={4} title="QA" />
      <StepSequenceItem
        stepNumber={5}
        title="Release"
        description={"This is step 5"}
      />
    </StepSequence>
  );
}
```


### Size

**Args**

```tsx
{
  size: "small",
}
```

**Render**

```tsx
({ ...props }) => {
  return (
    <div>
      <StepSequence currentStep={props.currentStep} size={props.size}>
        <StepSequenceItem
          stepNumber={1}
          title="Planning"
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          }
        />
        <StepSequenceItem
          stepNumber={2}
          title="Design"
          description={"This is step 2"}
        />
        <StepSequenceItem stepNumber={3} title="Development" />
        <StepSequenceItem stepNumber={4} title="QA" />
        <StepSequenceItem
          stepNumber={5}
          title="Release"
          description={"This is step 5"}
        />
      </StepSequence>
    </div>
  );
}
```


### Responsive

**Render**

```tsx
(props: StepSequenceProps) => {
  const displayVertical = useMediaQuery("(max-width: 760px)");

  return (
    <StepSequence
      currentStep={props.currentStep}
      orientation={displayVertical ? "vertical" : "horizontal"}
    >
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
      <StepSequenceItem stepNumber={3} title="Development" />
      <StepSequenceItem stepNumber={4} title="QA" />
      <StepSequenceItem
        stepNumber={5}
        title="Release"
        description={"This is step 5"}
      />
    </StepSequence>
  );
}
```


### Default

**Args**

```tsx
{
  currentStep: 1,
  hiddenCompleteLabel: "Finished",
  hiddenCurrentLabel: "Active",
  hiddenIncompleteLabel: "Not Started",
}
```

**Render**

```tsx
(props: StepSequenceProps) => {
  return (
    <StepSequence {...props}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
      <StepSequenceItem stepNumber={3} title="Development" />
      <StepSequenceItem stepNumber={4} title="QA" />
      <StepSequenceItem
        stepNumber={5}
        title="Release"
        description={"This is step 5"}
      />
    </StepSequence>
  );
}
```

