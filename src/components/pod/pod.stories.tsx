import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Button from "../button";
import { GridContainer, GridItem } from "../grid";
import Typography from "../typography";
import Pod from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Pod> = {
  title: "Deprecated/Pod",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  component: Pod,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Pod>;

export const Default: Story = () => {
  return <Pod title="Title">Content</Pod>;
};
Default.storyName = "Default";

export const WithTitleAndSubtitleNode: Story = () => {
  return (
    <Pod
      title={<Typography variant="h1">Title</Typography>}
      subtitle={<Typography variant="h2">Subtitle</Typography>}
    >
      Content
    </Pod>
  );
};
WithTitleAndSubtitleNode.storyName = "With Title and Subtitle Node";

export const WithCustomHeight: Story = () => {
  return (
    <Pod title="Title" subtitle="Subtitle" footer="Footer" height={350}>
      Content
    </Pod>
  );
};
WithCustomHeight.storyName = "With Custom Height";

export const EvenHeightMultiplePods: Story = () => {
  return (
    <GridContainer>
      <GridItem gridColumn="1/5">
        <Pod height="100%">
          <Typography variant="big" mb={2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMa ker including versions of Lorem Ipsum.
          </Typography>
        </Pod>
      </GridItem>
      <GridItem gridColumn="5/9">
        <Pod height="100%">
          <Typography mb={2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software lie
            Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Pod>
      </GridItem>
      <GridItem gridColumn="9/13">
        <Pod height="100%">
          <Typography mb={2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Pod>
      </GridItem>
    </GridContainer>
  );
};
EvenHeightMultiplePods.storyName = "Even Height Multiple Pods";

export const WithSubtitleAndFooter: Story = () => {
  return (
    <Pod title="Title" subtitle="Subtitle" footer="Footer">
      Content
    </Pod>
  );
};
WithSubtitleAndFooter.storyName = "With Subtitle and Footer";

export const WithoutBorder: Story = () => {
  return (
    <Pod title="Title" subtitle="Subtitle" footer="Footer" border={false}>
      Content
    </Pod>
  );
};
WithoutBorder.storyName = "Without Border";

export const WithEditButton: Story = () => {
  return (
    <Pod title="Title" subtitle="Subtitle" footer="Footer" onEdit={() => {}}>
      Content
    </Pod>
  );
};
WithEditButton.storyName = "With Edit Button";
WithEditButton.parameters = { chromatic: { disableSnapshot: true } };

export const WithDeleteButton: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      onDelete={() => {}}
      onUndo={() => {}}
    >
      Content
    </Pod>
  );
};
WithDeleteButton.storyName = "With Delete Button";
WithDeleteButton.parameters = { chromatic: { disableSnapshot: true } };

export const SoftDeleteState: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onUndo={() => {}}
      softDelete
    >
      Soft delete state
    </Pod>
  );
};
SoftDeleteState.storyName = "Soft Delete State";
SoftDeleteState.parameters = { chromatic: { disableSnapshot: true } };

export const WithDisplayEditButtonOnHover: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      displayEditButtonOnHover
    >
      Content
    </Pod>
  );
};
WithDisplayEditButtonOnHover.storyName = "With Display Edit Button On Hover";
WithDisplayEditButtonOnHover.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithEditContentFullWidth: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      onDelete={() => {}}
      editContentFullWidth
    >
      Content
    </Pod>
  );
};
WithEditContentFullWidth.storyName = "With Edit Content Full Width";

export const WithInternalEditButton: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      internalEditButton
      onEdit={() => {}}
      onDelete={() => {}}
    >
      Content
    </Pod>
  );
};
WithInternalEditButton.storyName = "With Internal Edit Button";

export const WithDifferentVariants: Story = () => {
  const variants = [
    "primary",
    "secondary",
    "tertiary",
    "tile",
    "transparent",
  ] as const;

  return (
    <Box>
      {variants.map((variant) => (
        <Pod
          key={variant}
          title="Title"
          subtitle="Subtitle"
          footer="Footer"
          onEdit={() => {}}
          onDelete={() => {}}
          variant={variant}
          mb={3}
        >
          {variant}
        </Pod>
      ))}
    </Box>
  );
};
WithDifferentVariants.storyName = "With Different Variants";

export const WithDifferentSizes: Story = () => {
  const sizes = [
    "extra-small",
    "small",
    "medium",
    "large",
    "extra-large",
  ] as const;
  return (
    <Box>
      {sizes.map((size) => (
        <Box key={size}>
          <Pod
            title="Title"
            subtitle="with edit and delete buttons"
            footer="Footer"
            onEdit={() => {}}
            onDelete={() => {}}
            size={size}
            mb={3}
          >
            {size}
          </Pod>
          <Pod
            title="Title"
            subtitle="with undo button"
            footer="Footer"
            onUndo={() => {}}
            softDelete
            size={size}
            mb={3}
          >
            {size}
          </Pod>
        </Box>
      ))}
    </Box>
  );
};
WithDifferentSizes.storyName = "With Different Sizes";

export const WithDifferentTitleAlignments: Story = () => {
  const alignments = ["left", "center", "right"] as const;
  return (
    <Box>
      {alignments.map((alignment) => (
        <Pod
          key={alignment}
          title="Title"
          subtitle="Subtitle"
          footer="Footer"
          onEdit={() => {}}
          alignTitle={alignment}
          mb={3}
        >
          {alignment}
        </Pod>
      ))}
    </Box>
  );
};
WithDifferentTitleAlignments.storyName = "With Different Title Alignments";

export const AddressExample: Story = () => {
  return (
    <Pod internalEditButton variant="tertiary">
      <Box>
        <Typography variant="h4" fontWeight="500">
          Unit 1
        </Typography>
        <Typography m={0}>South Nelson Industrial Estate</Typography>
        <Typography m={0}>Cramlington</Typography>
        <Typography m={0}>NE23 1WF</Typography>
        <Typography m={0}>United Kingdom</Typography>
      </Box>
      <Button buttonType="tertiary" size="small" mt={1} px={0}>
        Select a different address
      </Button>
      <Box position="absolute" right="8px" top="8px">
        <Button
          buttonType="tertiary"
          size="small"
          iconType="edit"
          iconPosition="after"
        >
          Edit
        </Button>
      </Box>
    </Pod>
  );
};
AddressExample.storyName = "Address Example";
