import React from "react";
import Typography from "../typography";
import { StepFlow, StepFlowProps } from ".";

export default {
  title: "Step Flow/Test",
  parameters: {
    info: { disable: true },
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

export const DefaultWithMargin = (props: Partial<StepFlowProps>) => (
  <StepFlow
    title="default"
    currentStep={1}
    totalSteps={8}
    {...props}
    m="20px"
  />
);

DefaultWithMargin.storyName = "Default with margin";

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
