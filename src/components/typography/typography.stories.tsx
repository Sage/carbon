import React from "react";
import { Meta, StoryObj, ArgTypes } from "@storybook/react";
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
      disableSnapshot: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const VariantsStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p">P (Default)</Typography>
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
      <Typography as="li">Unordered List</Typography>
      <Typography as="li">Unordered List</Typography>
      <Typography as="li">Unordered List</Typography>
    </Typography>
    <Typography variant="ol">
      <Typography as="li">Ordered List</Typography>
      <Typography as="li">Ordered List</Typography>
      <Typography as="li">Ordered List</Typography>
    </Typography>
  </Box>
);
VariantsStory.storyName = "Variants";

export const FluidStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography fluid variant="p">
      P (Default)
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
    <Typography fluid variant="ul">
      <Typography as="li" fluid>
        Unordered List
      </Typography>
      <Typography as="li" fluid>
        Unordered List
      </Typography>
      <Typography as="li" fluid>
        Unordered List
      </Typography>
    </Typography>
    <Typography fluid variant="ol">
      <Typography as="li" fluid>
        Ordered List
      </Typography>
      <Typography as="li" fluid>
        Ordered List
      </Typography>
      <Typography as="li" fluid>
        Ordered List
      </Typography>
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
  </Box>
);
FluidStory.storyName = "Fluid";
FluidStory.parameters = {
  chromatic: {
    viewports: [320, 768, 1024],
  },
};

export const InverseStory: Story = () => (
  <Box
    backgroundColor="black"
    display="flex"
    flexDirection="column"
    gap={2}
    p={2}
  >
    <Typography variant="p" inverse>
      P (Default)
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
    <Typography variant="ul" inverse>
      <Typography as="li" inverse>
        Unordered List
      </Typography>
      <Typography as="li" inverse>
        Unordered List
      </Typography>
      <Typography as="li" inverse>
        Unordered List
      </Typography>
    </Typography>
    <Typography variant="ol" inverse>
      <Typography as="li" inverse>
        Ordered List
      </Typography>
      <Typography as="li" inverse>
        Ordered List
      </Typography>
      <Typography as="li" inverse>
        Ordered List
      </Typography>
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
    <Typography variant="ul" size="M">
      <Typography as="li" size="M">
        Unordered List M
      </Typography>
      <Typography as="li" size="M">
        Unordered List M
      </Typography>
      <Typography as="li" size="M">
        Unordered List M
      </Typography>
    </Typography>
    <Typography variant="ul" size="L">
      <Typography as="li" size="L">
        Unordered List L
      </Typography>
      <Typography as="li" size="L">
        Unordered List L
      </Typography>
      <Typography as="li" size="L">
        Unordered List L
      </Typography>
    </Typography>
    <Typography variant="ol" size="M">
      <Typography as="li" size="M">
        Ordered List M
      </Typography>
      <Typography as="li" size="M">
        Ordered List M
      </Typography>
      <Typography as="li" size="M">
        Ordered List M
      </Typography>
    </Typography>
    <Typography variant="ol" size="L">
      <Typography as="li" size="L">
        Ordered List L
      </Typography>
      <Typography as="li" size="L">
        Ordered List L
      </Typography>
      <Typography as="li" size="L">
        Ordered List L
      </Typography>
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
  </Box>
);
SizeStory.storyName = "Size";

export const TintStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" tint="default">
      Default tint paragraph text
    </Typography>
    <Typography variant="p" tint="alt">
      Alt tint paragraph text
    </Typography>
    <Typography variant="ul" tint="default">
      <Typography as="li" tint="default">
        Unordered List Default
      </Typography>
      <Typography as="li" tint="default">
        Unordered List Default
      </Typography>
      <Typography as="li" tint="default">
        Unordered List Default
      </Typography>
    </Typography>
    <Typography variant="ul" tint="alt">
      <Typography as="li" tint="alt">
        Unordered List Alt
      </Typography>
      <Typography as="li" tint="alt">
        Unordered List Alt
      </Typography>
      <Typography as="li" tint="alt">
        Unordered List Alt
      </Typography>
    </Typography>
    <Typography variant="ol" tint="default">
      <Typography as="li" tint="default">
        Ordered List Default
      </Typography>
      <Typography as="li" tint="default">
        Ordered List Default
      </Typography>
      <Typography as="li" tint="default">
        Ordered List Default
      </Typography>
    </Typography>
    <Typography variant="ol" tint="alt">
      <Typography as="li" tint="alt">
        Ordered List Alt
      </Typography>
      <Typography as="li" tint="alt">
        Ordered List Alt
      </Typography>
      <Typography as="li" tint="alt">
        Ordered List Alt
      </Typography>
    </Typography>
    <Typography variant="strong" tint="default">
      Strong Default
    </Typography>
    <Typography variant="strong" tint="alt">
      Strong Alt
    </Typography>
    <Typography variant="b" tint="default">
      Bold Default
    </Typography>
    <Typography variant="b" tint="alt">
      Bold Alt
    </Typography>
    <Typography variant="p" tint="default">
      Text with{" "}
      <Typography variant="sup" tint="default">
        superscript
      </Typography>{" "}
      default
    </Typography>
    <Typography variant="p" tint="alt">
      Text with{" "}
      <Typography variant="sup" tint="alt">
        superscript
      </Typography>{" "}
      alt
    </Typography>
    <Typography variant="p" tint="default">
      Text with{" "}
      <Typography variant="sub" tint="default">
        subscript
      </Typography>{" "}
      default
    </Typography>
    <Typography variant="p" tint="alt">
      Text with{" "}
      <Typography variant="sub" tint="alt">
        subscript
      </Typography>{" "}
      alt
    </Typography>
  </Box>
);
TintStory.storyName = "Tint";

export const WeightStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" weight="regular">
      Regular weight paragraph text
    </Typography>
    <Typography variant="p" weight="medium">
      Medium weight paragraph text
    </Typography>
    <Typography variant="ul" weight="regular">
      <Typography as="li" weight="regular">
        Unordered List Regular
      </Typography>
      <Typography as="li" weight="regular">
        Unordered List Regular
      </Typography>
      <Typography as="li" weight="regular">
        Unordered List Regular
      </Typography>
    </Typography>
    <Typography variant="ul" weight="medium">
      <Typography as="li" weight="medium">
        Unordered List Medium
      </Typography>
      <Typography as="li" weight="medium">
        Unordered List Medium
      </Typography>
      <Typography as="li" weight="medium">
        Unordered List Medium
      </Typography>
    </Typography>
    <Typography variant="ol" weight="regular">
      <Typography as="li" weight="regular">
        Ordered List Regular
      </Typography>
      <Typography as="li" weight="regular">
        Ordered List Regular
      </Typography>
      <Typography as="li" weight="regular">
        Ordered List Regular
      </Typography>
    </Typography>
    <Typography variant="ol" weight="medium">
      <Typography as="li" weight="medium">
        Ordered List Medium
      </Typography>
      <Typography as="li" weight="medium">
        Ordered List Medium
      </Typography>
      <Typography as="li" weight="medium">
        Ordered List Medium
      </Typography>
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
  </Box>
);
WeightStory.storyName = "Weight";
