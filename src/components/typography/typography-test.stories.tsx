import React from "react";
import { ArgTypes } from "@storybook/react-vite";
import Typography, { TypographyProps } from ".";
import { VARIANT_TYPES } from "./typography.component";
import { TYPOGRAPHY_COLOR_TYPES } from "./__internal__/__next__/typography.component";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import Box from "../box";

const VARIANT_TYPES_ARG_TYPES: ArgTypes = {
  variant: {
    options: VARIANT_TYPES,
    control: {
      type: "select",
    },
  },
  as: {
    control: {
      type: "object",
    },
  },
  fluid: {
    control: "boolean",
  },
  inverse: {
    control: "boolean",
  },
  screenReaderOnly: {
    control: "boolean",
  },
  size: {
    options: ["M", "L"],
    control: {
      type: "select",
    },
  },
  color: {
    options: TYPOGRAPHY_COLOR_TYPES,
    control: {
      type: "select",
    },
  },
  weight: {
    options: ["regular", "medium"],
    control: {
      type: "select",
    },
  },
};

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

export default {
  title: "Typography/Test",
  component: Typography,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
      themeProvider: { chromatic: { theme: "sage" } },
    },
  },
  argTypes: {
    ...VARIANT_TYPES_ARG_TYPES,
    ...ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES,
    ...styledSystemProps,
  },
};

export const Default = ({ children, ...args }: TypographyProps) => {
  return <Typography {...args}>{children}</Typography>;
};
Default.storyName = "default";
Default.args = {
  children: "Typography",
};
Default.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

// Story to display all variants of the typography component (supported & deprecated) to allow visual and DOM comparison
export const AllVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="h1-large">h1-large (Deprecated)</Typography>
    <Typography variant="h1">h1</Typography>
    <Typography variant="h2">h2</Typography>
    <Typography variant="h3">h3</Typography>
    <Typography variant="h4">h4</Typography>
    <Typography variant="h5">h5</Typography>
    <Typography variant="segment-header">
      segment-header (Deprecated)
    </Typography>
    <Typography variant="section-heading">section-heading</Typography>
    <Typography variant="segment-header-small">
      segment-header-small (Deprecated)
    </Typography>
    <Typography variant="segment-subheader">
      segment-subheader (Deprecated)
    </Typography>
    <Typography variant="section-subheading">section-subheading</Typography>
    <Typography variant="segment-subheader-alt">
      segment-subheader-alt (Deprecated)
    </Typography>
    <Typography variant="p">p</Typography>
    <Typography variant="span">span (Deprecated)</Typography>
    <Typography variant="small">small (Deprecated)</Typography>
    <Typography variant="big">big (Deprecated)</Typography>
    <Typography>
      Text with <Typography variant="sup">sup</Typography> content
    </Typography>
    <Typography>
      Text with <Typography variant="sub">sub</Typography> content
    </Typography>
    <Typography variant="strong">strong</Typography>
    <Typography variant="b">b</Typography>
    <Typography variant="em">em (Deprecated)</Typography>
    <Typography variant="ul">
      <li>ul - item 1</li>
      <li>ul - item 2</li>
    </Typography>
    <Typography variant="ol">
      <li>ol - item 1</li>
      <li>ol - item 2</li>
    </Typography>
  </div>
);
AllVariants.storyName = "All Variants (Supported & Deprecated)";

// Covers props not exercised by AllVariants: inverse, size, color, weight, fluid
export const VisualRegressionMatrix = () => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
    gap={4}
    p={2}
  >
    {/* Inverse */}
    <Box
      backgroundColor="black"
      display="flex"
      flexDirection="column"
      gap={1}
      p={2}
      gridColumn="1 / -1"
    >
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        gap={2}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h1" inverse>
            h1 inverse
          </Typography>
          <Typography variant="h2" inverse>
            h2 inverse
          </Typography>
          <Typography variant="h3" inverse>
            h3 inverse
          </Typography>
          <Typography variant="h4" inverse>
            h4 inverse
          </Typography>
          <Typography variant="h5" inverse>
            h5 inverse
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="section-heading" inverse>
            section-heading inverse
          </Typography>
          <Typography variant="section-subheading" inverse>
            section-subheading inverse
          </Typography>
          <Typography variant="p" inverse>
            p inverse
          </Typography>
          <Typography variant="strong" inverse>
            strong inverse
          </Typography>
          <Typography variant="b" inverse>
            b inverse
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="p" inverse>
            Text with{" "}
            <Typography variant="sup" inverse>
              sup
            </Typography>{" "}
            inverse
          </Typography>
          <Typography variant="p" inverse>
            Text with{" "}
            <Typography variant="sub" inverse>
              sub
            </Typography>{" "}
            inverse
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="ul" inverse>
            <li>ul inverse</li>
          </Typography>
          <Typography variant="ol" inverse>
            <li>ol inverse</li>
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* Size */}
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="p" size="M">
        p size M
      </Typography>
      <Typography variant="p" size="L">
        p size L
      </Typography>
      <Typography variant="strong" size="M">
        strong size M
      </Typography>
      <Typography variant="strong" size="L">
        strong size L
      </Typography>
      <Typography variant="b" size="M">
        b size M
      </Typography>
      <Typography variant="b" size="L">
        b size L
      </Typography>
      <Typography variant="p" size="M">
        Text with{" "}
        <Typography variant="sup" size="M">
          sup
        </Typography>{" "}
        size M
      </Typography>
      <Typography variant="p" size="L">
        Text with{" "}
        <Typography variant="sub" size="L">
          sub
        </Typography>{" "}
        size L
      </Typography>
      <Typography variant="ul" size="M">
        <li>ul size M</li>
      </Typography>
      <Typography variant="ul" size="L">
        <li>ul size L</li>
      </Typography>
      <Typography variant="ol" size="M">
        <li>ol size M</li>
      </Typography>
      <Typography variant="ol" size="L">
        <li>ol size L</li>
      </Typography>
    </Box>

    {/* Color */}
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h1" color="neutral">
        h1 color neutral
      </Typography>
      <Typography variant="h2" color="subtle">
        h2 color subtle
      </Typography>
      <Typography variant="h3" color="caution">
        h3 color caution
      </Typography>
      <Typography variant="section-heading" color="info">
        section-heading color info
      </Typography>
      <Typography variant="section-subheading" color="positive">
        section-subheading color positive
      </Typography>
      <Typography variant="p" color="neutral">
        p color neutral
      </Typography>
      <Typography variant="p" color="subtle">
        p color subtle
      </Typography>
      <Typography variant="strong" color="caution">
        strong color caution
      </Typography>
      <Typography variant="strong" color="info">
        strong color info
      </Typography>
      <Typography variant="b" color="negative">
        b color negative
      </Typography>
      <Typography variant="b" color="positive">
        b color positive
      </Typography>
      <Typography variant="p" color="caution">
        Text with{" "}
        <Typography variant="sup" color="caution">
          sup
        </Typography>{" "}
        color caution
      </Typography>
      <Typography variant="p" color="info">
        Text with{" "}
        <Typography variant="sub" color="info">
          sub
        </Typography>{" "}
        color info
      </Typography>
      <Typography variant="ul" color="subtle">
        <li>ul color subtle</li>
      </Typography>
      <Typography variant="ul" color="negative">
        <li>ul color negative</li>
      </Typography>
      <Typography variant="ol" color="positive">
        <li>ol color positive</li>
      </Typography>
      <Typography variant="ol" color="caution">
        <li>ol color caution</li>
      </Typography>
    </Box>

    {/* Weight */}
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="p" weight="regular">
        p weight regular
      </Typography>
      <Typography variant="p" weight="medium">
        p weight medium
      </Typography>
      <Typography variant="strong" weight="regular">
        strong weight regular
      </Typography>
      <Typography variant="strong" weight="medium">
        strong weight medium
      </Typography>
      <Typography variant="b" weight="regular">
        b weight regular
      </Typography>
      <Typography variant="b" weight="medium">
        b weight medium
      </Typography>
      <Typography variant="p" weight="regular">
        Text with{" "}
        <Typography variant="sup" weight="regular">
          sup
        </Typography>{" "}
        weight regular
      </Typography>
      <Typography variant="p" weight="medium">
        Text with{" "}
        <Typography variant="sub" weight="medium">
          sub
        </Typography>{" "}
        weight medium
      </Typography>
      <Typography variant="ul" weight="regular">
        <li>ul weight regular</li>
      </Typography>
      <Typography variant="ul" weight="medium">
        <li>ul weight medium</li>
      </Typography>
      <Typography variant="ol" weight="regular">
        <li>ol weight regular</li>
      </Typography>
      <Typography variant="ol" weight="medium">
        <li>ol weight medium</li>
      </Typography>
    </Box>

    {/* Fluid */}
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography fluid variant="h1">
        h1 fluid
      </Typography>
      <Typography fluid variant="h2">
        h2 fluid
      </Typography>
      <Typography fluid variant="h3">
        h3 fluid
      </Typography>
      <Typography fluid variant="h4">
        h4 fluid
      </Typography>
      <Typography fluid variant="h5">
        h5 fluid
      </Typography>
      <Typography fluid variant="section-heading">
        section-heading fluid
      </Typography>
      <Typography fluid variant="section-subheading">
        section-subheading fluid
      </Typography>
      <Typography fluid variant="p">
        p fluid
      </Typography>
      <Typography fluid variant="strong">
        strong fluid
      </Typography>
      <Typography fluid variant="b">
        b fluid
      </Typography>
      <Typography fluid variant="p">
        Text with{" "}
        <Typography fluid variant="sup">
          sup
        </Typography>{" "}
        fluid
      </Typography>
      <Typography fluid variant="p">
        Text with{" "}
        <Typography fluid variant="sub">
          sub
        </Typography>{" "}
        fluid
      </Typography>
      <Typography fluid variant="ul">
        <li>ul fluid</li>
      </Typography>
      <Typography fluid variant="ol">
        <li>ol fluid</li>
      </Typography>
    </Box>
  </Box>
);
VisualRegressionMatrix.storyName = "Visual Regression Matrix";
VisualRegressionMatrix.parameters = {
  chromatic: { viewports: [1800] },
};

export const VariantsStory = () => (
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

export const FluidStory = () => (
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

export const InverseStory = () => (
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

export const SizeStory = () => (
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

export const ColorStory = () => (
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

export const WeightStory = () => (
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
