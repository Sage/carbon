import React from "react";
import { Meta, StoryObj, ArgTypes } from "@storybook/react-vite";
import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import Typography from ".";

const ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES: ArgTypes = {
  textTransform: {
    control: "text",
    description: "CSS text-transform value",
  },
  textDecoration: {
    control: "text",
    description: "CSS text-decoration value",
  },
  display: {
    control: "text",
    description: "CSS display value",
  },
  whiteSpace: {
    control: "text",
    description: "CSS white-space value",
  },
  wordBreak: {
    control: "text",
    description: "CSS word-break value",
  },
  wordWrap: {
    control: "text",
    description: "CSS word-wrap value",
  },
  textAlign: {
    control: "text",
    description: "CSS text-align value",
  },
  textOverflow: {
    control: "text",
    description: "CSS text-overflow value",
  },
  overflow: {
    control: "text",
    description: "CSS overflow value",
  },
};

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Typography> = {
  title: "Typography",
  component: Typography,
  argTypes: {
    ...styledSystemProps,
    ...ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const VariantsStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p">Paragraph (Default)</Typography>
    <Typography variant="h1">Heading Level 1</Typography>
    <Typography variant="h2">Heading Level 2</Typography>
    <Typography variant="h3">Heading Level 3</Typography>
    <Typography variant="h4">Heading Level 4</Typography>
    <Typography variant="h5">Heading Level 5</Typography>
    <Typography variant="section-heading">Section Heading</Typography>
    <Typography variant="section-subheading">Section Subheading</Typography>
    <Typography variant="strong">Strong Text</Typography>
    <Typography variant="b">Bold Text</Typography>
    <Typography variant="p">
      This text contains <Typography variant="sup">superscript</Typography>{" "}
      content
    </Typography>
    <Typography variant="p">
      This text contains <Typography variant="sub">subscript</Typography>{" "}
      content
    </Typography>
    <Typography variant="ul">
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </Typography>
    <Typography variant="ol">
      <li>Ordered List</li>
      <li>Ordered List</li>
      <li>Ordered List</li>
    </Typography>
  </Box>
);
VariantsStory.storyName = "Variants";

export const FluidStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography fluid variant="p">
      Paragraph (Default)
    </Typography>
    <Typography fluid variant="h1">
      Heading Level 1
    </Typography>
    <Typography fluid variant="h2">
      Heading Level 2
    </Typography>
    <Typography fluid variant="h3">
      Heading Level 3
    </Typography>
    <Typography fluid variant="h4">
      Heading Level 4
    </Typography>
    <Typography fluid variant="h5">
      Heading Level 5
    </Typography>
    <Typography fluid variant="section-heading">
      Segment Header
    </Typography>
    <Typography fluid variant="section-subheading">
      Segment Subheader
    </Typography>
    <Typography fluid variant="strong">
      Strong Text
    </Typography>
    <Typography fluid variant="b">
      Bold Text
    </Typography>
    <Typography fluid variant="p">
      This text contains{" "}
      <Typography fluid variant="sup">
        superscript
      </Typography>{" "}
      content
    </Typography>
    <Typography fluid variant="p">
      This text contains{" "}
      <Typography fluid variant="sub">
        subscript
      </Typography>{" "}
      content
    </Typography>
    <Typography fluid variant="ul">
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </Typography>
    <Typography fluid variant="ol">
      <li>Ordered List</li>
      <li>Ordered List</li>
      <li>Ordered List</li>
    </Typography>
  </Box>
);
FluidStory.storyName = "Fluid";

export const InverseStory: Story = () => (
  <Box
    backgroundColor="black"
    display="flex"
    flexDirection="column"
    gap={2}
    p={2}
  >
    <Typography variant="p" inverse>
      Paragraph (Default)
    </Typography>
    <Typography variant="h1" inverse>
      Heading Level 1
    </Typography>
    <Typography variant="h2" inverse>
      Heading Level 2
    </Typography>
    <Typography variant="h3" inverse>
      Heading Level 3
    </Typography>
    <Typography variant="h4" inverse>
      Heading Level 4
    </Typography>
    <Typography variant="h5" inverse>
      Heading Level 5
    </Typography>
    <Typography variant="section-heading" inverse>
      Segment Header
    </Typography>
    <Typography variant="section-subheading" inverse>
      Segment Subheader
    </Typography>
    <Typography variant="strong" inverse>
      Strong Text
    </Typography>
    <Typography variant="b" inverse>
      Bold Text
    </Typography>
    <Typography variant="p" inverse>
      This text contains{" "}
      <Typography variant="sup" inverse>
        superscript
      </Typography>{" "}
      content
    </Typography>
    <Typography variant="p" inverse>
      This text contains{" "}
      <Typography variant="sub" inverse>
        subscript
      </Typography>{" "}
      content
    </Typography>
    <Typography variant="ul" inverse>
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </Typography>
    <Typography variant="ol" inverse>
      <li>Ordered List</li>
      <li>Ordered List</li>
      <li>Ordered List</li>
    </Typography>
  </Box>
);
InverseStory.storyName = "Inverse";

export const SizeStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" size="M">
      M size paragraph text
    </Typography>
    <Typography variant="p" size="L">
      L size paragraph text
    </Typography>
    <Typography variant="strong" size="M">
      Strong M
    </Typography>
    <Typography variant="strong" size="L">
      Strong L
    </Typography>
    <Typography variant="b" size="M">
      Bold M
    </Typography>
    <Typography variant="b" size="L">
      Bold L
    </Typography>
    <Typography variant="p" size="M">
      Text with{" "}
      <Typography variant="sup" size="M">
        superscript
      </Typography>{" "}
      M
    </Typography>
    <Typography variant="p" size="L">
      Text with{" "}
      <Typography variant="sup" size="L">
        superscript
      </Typography>{" "}
      L
    </Typography>
    <Typography variant="p" size="M">
      Text with{" "}
      <Typography variant="sub" size="M">
        subscript
      </Typography>{" "}
      M
    </Typography>
    <Typography variant="p" size="L">
      Text with{" "}
      <Typography variant="sub" size="L">
        subscript
      </Typography>{" "}
      L
    </Typography>
    <Typography variant="ul" size="M">
      <li>Unordered List M</li>
      <li>Unordered List M</li>
      <li>Unordered List M</li>
    </Typography>
    <Typography variant="ul" size="L">
      <li>Unordered List L</li>
      <li>Unordered List L</li>
      <li>Unordered List L</li>
    </Typography>
    <Typography variant="ol" size="M">
      <li>Ordered List M</li>
      <li>Ordered List M</li>
      <li>Ordered List M</li>
    </Typography>
    <Typography variant="ol" size="L">
      <li>Ordered List L</li>
      <li>Ordered List L</li>
      <li>Ordered List L</li>
    </Typography>
  </Box>
);
SizeStory.storyName = "Size";

export const ColorStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="h1" color="neutral">
      H1 neutral
    </Typography>
    <Typography variant="h2" color="subtle">
      H2 subtle
    </Typography>
    <Typography variant="h3" color="caution">
      H3 caution
    </Typography>
    <Typography variant="section-heading" color="info">
      Section heading info
    </Typography>
    <Typography variant="section-subheading" color="positive">
      Section subheading positive
    </Typography>
    <Typography variant="p" color="neutral">
      Neutral paragraph text
    </Typography>
    <Typography variant="p" color="subtle">
      Subtle paragraph text
    </Typography>
    <Typography variant="strong" color="caution">
      Strong caution
    </Typography>
    <Typography variant="strong" color="info">
      Strong info
    </Typography>
    <Typography variant="b" color="negative">
      Bold negative
    </Typography>
    <Typography variant="b" color="positive">
      Bold positive
    </Typography>
    <Typography variant="p" color="caution">
      Text with{" "}
      <Typography variant="sup" color="caution">
        superscript
      </Typography>{" "}
      caution
    </Typography>
    <Typography variant="p" color="info">
      Text with{" "}
      <Typography variant="sup" color="info">
        superscript
      </Typography>{" "}
      info
    </Typography>
    <Typography variant="p" color="negative">
      Text with{" "}
      <Typography variant="sub" color="negative">
        subscript
      </Typography>{" "}
      negative
    </Typography>
    <Typography variant="p" color="positive">
      Text with{" "}
      <Typography variant="sub" color="positive">
        subscript
      </Typography>{" "}
      positive
    </Typography>
    <Typography variant="ul" color="subtle">
      <li>Unordered List Subtle</li>
      <li>Unordered List Subtle</li>
      <li>Unordered List Subtle</li>
    </Typography>
    <Typography variant="ul" color="caution">
      <li>Unordered List Caution</li>
      <li>Unordered List Caution</li>
      <li>Unordered List Caution</li>
    </Typography>
    <Typography variant="ol" color="info">
      <li>Ordered List Info</li>
      <li>Ordered List Info</li>
      <li>Ordered List Info</li>
    </Typography>
    <Typography variant="ol" color="positive">
      <li>Ordered List Positive</li>
      <li>Ordered List Positive</li>
      <li>Ordered List Positive</li>
    </Typography>
  </Box>
);
ColorStory.storyName = "Color";

export const WeightStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" weight="regular">
      Regular weight paragraph text
    </Typography>
    <Typography variant="p" weight="medium">
      Medium weight paragraph text
    </Typography>
    <Typography variant="strong" weight="regular">
      Strong Regular
    </Typography>
    <Typography variant="strong" weight="medium">
      Strong Medium
    </Typography>
    <Typography variant="b" weight="regular">
      Bold Regular
    </Typography>
    <Typography variant="b" weight="medium">
      Bold Medium
    </Typography>
    <Typography variant="p" weight="regular">
      Text with{" "}
      <Typography variant="sup" weight="regular">
        superscript
      </Typography>{" "}
      regular
    </Typography>
    <Typography variant="p" weight="medium">
      Text with{" "}
      <Typography variant="sup" weight="medium">
        superscript
      </Typography>{" "}
      medium
    </Typography>
    <Typography variant="p" weight="regular">
      Text with{" "}
      <Typography variant="sub" weight="regular">
        subscript
      </Typography>{" "}
      regular
    </Typography>
    <Typography variant="p" weight="medium">
      Text with{" "}
      <Typography variant="sub" weight="medium">
        subscript
      </Typography>{" "}
      medium
    </Typography>
    <Typography variant="ul" weight="regular">
      <li>Unordered List Regular</li>
      <li>Unordered List Regular</li>
      <li>Unordered List Regular</li>
    </Typography>
    <Typography variant="ul" weight="medium">
      <li>Unordered List Medium</li>
      <li>Unordered List Medium</li>
      <li>Unordered List Medium</li>
    </Typography>
    <Typography variant="ol" weight="regular">
      <li>Ordered List Regular</li>
      <li>Ordered List Regular</li>
      <li>Ordered List Regular</li>
    </Typography>
    <Typography variant="ol" weight="medium">
      <li>Ordered List Medium</li>
      <li>Ordered List Medium</li>
      <li>Ordered List Medium</li>
    </Typography>
  </Box>
);
WeightStory.storyName = "Weight";
