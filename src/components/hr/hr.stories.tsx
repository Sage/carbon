import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Hr from ".";
import Box from "../box";
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
  title: "Deprecated/Hr",
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

export const DifferentHeights: Story = () => {
  const heights = ["small", "medium", "large"] as const;
  return (
    <Box>
      {heights.map((height) => (
        <Box key={height} mb={3}>
          <Hr height={height} />
        </Box>
      ))}
    </Box>
  );
};
DifferentHeights.storyName = "Different Heights";

export const InverseType: Story = () => {
  const heights = ["small", "medium", "large"] as const;
  return (
    <>
      <Box backgroundColor="var(--colorsActionMajor500)">
        {heights.map((height) => (
          <Box key={height} mb={3}>
            <Hr type="inverse" height={height} />
          </Box>
        ))}
      </Box>
    </>
  );
};
InverseType.storyName = "Inverse Type";

export const InsideForm: Story = () => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Hr mb={7} mt={7} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
    </Form>
  );
};
InsideForm.storyName = "Inside Form";

export const InsideFormInlineLabels: Story = () => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
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
        value=""
        onChange={() => {}}
      />
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
        value=""
        onChange={() => {}}
      />
      <Box ml="10%" mr="40%">
        <Hr mb={7} mt={7} />
      </Box>
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
        value=""
        onChange={() => {}}
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
