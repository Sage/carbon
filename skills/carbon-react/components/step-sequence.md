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
| children | React.ReactElement<StepSequenceItemProps, string \| React.JSXElementConstructor<any>> \| React.ReactElement<StepSequenceItemProps, string \| React.JSXElementConstructor<any>>[] | Yes |  | Step sequence items to be rendered |  |
| currentStep | number | Yes |  | The active step within the sequence |  |
| orientation | "horizontal" \| "vertical" \| undefined | No |  | The orientation to display the sequence in | "horizontal" |

## Examples
### Default

**Render**

```tsx
(props: StepSequenceProps) => {
  return (
    <StepSequence currentStep={props.currentStep}>
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
    <StepSequence currentStep={props.currentStep} orientation={"horizontal"}>
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

**Render**

```tsx
() => {
  return (
    <StepSequence>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
}
```


### Vertical

**Render**

```tsx
() => {
  return (
    <Box height="600px">
      <StepSequence orientation="vertical">
        <StepSequenceItem
          aria-label="Step 1 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="1"
          status="complete"
        >
          Name
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 2 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="2"
          status="complete"
        >
          Delivery Address
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 3 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="3"
          status="current"
        >
          Delivery Details
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 4 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="4"
          status="incomplete"
        >
          Payment
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 5 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="5"
          status="incomplete"
        >
          Confirm
        </StepSequenceItem>
      </StepSequence>
    </Box>
  );
}
```


### With Hidden Indicators

**Render**

```tsx
() => {
  return (
    <StepSequence>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        hideIndicator
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        hideIndicator
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        hideIndicator
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
}
```


### Responsive Example

**Render**

```tsx
() => {
  const displayVertical = useMediaQuery("(max-width: 760px)");
  return (
    <StepSequence orientation={displayVertical ? "vertical" : "horizontal"}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
}
```

