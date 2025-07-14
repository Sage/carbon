import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import isChromatic from "../../../.storybook/isChromatic";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button";
import Form from "../form";
import Dialog from "../dialog";
import Typography from "../typography";
import Textarea from "../textarea";
import Box from "../box";
import Icon from "../icon";
import Image from "../image";
import pointSvg from "../../../.assets/point.svg";

import { StepFlow, StepFlowTitle, StepFlowHandle, Steps } from ".";

const defaultOpenState = isChromatic();

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof StepFlow> = {
  title: "Step Flow",
  component: StepFlow,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { controls: { disabled: true } },
  decorators: [
    (Story, context) => {
      const isExampleImplementation = context.name?.includes("Example");
      return (
        <>
          {isExampleImplementation && defaultOpenState ? (
            <Box width="100%" height={900}>
              <Story />
            </Box>
          ) : (
            <Story />
          )}
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof StepFlow>;

export const DefaultStory: Story = () => {
  return (
    <StepFlow
      title="Step title"
      titleVariant="h2"
      currentStep={1}
      totalSteps={6}
    />
  );
};
DefaultStory.storyName = "Default";

export const TitleNodeStory: Story = () => {
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
};
TitleNodeStory.storyName = "Title Node";

export const TitleNodeStoryWithScreenReaderOnlyTitle: Story = () => {
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
};
TitleNodeStoryWithScreenReaderOnlyTitle.storyName =
  "Title Node with Screen Reader Only Title";
TitleNodeStoryWithScreenReaderOnlyTitle.parameters = {
  chromatic: { disableSnapshot: true },
};

export const CategoryStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      titleVariant="h2"
    />
  );
};
CategoryStory.storyName = "Category";

export const ShowProgressIndicatorStory: Story = () => {
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
};
ShowProgressIndicatorStory.storyName = "Show Progress Indicator";

export const CurrentStepStory: Story = () => {
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
};
CurrentStepStory.storyName = "Current Step";

export const TotalStepsStory: Story = () => {
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
};
TotalStepsStory.storyName = "Total Steps";
TotalStepsStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ShowCloseIconStory: Story = () => {
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
};
ShowCloseIconStory.storyName = "Show Close Icon";

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
          <Textarea label="Textarea label" />
        </Form>
      </Dialog>
    </>
  );
};
ExampleImplementation.storyName = "Example Implementation";

export const ExampleImplementationWithTitleNode: Story = () => {
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
          <Textarea label="Textarea label" />
        </Form>
      </Dialog>
    </>
  );
};
ExampleImplementationWithTitleNode.storyName =
  "Example Implementation with title node";
