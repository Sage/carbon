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

export const Playground: Story = {
  render: (args) => {
    const content = <Typography {...args}>{args.children}</Typography>;

    if (args.inverse) {
      return (
        <Box backgroundColor="black" p={2}>
          {content}
        </Box>
      );
    }

    return content;
  },
  args: {
    children: "Typography content",
    variant: "p",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["neutral", "subtle", "caution", "info", "negative", "positive"],
    },
  },
};
Playground.storyName = "Playground";

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
