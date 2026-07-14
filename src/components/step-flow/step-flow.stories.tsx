import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button/__next__";
import Form from "../form";
import Dialog from "../dialog";
import Typography from "../typography";
import Textbox from "../textbox";
import Box from "../box";
import Icon from "../icon";

import { StepFlow, StepFlowTitle, StepFlowHandle, Steps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof StepFlow> = {
  title: "Step Flow",
  component: StepFlow,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof StepFlow>;

export const Default: Story = {
  render: ({ ...args }) => <StepFlow {...args} />,
  args: {
    title: "Title",
    currentStep: 4,
    totalSteps: 8,
  },
};

const titleNode = (
  <Box display="flex" alignItems="center" gap={1}>
    <Icon type="placeholder" size="large" />
    <StepFlowTitle
      titleString="Custom title"
      screenReaderOnlyTitle="Screen Reader only Title"
    />
  </Box>
);

export const TitleNode: Story = {
  ...Default,
  args: {
    ...Default.args,
    title: titleNode,
  },
};

export const TitleVariant: Story = {
  ...Default,
  args: {
    ...Default.args,
    titleVariant: "h2",
  },
};

export const ShowProgressIndicator: Story = {
  ...Default,
  args: {
    ...Default.args,
    showProgressIndicator: true,
  },
};

export const ShowCloseIcon: Story = {
  ...Default,
  args: {
    ...Default.args,
    showCloseIcon: true,
  },
};

export const ExampleImplementation: Story = () => {
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
};
ExampleImplementation.storyName = "Example Implementation";
