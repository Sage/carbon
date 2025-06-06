import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
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

export const Default: Story = () => {
  return (
    <Accordion title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Default.storyName = "Default";

export const WithTitle: Story = () => {
  return (
    <Accordion title="Title">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
WithTitle.storyName = "With Title";

export const WithComplexTitle: Story = () => {
  return (
    <Accordion
      title={
        <Typography variant="h4" backgroundColor="blue" color="yellow">
          Title
        </Typography>
      }
    >
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
WithComplexTitle.storyName = "With Complex Title";

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
    <Accordion title="Heading" borders="none">
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

export const CustomWidth: Story = () => {
  return (
    <Accordion width="500px" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
CustomWidth.storyName = "Custom Width";

export const WithCustomPaddingAndMargins: Story = () => {
  return (
    <>
      <Accordion m={0} p={0} title="First Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={1} p={1} title="Second Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={2} p={2} title="Third Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={3} p={3} title="Fourth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={4} p={4} title="Fifth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={5} p={5} title="Sixth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={6} p={6} title="Seventh Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
    </>
  );
};
WithCustomPaddingAndMargins.storyName = "With Custom Padding And Margins";

export const WithCustomTitlePaddingAndMargins: Story = () => {
  return (
    <>
      <Accordion headerSpacing={{ p: 0 }} title="First Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 1 }} title="Second Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 2 }} title="Third Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 3 }} title="Fourth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 4 }} title="Fifth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 5 }} title="Sixth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 6 }} title="Seventh Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
    </>
  );
};
WithCustomTitlePaddingAndMargins.storyName =
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
  const [firstAccordionExpanded, setFirstAccordionExpanded] =
    useState<boolean>(true);
  const [secondAccordionExpanded, setSecondAccordionExpanded] =
    useState<boolean>(true);
  const [thirdAccordionExpanded, setThirdAccordionExpanded] =
    useState<boolean>(true);

  const toggleFirstAccordion = () => {
    setFirstAccordionExpanded(!firstAccordionExpanded);
  };
  const toggleSecondAccordion = () => {
    setSecondAccordionExpanded(!secondAccordionExpanded);
  };
  const toggleThirdAccordion = () => {
    setThirdAccordionExpanded(!thirdAccordionExpanded);
  };

  return (
    <AccordionGroup>
      <Accordion
        title="First Heading"
        expanded={firstAccordionExpanded}
        onChange={toggleFirstAccordion}
        error="This is an error state"
      >
        <Typography>Content</Typography>
      </Accordion>
      <Accordion
        title="Second Heading"
        expanded={secondAccordionExpanded}
        onChange={toggleSecondAccordion}
        warning="This is a warning state"
      >
        <Typography>Content</Typography>
      </Accordion>
      <Accordion
        title="Third Heading"
        expanded={thirdAccordionExpanded}
        onChange={toggleThirdAccordion}
        info="This is an info state"
      >
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

export const SubtleVariant: Story = () => {
  return (
    <Accordion title="Heading" variant="subtle">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
SubtleVariant.storyName = "Subtle Variant";
