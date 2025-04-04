/* eslint-disable no-console */
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Box from "../box";
import Typography from "../typography";
import Accordion from "./accordion.component";

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
  decorators: [
    (Story) => (
      <Box px={4} width="90%">
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const DefaultAccordion: Story = () => {
  return <Accordion title="Default">Content</Accordion>;
};
DefaultAccordion.storyName = "Default";

export const ExpandedByDefault: Story = () => {
  return (
    <Accordion title="Expanded by default" expanded>
      Content
    </Accordion>
  );
};
ExpandedByDefault.storyName = "Expanded by Default";

export const LeftAlignedIcon: Story = () => {
  return (
    <Accordion title="Left-aligned Icon" iconAlign="left">
      Content
    </Accordion>
  );
};
LeftAlignedIcon.storyName = "Left-aligned Icon";

export const RightAlignedIcon: Story = () => {
  return (
    <Accordion title="Right-aligned Icon" iconAlign="right">
      Content
    </Accordion>
  );
};
RightAlignedIcon.storyName = "Right-aligned Icon";

export const OpenTitle: Story = () => {
  return (
    <Accordion title="Default" openTitle="Open Title">
      Content
    </Accordion>
  );
};
OpenTitle.storyName = "Open Title";

export const CustomTitleNode: Story = () => {
  return (
    <Accordion
      title={
        <Box>
          <Typography
            variant="segment-header"
            backgroundColor="black"
            color="white"
          >
            Custom Title Node
          </Typography>
        </Box>
      }
    >
      Content
    </Accordion>
  );
};
CustomTitleNode.storyName = "Custom Title Node";

export const Subtle: Story = () => {
  return (
    <Accordion title="Subtle" variant="subtle">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Subtle.storyName = "Subtle";

export const WithError: Story = () => {
  return (
    <Accordion error="Error" title="Default">
      Content
    </Accordion>
  );
};
WithError.storyName = "With Error";

export const WithWarning: Story = () => {
  return (
    <Accordion warning="Warning" title="Default">
      Content
    </Accordion>
  );
};
WithWarning.storyName = "With Warning";

export const WithInfo: Story = () => {
  return (
    <Accordion info="Info" title="Default">
      Content
    </Accordion>
  );
};
WithInfo.storyName = "With Info";

export const DisabledContentPadding: Story = () => {
  return (
    <Accordion disableContentPadding title="Disabled content padding">
      Content
    </Accordion>
  );
};
DisabledContentPadding.storyName = "Disabled Content Padding";

export const WithSubtitle: Story = () => {
  return (
    <Accordion title="Default" subTitle="Shiny subtitle">
      Content
    </Accordion>
  );
};
WithSubtitle.storyName = "With Subtitle";

export const IconVariant: Story = () => {
  return (
    <Accordion title="Icon variant" iconType="dropdown">
      Content
    </Accordion>
  );
};
IconVariant.storyName = "Icon Variant";

export const FullBorders: Story = () => {
  return (
    <Accordion title="Full borders" borders="full">
      Content
    </Accordion>
  );
};
FullBorders.storyName = "Full Borders";

export const NoBorders: Story = () => {
  return (
    <Accordion title="No borders" borders="none">
      Content
    </Accordion>
  );
};
NoBorders.storyName = "No Borders";

export const SmallSize: Story = () => {
  return (
    <Accordion title="Small" size="small">
      Content
    </Accordion>
  );
};
SmallSize.storyName = "Small Size";

export const HeaderSpacing: Story = () => {
  return (
    <Accordion
      title="Header spacing"
      headerSpacing={{ mt: 8, mb: 4, ml: 2, mr: 1 }}
    >
      Content
    </Accordion>
  );
};
HeaderSpacing.storyName = "Header Spacing";

export const CustomChangeHandler: Story = () => {
  return (
    <Accordion
      title="Custom change handler"
      onChange={(e, isExpanded) => {
        console.log(isExpanded);
      }}
    >
      Content
    </Accordion>
  );
};
CustomChangeHandler.storyName = "Custom Change Handler";

export const CustomWidth: Story = () => {
  return (
    <Accordion title="Width" width="150px">
      Content
    </Accordion>
  );
};
CustomWidth.storyName = "Custom Width";

export const GroupedSemantically: Story = () => {
  return (
    <>
      <Accordion title="Grouped Accordion 1" groupName="group">
        Content
      </Accordion>
      <Accordion title="Grouped Accordion 2" groupName="group">
        Content
      </Accordion>
      <Accordion title="Grouped Accordion 3" groupName="group">
        Content
      </Accordion>
    </>
  );
};
GroupedSemantically.storyName = "Grouped Semantically";
