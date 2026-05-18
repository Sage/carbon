import React, { useRef, useState } from "react";
import { StoryFn, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import isChromatic from "../../../.storybook/isChromatic";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import Box from "../box";
import Button from "../button";
import Dialog from "../dialog";
import Form from "../form";
import Textarea from "../textarea";
import Typography from "../typography";
import Icon from "../icon";
import { StepFlow, StepFlowHandle, StepFlowTitle, Steps } from ".";

type Story = StoryObj<typeof StepFlow>;

export default {
  title: "Step Flow/Interactions",
  component: StepFlow,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [(StoryToRender: StoryFn) => <StoryToRender />],
};

const ExampleImplementationWithTitleNodeDialogRender = () => {
  const defaultOpenState = isChromatic();
  const lowestStep = 1;
  const highestStep = 3;

  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [step, setStep] = useState<Steps>(1);
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepTitles = ["Step title 1", "Step title 2", "Step title 3"];

  const handleBack = () => {
    stepFlowHandle.current?.focus();
    setStep((previousStep) =>
      previousStep > lowestStep ? ((previousStep - 1) as Steps) : previousStep,
    );
  };

  const handleContinue = () => {
    stepFlowHandle.current?.focus();
    setStep((previousStep) =>
      previousStep < highestStep ? ((previousStep + 1) as Steps) : previousStep,
    );
  };

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
            <Button type="button" buttonType="tertiary" onClick={handleBack}>
              Back
            </Button>
          }
          rightSideButtons={
            <Button type="button" buttonType="primary" onClick={handleContinue}>
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
};

export const ExampleImplementationWithTitleNodeDialog: Story = {
  render: () => <ExampleImplementationWithTitleNodeDialogRender />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);

    // Step 1: Click "Open Dialog" button
    const openButton = canvas.getByRole("button", { name: "Open Dialog" });
    await userEvent.click(openButton);
    const dialog = await page.findByRole("dialog");
    const dialogScope = within(dialog);
    await expect(
      dialogScope.getByRole("heading", { name: /Main goal/ }),
    ).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

ExampleImplementationWithTitleNodeDialog.storyName =
  "Example Implementation with Title Node Dialog";
