---
name: carbon-component-step-flow
description: Carbon StepFlow component props and usage examples.
---

# StepFlow

## Import
`import StepFlow from "carbon-sage/lib/components/step-flow/step-flow.component";`

## Source
- Export: `./components/step-flow/step-flow.component`
- Props interface: `StepFlowProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| currentStep | Steps | Yes | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 | The current step of the user journey. If the set `currentStep` is higher than `totalSteps`the value of `currentStep` will be that of `totalSteps` instead. |  |
| title | React.ReactNode | Yes |  | The title of the current step, this can be a string or a valid React node which contains the `<StepFlowTitle />` component as a descendant. |  |
| totalSteps | Steps | Yes | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 | The total steps in the user journey. |  |
| category | string \| undefined | No |  | A category for the user journey. |  |
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
| onDismiss | ((e: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | function runs when user click dismiss button |  |
| showCloseIcon | boolean \| undefined | No |  | Determines if the close icon button is shown |  |
| showProgressIndicator | boolean \| undefined | No |  | Determines if the progress indicator is shown. |  |
| titleVariant | "h1" \| "h2" \| undefined | No |  | Set the variant of the internal 'Typography' component which contains the title. However, despite the chosen variant the styling will always be overridden. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  | Prop to specify the aria-describedby of the component |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the component |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby of the component |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <StepFlow
      title="Step title"
      titleVariant="h2"
      currentStep={1}
      totalSteps={6}
    />
  );
}
```


### Title Node

**Render**

```tsx
() => {
  const titleNode = (
    <Box display="flex" alignItems="center">
      <Icon type="bin" />
      <StepFlowTitle titleString="Step title" />
    </Box>
  );

  return (
    <StepFlow
      title={titleNode}
      titleVariant="h2"
      currentStep={1}
      totalSteps={6}
    />
  );
}
```


### Title Node with Screen Reader Only Title

**Render**

```tsx
() => {
  const titleNode = (
    <Box display="flex" alignItems="center">
      <StepFlowTitle
        titleVariant="h2"
        titleString="Step title"
        screenReaderOnlyTitle="Step Title with a pointer image"
      />
      <Image alt="" src={pointSvg} decorative size={50} />
    </Box>
  );

  return <StepFlow title={titleNode} currentStep={1} totalSteps={6} />;
}
```


### Category

**Render**

```tsx
() => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      titleVariant="h2"
    />
  );
}
```


### Show Progress Indicator

**Render**

```tsx
() => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      showProgressIndicator
      titleVariant="h2"
    />
  );
}
```


### Current Step

**Render**

```tsx
() => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={5}
      totalSteps={6}
      showProgressIndicator
      titleVariant="h2"
    />
  );
}
```


### Total Steps

**Render**

```tsx
() => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={5}
      totalSteps={8}
      showProgressIndicator
      titleVariant="h2"
    />
  );
}
```


### Show Close Icon

**Render**

```tsx
() => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      showCloseIcon
      onDismiss={() => ""}
      titleVariant="h2"
    />
  );
}
```


### Example Implementation

**Render**

```tsx
() => {
  const lowestStep = 1;
  const highestStep = 3;

  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [step, setStep] = useState(lowestStep);
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepTitles = ["Step title 1", "Step title 2", "Step title 3"];

  function handleClick(clickType: string) {
    stepFlowHandle.current?.focus();

    if (clickType === "Back") {
      setStep(step > lowestStep ? step - 1 : step);
    } else {
      setStep(step < highestStep ? step + 1 : step);
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        showCloseIcon={false}
        title={
          <StepFlow
            category="Main goal"
            title={stepTitles[step - 1]}
            currentStep={step as Steps}
            totalSteps={highestStep}
            ref={stepFlowHandle}
            showProgressIndicator
            showCloseIcon
            onDismiss={() => setIsOpen(false)}
            mb="20px"
            titleVariant="h2"
          />
        }
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button buttonType="tertiary" onClick={() => handleClick("Back")}>
              Back
            </Button>
          }
          rightSideButtons={
            <Button
              buttonType="primary"
              onClick={() => handleClick("Continue")}
            >
              Continue
            </Button>
          }
        >
          <Typography>
            This is an example of a Dialog with a Form as content, with a Step
            Flow to help users complete tasks in a specific order.
          </Typography>
          <Textarea label="Textarea label" value="" onChange={() => {}} />
        </Form>
      </Dialog>
    </>
  );
}
```


### Example Implementation with title node

**Render**

```tsx
() => {
  const lowestStep = 1;
  const highestStep = 3;

  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [step, setStep] = useState(lowestStep);
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepTitles = ["Step title 1", "Step title 2", "Step title 3"];

  function handleClick(clickType: string) {
    stepFlowHandle.current?.focus();

    if (clickType === "Back") {
      setStep(step > lowestStep ? step - 1 : step);
    } else {
      setStep(step < highestStep ? step + 1 : step);
    }
  }

  const titleNode = (
    <Box display="flex" alignItems="center">
      <Icon type="bin" />
      <StepFlowTitle titleString={stepTitles[step - 1]} />
    </Box>
  );
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        showCloseIcon={false}
        title={
          <StepFlow
            category="Main goal"
            title={titleNode}
            currentStep={step as Steps}
            totalSteps={highestStep}
            ref={stepFlowHandle}
            showProgressIndicator
            showCloseIcon
            onDismiss={() => setIsOpen(false)}
            mb="20px"
            titleVariant="h2"
          />
        }
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button buttonType="tertiary" onClick={() => handleClick("Back")}>
              Back
            </Button>
          }
          rightSideButtons={
            <Button
              buttonType="primary"
              onClick={() => handleClick("Continue")}
            >
              Continue
            </Button>
          }
        >
          <Typography>
            This is an example of a Dialog with a Form as content, with a Step
            Flow to help users complete tasks in a specific order.
          </Typography>
          <Textarea label="Textarea label" onChange={() => {}} value="" />
        </Form>
      </Dialog>
    </>
  );
}
```


### MDX Example 1

**Args**

```tsx
import { StepFlow, StepFlowTitle, StepFlowHandle, Steps } from "carbon-react/lib/components/step-flow";
```


### MDX Example 2

**Args**

```tsx
<span data-element="visually-hidden-title-text">
  Step Title with a pointer image. Step 1 of 3.
</span>
```


### MDX Example 3

**Args**

```tsx
<span data-element="visually-hidden-title-text">
  Add client. Transaction Type. Step 1 of 3.
</span>
```


### MDX Example 4

**Args**

```tsx
const stepFlowHandle = useRef<StepFlowHandle>(null);
return (
  <StepFlow
    title="Refund details"
    totalSteps={3}
    currentStep={1}
    ref={stepFlowHandle}
  />
);
```


### MDX Example 5

**Args**

```tsx
stepFlowHandle.current?.focus();
```

