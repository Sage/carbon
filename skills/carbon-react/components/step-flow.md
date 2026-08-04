---
name: carbon-component-step-flow
description: Carbon StepFlow component props and usage examples.
---

# StepFlow

## Import
`import StepFlow from "carbon-react/lib/components/step-flow/step-flow.component";`

## Source
- Export: `./components/step-flow/step-flow.component`
- Props interface: `StepFlowProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| currentStep | Steps | Yes | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 |  |  | The current step of the user journey. If the set `currentStep` is higher than `totalSteps`the value of `currentStep` will be that of `totalSteps` instead. |  |
| title | React.ReactNode | Yes |  |  |  | The title of the current step, this can be a string or a valid React node which contains the `<StepFlowTitle />` component as a descendant. |  |
| totalSteps | Steps | Yes | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 |  |  | The total steps in the user journey. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| onDismiss | ((e: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback function invoked when the close icon button is clicked |  |
| showCloseIcon | boolean \| undefined | No |  |  |  | Determines if the close icon button is shown |  |
| showProgressIndicator | boolean \| undefined | No |  |  |  | Determines if the progress indicator is shown. |  |
| titleVariant | "h1" \| "h2" \| undefined | No |  |  |  | Set the variant of the internal 'Typography' component which contains the title. However, despite the chosen variant the styling will always be overridden. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Prop to specify the aria-describedby of the component |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the component |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby of the component |  |
| category | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | A category for the user journey. |  |

## Examples
### Default

**Args**

```tsx
{
    title: "Title",
    currentStep: 4,
    totalSteps: 8,
  }
```

**Render**

```tsx
({ ...args }) => <StepFlow {...args} />
```


### TitleNode

**Args**

```tsx
{
    ...Default.args,
    title: titleNode,
  }
```


### TitleVariant

**Args**

```tsx
{
    ...Default.args,
    titleVariant: "h2",
  }
```


### ShowProgressIndicator

**Args**

```tsx
{
    ...Default.args,
    showProgressIndicator: true,
  }
```


### ShowCloseIcon

**Args**

```tsx
{
    ...Default.args,
    showCloseIcon: true,
  }
```


### Example Implementation

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepHeading = [
    "Step 1 Heading",
    "Step 2 Heading",
    "Step 3 Heading",
    "Step 4 Heading",
    "Step 5 Heading",
  ];

  function handleClick(clickType: string) {
    stepFlowHandle.current?.focus();

    if (clickType === "Back") {
      setStep(step > 1 ? step - 1 : step);
    } else {
      setStep(step < 5 ? step + 1 : step);
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
            title="Step Flow Title"
            currentStep={step as Steps}
            totalSteps={5}
            ref={stepFlowHandle}
            showProgressIndicator
            showCloseIcon
            onDismiss={() => setIsOpen(false)}
          />
        }
      >
        <Form
          fieldSpacing={2}
          {...(step !== 1 && {
            leftSideButtons: (
              <Button
                variantType="secondary"
                onClick={() => handleClick("Back")}
              >
                <Icon type="chevron_left_thick" />
                Previous step
              </Button>
            ),
          })}
          rightSideButtons={
            <Button onClick={() => handleClick("Continue")}>
              {step !== stepHeading.length ? (
                <>
                  {" "}
                  Next step
                  <Icon type="chevron_right_thick" />
                </>
              ) : (
                "Complete"
              )}
            </Button>
          }
        >
          <Typography variant="h3">{stepHeading[step - 1]}</Typography>
          <Typography tint="alt" size="L" m={0} pb={1}>
            Current step description.
          </Typography>
          <Textbox label="Textbox" value="" onChange={() => {}} />
          <Textbox label="Textbox" value="" onChange={() => {}} />
          {step !== stepHeading.length && (
            <Typography tint="alt" size="L" m={0} pt={1}>
              Next step: {stepHeading[step]}
            </Typography>
          )}
        </Form>
      </Dialog>
    </>
  );
}
```


### MDX Example 1

**Args**

```tsx
import { 
  StepFlow,
  StepFlowTitle,
  type StepFlowHandle,
  type Steps
} from "carbon-react/lib/components/step-flow";
```

