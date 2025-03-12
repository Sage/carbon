import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { NewAccordion } from ".";
import { AccordionGroup } from "../accordion";
import Box from "../box/box.component";

const meta: Meta<typeof NewAccordion> = {
  title: "Accordion_New",
  component: NewAccordion,
};
export default meta;
type Story = StoryObj<typeof NewAccordion>;

export const Default: Story = () => {
  return (
    <NewAccordion title="Default">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
  );
};
Default.storyName = "Default";

export const CustomWidth: Story = () => {
  return (
    <NewAccordion title="Custom width" width="300px">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
  );
};
CustomWidth.storyName = "Custom Width";

export const DefaultBorders: Story = () => (
  <NewAccordion title="Default borders" borders="default">
    <Box>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </NewAccordion>
);
DefaultBorders.storyName = "Default Borders";

export const FullBorders: Story = () => (
  <NewAccordion title="Full borders" borders="full">
    <Box>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </NewAccordion>
);
FullBorders.storyName = "Full Borders";

export const NoBorders: Story = () => (
  <NewAccordion title="Default borders" borders="none">
    <Box>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </NewAccordion>
);
NoBorders.storyName = "No Borders";

export const Subtle: Story = () => (
  <NewAccordion title="Subtle" variant="subtle">
    <Box>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </NewAccordion>
);
Subtle.storyName = "Subtle";

export const Small: Story = () => (
  <NewAccordion title="Subtle" size="small">
    <Box>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </NewAccordion>
);
Small.storyName = "Small";

export const Validations: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <NewAccordion title="Error" error="Error message">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>

    <NewAccordion title="Warning" warning="Warning message">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>

    <NewAccordion title="Info" info="Info message">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>

    <NewAccordion
      title="Accordion with a really long title and validation"
      info="Info message"
    >
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
  </Box>
);
Validations.storyName = "Validations";

export const Subtitle: Story = () => (
  <NewAccordion title="Subtitle" subTitle="This is a subtitle example">
    <Box>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </NewAccordion>
);
Subtitle.storyName = "Subtitle";

export const DisabledContentPadding: Story = () => (
  <NewAccordion title="Disabled content padding" disableContentPadding>
    <Box>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </NewAccordion>
);
DisabledContentPadding.storyName = "Disabled Content Padding";

export const LeftAlignedIcon: Story = () => (
  <NewAccordion title="Left-aligned icon" iconAlign="left">
    <Box>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </NewAccordion>
);
LeftAlignedIcon.storyName = "Left-Aligned Icon";

export const HeaderSpacing: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <NewAccordion title={`Header Spacing: ${i}`} headerSpacing={{ p: i }}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </NewAccordion>
    ))}
  </Box>
);
HeaderSpacing.storyName = "Header Spacing";

export const Grouped: Story = () => (
  <AccordionGroup>
    <NewAccordion title="Grouped Accordion 1">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
    <NewAccordion title="Grouped Accordion 2">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
    <NewAccordion title="Grouped Accordion 3">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
  </AccordionGroup>
);
Grouped.storyName = "Grouped";

export const Controlled: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isOpen);
  };
  return (
    <NewAccordion title="Controlled" expanded={isOpen} onChange={handleChange}>
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
  );
};
Controlled.storyName = "Controlled";

export const Uncontrolled: Story = () => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean,
  ) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log("Uncontrolled expanded state: ", isExpanded);
  };
  return (
    <NewAccordion title="Uncontrolled" defaultExpanded onChange={handleChange}>
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
  );
};
Uncontrolled.storyName = "Uncontrolled";

export const OpenTitle: Story = () => {
  return (
    <NewAccordion title="Closed Title" openTitle="Open Title">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
  );
};
OpenTitle.storyName = "Open Title";

export const TitleAsNode: Story = () => {
  return (
    <NewAccordion
      title={
        <Box backgroundColor="green" color="white">
          Title as a React Node
        </Box>
      }
    >
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </NewAccordion>
  );
};
TitleAsNode.storyName = "Title As Node";
