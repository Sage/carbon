import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Box from "../../box";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import Typography from ".";
import { ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES } from "./config";

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
    <Typography variant="h1">Heading Level 1</Typography>
    <Typography variant="h2">Heading Level 2</Typography>
    <Typography variant="h3">Heading Level 3</Typography>
    <Typography variant="h4">Heading Level 4</Typography>
    <Typography variant="h5">Heading Level 5</Typography>
    <Typography variant="section-heading">Segment Header</Typography>
    <Typography variant="section-subheading">Segment Subheader</Typography>
    <Typography variant="p">P (Default)</Typography>
  </Box>
);
VariantsStory.storyName = "Variants";

export const FluidStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
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
    <Typography fluid variant="p">
      P (Default)
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
  </Box>
);
InverseStory.storyName = "Inverse";

export const SizeStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" size="regular">
      Regular size paragraph text
    </Typography>
    <Typography variant="p" size="large">
      Large size paragraph text
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
      Alternative tint paragraph text
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
  </Box>
);
WeightStory.storyName = "Weight";
