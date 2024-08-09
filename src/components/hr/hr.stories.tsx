/* eslint-disable no-console */
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Hr from ".";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";

const styledSystemProps = generateStyledSystemProps(
  {
    margin: true,
  },
  { mt: "3", mb: "3" },
);

const meta: Meta<typeof Hr> = {
  title: "Hr",
  component: Hr,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Hr>;

export const Default: Story = () => {
  return <Hr />;
};
Default.storyName = "Default";

export const DifferentSpacing: Story = () => {
  return <Hr mt={7} mb={7} />;
};
DifferentSpacing.storyName = "Different Spacing";

export const InsideForm: Story = () => {
  return (
    <Form
      onSubmit={() => console.log("submit")}
      leftSideButtons={
        <Button onClick={() => console.log("cancel")}>Cancel</Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Hr mb={7} mt={7} />
      <Textbox label="Textbox" />
    </Form>
  );
};
InsideForm.storyName = "Inside Form";

export const InsideFormInlineLabels: Story = () => {
  return (
    <Form
      onSubmit={() => console.log("submit")}
      leftSideButtons={
        <Button onClick={() => console.log("cancel")}>Cancel</Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
      />
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
      />
      <Hr mb={7} mt={7} ml="10%" mr="40%" />
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
      />
    </Form>
  );
};
InsideFormInlineLabels.storyName = "Inside Form with Inline Labels";

export const EnablingAdaptiveBehaviour: Story = () => {
  return <Hr mb={7} mt={7} ml="10%" mr="40%" adaptiveMxBreakpoint={960} />;
};
EnablingAdaptiveBehaviour.storyName = "Enabling Adaptive Behaviour";
EnablingAdaptiveBehaviour.parameters = { chromatic: { disableSnapshot: true } };
