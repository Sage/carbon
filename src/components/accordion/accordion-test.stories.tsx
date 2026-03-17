import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionGroup } from ".";
import Box from "../box";
import MultiActionButton from "../multi-action-button";
import SplitButton from "../split-button";
import Button from "../button";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Accordion> = {
  title: "Accordion/Test",
  component: Accordion,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Grouped: Story = ({ ...args }) => (
  <AccordionGroup>
    <Accordion title="Accordion One" {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>

    <Accordion title="Accordion Two" {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>

    <Accordion title="Accordion Three" {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  </AccordionGroup>
);
Grouped.storyName = "Grouped";

export const WithValidation: Story = ({ ...args }) => (
  <>
    <Accordion title="Accordion One" error="Error Message" {...args} />
    <Accordion title="Accordion Two" warning="Warning Message" {...args} />
    <Accordion title="Accordion Three" info="Information Message" {...args} />
  </>
);
WithValidation.storyName = "With Validation";

export const WithMultiAction: Story = ({ ...args }) => {
  return (
    <Accordion title="Accordion" {...args}>
      <Box m={2}>
        <MultiActionButton text="Multi Action Button">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          <Button>Button 5</Button>
        </MultiActionButton>
        <SplitButton text="Split Button">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          <Button>Button 5</Button>
        </SplitButton>
      </Box>
    </Accordion>
  );
};
WithMultiAction.storyName = "With MultiAction and Split Button";

export const WithLongSubtitle: Story = {
  render: (args) => <Accordion {...args} />,
  args: {
    title: "Title",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    width: "500px",
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export const IconAlign = ({ ...args }) => {
  return (
    <>
      <Accordion
        title="Heading"
        subTitle="Icon Left-Aligned"
        iconAlign="left"
        {...args}
      />
      <Accordion
        title="Heading"
        subTitle="Icon Right-Aligned"
        iconAlign="right"
        {...args}
      />
    </>
  );
};
IconAlign.storyName = "Icon Align";
IconAlign.parameters = {
  chromatic: { disableSnapshot: false },
};

export const WithDynamicContent = ({ ...args }) => {
  const [contentCount, setContentCount] = useState(3);
  const modifyContentCount = (modifier: number) => {
    if (modifier === 1) {
      setContentCount(contentCount + 1);
    }
    if (modifier === -1 && contentCount > 0) {
      setContentCount(contentCount - 1);
    }
  };

  return (
    <>
      <Button m={2} onClick={() => modifyContentCount(1)}>
        Add content
      </Button>
      <Button m={2} onClick={() => modifyContentCount(-1)}>
        Remove content
      </Button>
      <Accordion title="Title" defaultExpanded {...args}>
        {Array.from(Array(contentCount).keys()).map((value) => (
          <Box key={value} my={2}>
            Content
          </Box>
        ))}
      </Accordion>
    </>
  );
};
WithDynamicContent.storyName = "With Dynamic Content";

export const OpenState: Story = {
  render: (args) => (
    <>
      <Accordion {...args}>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>

      <Accordion variant="simple" mt={2} {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>
    </>
  ),
  args: {
    title: "Accordion Title",
    defaultExpanded: true,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};
