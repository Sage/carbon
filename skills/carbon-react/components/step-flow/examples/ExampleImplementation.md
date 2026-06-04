```tsx
export const ExampleImplementation: Story = () => {
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
};
```