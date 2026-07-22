import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Icon, { ICON_COLOR_TYPES } from ".";
import Box from "../box";

import { ICONS } from "./icon-config";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Icon> = {
  title: "Icon",
  component: Icon,
  argTypes: {
    ...styledSystemProps,
    color: {
      options: ICON_COLOR_TYPES,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = () => {
  return <Icon type="add" />;
};
Default.storyName = "Default";

export const Sizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <Icon type="add" size={size} key={size} />
      ))}
    </>
  );
};
Sizes.storyName = "Sizes";

export const Inverse: Story = () => {
  return (
    <Box p={2} backgroundColor="#000000">
      <Icon type="add" inverse />
    </Box>
  );
};
Inverse.storyName = "Inverse";

export const VariousBgShapes: Story = () => {
  return (
    <>
      {(["circle", "rounded-rect", "square"] as const).map((bgShape) => (
        <Icon type="add" bgShape={bgShape} bg="#00b000" mr={1} key={bgShape} />
      ))}
    </>
  );
};
VariousBgShapes.storyName = "Various Background Shapes";

export const VariousBgSizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large"] as const).map((bgSize) => (
        <Icon type="add" bg="#00b000" bgSize={bgSize} mr={1} key={bgSize} />
      ))}
    </>
  );
};
VariousBgSizes.storyName = "Various Background Sizes";

export const BgSizesAndFontSizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large"] as const).map((fontSize) => {
        return (["small", "medium", "large"] as const).map((bgSize) => (
          <Icon
            type="add"
            bg="#00b000"
            fontSize={fontSize}
            bgSize={bgSize}
            mr={1}
            key={`${fontSize}_${bgSize}`}
          />
        ));
      })}
    </>
  );
};
BgSizesAndFontSizes.storyName = "Background Sizes and Font Sizes";

export const ColorPresets: Story = () => (
  <Box display="flex" flexDirection="column" gap={1}>
    {ICON_COLOR_TYPES.map((color) => (
      <Box display="flex" alignItems="center" gap={1} key={color}>
        <Icon type="add" color={color} />
        <span>{color}</span>
      </Box>
    ))}
  </Box>
);
ColorPresets.storyName = "Color Presets";

export const ListOfIcons: Story = () => {
  return (
    <Box m={2} display="grid" gridTemplateColumns="repeat(4, 1fr)">
      {ICONS.sort().map((type) => {
        return (
          <Box m={1} key={`icon-${type}`}>
            <Icon m={1} type={type} />
            {type}
          </Box>
        );
      })}
    </Box>
  );
};
ListOfIcons.storyName = "List of Icons";
ListOfIcons.parameters = {
  info: { disable: true },
  chromatic: { disableSnapshot: true },
};
