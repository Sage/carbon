import React, { useState, useRef } from "react";
import Button from "../button";
import Form from "../form";
import Dialog from "../dialog";
import Typography from "../typography";
import Textarea from "../textarea";
import Box from "../box";
import Icon from "../icon";
import Image from "../image";
import pointSvg from "../../../.assets/point.svg";
import {
  StepFlow,
  StepFlowTitle,
  StepFlowHandle,
  Steps,
  StepFlowProps,
} from ".";
import { StoryFn } from "@storybook/react";

export default {
  title: "Step Flow/Test",
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    ariaLabel: {
      control: {
        type: "text",
      },
    },
    ariaLabelledby: {
      control: {
        type: "text",
      },
    },
    ariaDescribedBy: {
      control: {
        type: "text",
      },
    },
    category: {
      control: {
        type: "text",
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    totalSteps: {
      control: {
        min: 1,
        max: 8,
        step: 1,
        type: "range",
      },
    },
    currentStep: {
      control: {
        min: 1,
        max: 8,
        step: 1,
        type: "range",
      },
    },
    showProgressIndicator: {
      control: {
        type: "boolean",
      },
    },
    showCloseIcon: {
      control: {
        type: "boolean",
      },
    },
  },
};

export const Default = (props: Partial<StepFlowProps>) => (
  <StepFlow title="default" currentStep={1} totalSteps={8} {...props} />
);

Default.storyName = "Default";

export const DefaultWithAriaLabel = () => (
  <StepFlow
    title="default"
    currentStep={1}
    totalSteps={8}
    aria-label="This is step flow"
  />
);

DefaultWithAriaLabel.storyName = "Default with aria-label";

export const DefaultWithAriaLabelledBy = () => (
  <>
    <StepFlow
      title="default"
      currentStep={1}
      totalSteps={8}
      aria-labelledby="ariaLabelledBy-text"
    />
    <Typography as="span" id="ariaLabelledBy-text">
      This is step flow
    </Typography>
  </>
);

DefaultWithAriaLabelledBy.storyName = "Default with aria-labelledby";

export const DefaultWithAriaDescribedBy = () => (
  <>
    <StepFlow
      title="default"
      currentStep={1}
      totalSteps={8}
      aria-describedby="ariaDescribedBy-text"
    />
    <Typography mt={3} id="ariaDescribedBy-text">
      This is step flow. A step flow represents an end-to-end journey that a
      user can complete in one go. It has a specific start and end point. It
      shows the current step and the total number of steps in the journey
    </Typography>
  </>
);

DefaultWithAriaDescribedBy.storyName = "Default with aria-describedby";

export const AllChromaticScenarios = () => {
  const titleNodeWithIcon = (
    <Box display="flex" alignItems="center" gap="8px">
      <Icon type="bin" />
      <StepFlowTitle titleString="Step title" />
    </Box>
  );

  const titleNodeWithSROnlyTitle = (
    <Box display="flex" alignItems="center" gap="8px">
      <StepFlowTitle
        titleVariant="h2"
        titleString="Step title"
        screenReaderOnlyTitle="Step Title with a pointer image"
      />
      <Image alt="" src={pointSvg} decorative size={50} />
    </Box>
  );

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      gap="32px"
      p={4}
    >
      <Box>
        <Typography mb={2} fontWeight="700">
          Default
        </Typography>
        <StepFlow
          title="Step title"
          titleVariant="h2"
          currentStep={1}
          totalSteps={6}
        />
      </Box>

      <Box>
        <Typography mb={2} fontWeight="700">
          Title Node
        </Typography>
        <StepFlow
          title={titleNodeWithIcon}
          titleVariant="h2"
          currentStep={1}
          totalSteps={6}
        />
      </Box>

      <Box>
        <Typography mb={2} fontWeight="700">
          Title Node – Screen Reader Only Title
        </Typography>
        <StepFlow
          title={titleNodeWithSROnlyTitle}
          currentStep={1}
          totalSteps={6}
        />
      </Box>

      <Box>
        <Typography mb={2} fontWeight="700">
          Category
        </Typography>
        <StepFlow
          category="Main goal"
          title="Step title"
          currentStep={1}
          totalSteps={6}
          titleVariant="h2"
        />
      </Box>

      <Box>
        <Typography mb={2} fontWeight="700">
          Show Progress Indicator
        </Typography>
        <StepFlow
          category="Main goal"
          title="Step title"
          currentStep={1}
          totalSteps={6}
          showProgressIndicator
          titleVariant="h2"
        />
      </Box>

      <Box>
        <Typography mb={2} fontWeight="700">
          Show Total Steps
        </Typography>
        <StepFlow
          category="Main goal"
          title="Step title"
          currentStep={5}
          totalSteps={6}
          showProgressIndicator
          titleVariant="h2"
        />
      </Box>

      <Box>
        <Typography mb={2} fontWeight="700">
          Show Close Icon
        </Typography>
        <StepFlow
          category="Main goal"
          title="Step title"
          currentStep={1}
          totalSteps={6}
          showCloseIcon
          onDismiss={() => undefined}
          titleVariant="h2"
        />
      </Box>
    </Box>
  );
};

AllChromaticScenarios.storyName = "All Chromatic Scenarios";
AllChromaticScenarios.parameters = {
  chromatic: { disableSnapshot: false },
};

export const ExampleImplementationWithTitleNode: StoryFn = () => {
  const lowestStep = 1;
  const highestStep = 3;

  const [isOpen, setIsOpen] = useState(true);
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
        aria-label="Step flow example with title node"
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
};
ExampleImplementationWithTitleNode.storyName =
  "Example Implementation with title node";
