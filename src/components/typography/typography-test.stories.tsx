import React from "react";
import { ArgTypes } from "@storybook/react";
import Typography, { TypographyProps } from ".";
import { VARIANT_TYPES } from "./typography.component";
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
  tint: {
    options: ["default", "alt"],
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

// Covers props not exercised by AllVariants: inverse, size, tint, weight, fluid
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

    {/* Tint */}
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="p" tint="default">
        p tint default
      </Typography>
      <Typography variant="p" tint="alt">
        p tint alt
      </Typography>
      <Typography variant="strong" tint="default">
        strong tint default
      </Typography>
      <Typography variant="strong" tint="alt">
        strong tint alt
      </Typography>
      <Typography variant="b" tint="default">
        b tint default
      </Typography>
      <Typography variant="b" tint="alt">
        b tint alt
      </Typography>
      <Typography variant="p" tint="default">
        Text with{" "}
        <Typography variant="sup" tint="default">
          sup
        </Typography>{" "}
        tint default
      </Typography>
      <Typography variant="p" tint="alt">
        Text with{" "}
        <Typography variant="sub" tint="alt">
          sub
        </Typography>{" "}
        tint alt
      </Typography>
      <Typography variant="ul" tint="default">
        <li>ul tint default</li>
      </Typography>
      <Typography variant="ul" tint="alt">
        <li>ul tint alt</li>
      </Typography>
      <Typography variant="ol" tint="default">
        <li>ol tint default</li>
      </Typography>
      <Typography variant="ol" tint="alt">
        <li>ol tint alt</li>
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
