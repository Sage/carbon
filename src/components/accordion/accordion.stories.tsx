import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionGroup } from ".";
import Box from "../box/box.component";
import Button from "../button/button.component";

import Textbox from "../textbox/textbox.component";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import Typography from "../typography";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const AccordionDefault: Story = () => {
  return (
    <Accordion title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
AccordionDefault.storyName = "Default";

export const WithDisableContentPadding: Story = () => {
  return (
    <Accordion disableContentPadding title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
WithDisableContentPadding.storyName = "With Disabled Content Padding";
WithDisableContentPadding.parameters = {
  chromatic: { disableSnapshot: false },
};

export const Transparent: Story = () => {
  return (
    <Accordion scheme="transparent" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Transparent.storyName = "Transparent";
Transparent.parameters = { chromatic: { disableSnapshot: false } };

export const Small: Story = () => {
  return (
    <Accordion size="small" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Small.storyName = "Small";

export const Subtitle: Story = () => {
  return (
    <Accordion subTitle="Sub title" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Subtitle.storyName = "Subtitle";

export const FullBorder: Story = () => {
  return (
    <Accordion borders="full" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
FullBorder.storyName = "Full Border";

export const NoBorder: Story = () => {
  return (
    <Accordion title="Heading" variant="subtle" borders="none">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
NoBorder.storyName = "No Border";

export const LeftAlignedIcon: Story = () => {
  return (
    <Accordion iconAlign="left" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
LeftAlignedIcon.storyName = "Left-Aligned Icon";

export const DifferentWidth: Story = () => {
  return (
    <Accordion width="500px" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
DifferentWidth.storyName = "Custom Width";

export const WithDifferentPaddingAndMargin: Story = () => {
  return (
    <>
      <Accordion m={0} p={0} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={1} p={1} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={2} p={2} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={3} p={3} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={4} p={4} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={5} p={5} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={6} p={6} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
    </>
  );
};
WithDifferentPaddingAndMargin.storyName = "With Custom Padding And Margins";

export const WithDifferentPaddingAndMarginInAccordionTitle: Story = () => {
  return (
    <>
      <Accordion headerSpacing={{ p: 0 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 1 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 2 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 3 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 4 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 5 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 6 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
    </>
  );
};
WithDifferentPaddingAndMarginInAccordionTitle.storyName =
  "With Custom Title Padding And Margins";

export const Grouped: Story = () => {
  return (
    <AccordionGroup>
      <Accordion title="First Accordion">
        <Box p={2}>
          <Textbox label="Textbox in an Accordion" />
        </Box>
      </Accordion>
      <Accordion title="Second Accordion">
        <Box p={2}>
          <Textbox label="Textbox in an Accordion" />
        </Box>
      </Accordion>
      <Accordion title="Third Accordion">
        <Box p={2}>
          <Box>Content</Box>
          <Box>Content</Box>
          <Box>Content</Box>
        </Box>
      </Accordion>
    </AccordionGroup>
  );
};
Grouped.storyName = "Grouped";

export const WithValidationIcon: Story = () => {
  return (
    <AccordionGroup>
      <Accordion title="Heading" expanded error="This is an error state">
        <Typography>Content</Typography>
      </Accordion>
      <Accordion title="Heading" expanded warning="This is a warning state">
        <Typography>Content</Typography>
      </Accordion>
      <Accordion title="Heading" expanded info="This is an info state">
        <Typography>Content</Typography>
      </Accordion>
    </AccordionGroup>
  );
};
WithValidationIcon.storyName = "With Validation Icon";

export const WithDynamicContent: Story = () => {
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
      <Button onClick={() => modifyContentCount(1)}>Add content</Button>
      <Button onClick={() => modifyContentCount(-1)} ml={2}>
        Remove content
      </Button>
      <Accordion mt={2} title="Title">
        {Array.from(Array(contentCount).keys()).map((value) => (
          <Box key={value} mt={2}>
            Content
          </Box>
        ))}
      </Accordion>
    </>
  );
};
WithDynamicContent.storyName = "With Dynamic Content";

export const AccordionSubtle: Story = () => {
  return (
    <Accordion title="Heading" variant="subtle">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
AccordionSubtle.storyName = "Subtle Variant";
