import React from "react";
import { ComponentStory } from "@storybook/react";

import Pod from ".";
import Box from "../box";
import Button from "../button";
import { GridContainer, GridItem } from "../grid";
import Typography from "../typography";

export const Default: ComponentStory<typeof Pod> = () => (
  <Pod title="Title">Content</Pod>
);

export const WithTitleAndSubtitleNode: ComponentStory<typeof Pod> = () => (
  <Pod
    title={<Typography variant="h1">Title</Typography>}
    subtitle={<Typography variant="h2">Subtitle</Typography>}
  >
    Content
  </Pod>
);

export const WithCustomHeight: ComponentStory<typeof Pod> = () => (
  <Pod title="Title" subtitle="Subtitle" footer="Footer" height={350}>
    Content
  </Pod>
);

export const EvenHeightMultiplePods: ComponentStory<typeof Pod> = () => (
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
          passages, and more recently with desktop publishing software lie Aldus
          PageMaker including versions of Lorem Ipsum.
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

export const WithSubtitleAndFooter: ComponentStory<typeof Pod> = () => (
  <Pod title="Title" subtitle="Subtitle" footer="Footer">
    Content
  </Pod>
);

export const WithoutBorder: ComponentStory<typeof Pod> = () => (
  <Pod title="Title" subtitle="Subtitle" footer="Footer" border={false}>
    Content
  </Pod>
);

export const WithEditButton: ComponentStory<typeof Pod> = () => (
  <Pod title="Title" subtitle="Subtitle" footer="Footer" onEdit={() => {}}>
    Content
  </Pod>
);
WithEditButton.parameters = { chromatic: { disableSnapshot: true } };

export const WithDeleteButton: ComponentStory<typeof Pod> = () => (
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
WithDeleteButton.parameters = { chromatic: { disableSnapshot: true } };

export const SoftDeleteState: ComponentStory<typeof Pod> = () => (
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
SoftDeleteState.parameters = { chromatic: { disableSnapshot: true } };

export const WithDisplayEditButtonOnHover: ComponentStory<typeof Pod> = () => (
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
WithDisplayEditButtonOnHover.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithEditContentFullWidth: ComponentStory<typeof Pod> = () => (
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

export const WithInternalEditButton: ComponentStory<typeof Pod> = () => (
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

export const WithDifferentVariants: ComponentStory<typeof Pod> = () => {
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

export const WithDifferentSizes: ComponentStory<typeof Pod> = () => {
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

export const WithDifferentTitleAlignments: ComponentStory<typeof Pod> = () => {
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

export const AddressExample: ComponentStory<typeof Pod> = () => (
  <Pod internalEditButton variant="tertiary">
    <Box>
      <Typography variant="h5" fontWeight="700">
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
