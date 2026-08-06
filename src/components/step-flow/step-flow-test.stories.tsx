import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Typography from "../typography";
import Button from "../button/__next__";
import Form from "../form";
import Textbox from "../textbox";
import Box from "../box";
import Icon from "../icon";
import { StepFlow, StepFlowTitle, StepFlowHandle, Steps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof StepFlow> = {
  title: "Step Flow/Test",
  component: StepFlow,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof StepFlow>;

const titleNode = (
  <Box display="flex" alignItems="center" gap={1}>
    <Icon type="placeholder" size="large" />
    <StepFlowTitle
      titleString="Custom title"
      screenReaderOnlyTitle="Screen Reader only Title"
    />
  </Box>
);

const ExampleImplementation = () => {
  const [step, setStep] = useState(3);
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
      <StepFlow
        title="Example Implementation"
        titleVariant="h2"
        currentStep={step as Steps}
        totalSteps={5}
        ref={stepFlowHandle}
        showProgressIndicator
        showCloseIcon
        onDismiss={() => {}}
        mt={4}
      />
      <Form
        fieldSpacing={2}
        {...(step !== 1 && {
          leftSideButtons: (
            <Button variantType="secondary" onClick={() => handleClick("Back")}>
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
    </>
  );
};

export const AllChromaticScenarios: Story = {
  render: ({ ...args }) => (
    <Box display="flex" flexDirection="column" gap={4}>
      <StepFlow {...args} currentStep={1} />
      <StepFlow {...args} currentStep={8} />

      <StepFlow {...args} category="Category" />
      <StepFlow {...args} title={titleNode} />
      <StepFlow {...args} showCloseIcon />

      <StepFlow
        {...args}
        currentStep={1}
        totalSteps={4}
        showProgressIndicator
      />
      <StepFlow {...args} currentStep={1} showProgressIndicator />
      <StepFlow {...args} showProgressIndicator />
      <StepFlow {...args} currentStep={8} showProgressIndicator />

      <ExampleImplementation />
    </Box>
  ),
  args: {
    title: "Title",
    currentStep: 4,
    totalSteps: 8,
  },
};
