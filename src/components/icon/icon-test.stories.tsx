import React from "react";
import { StoryObj } from "@storybook/react-vite";

import {
  ICONS,
  ICON_SHAPES,
  ICON_SIZES,
  ICON_TOOLTIP_POSITIONS,
  ICON_FONT_SIZES,
} from "./icon-config";
import Icon, { ICON_COLOR_TYPES } from ".";
import Box from "../box";

export default {
  title: "Icon/Test",
  component: Icon,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    tooltipMessage: {
      control: {
        type: "text",
      },
    },
    tooltipFlipOverrides: {
      options: [undefined, ...ICON_TOOLTIP_POSITIONS],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ ...args }) => {
  const flipOverrides = args.tooltipFlipOverrides
    ? [args.tooltipFlipOverrides]
    : undefined;

  return (
    <div style={{ margin: 100 }}>
      <Icon
        {...{
          tooltipMessage: "",
          tooltipPosition: "top",
          enableFlipOverrides: false,
          type: "add",
          tooltipBgColor: "",
          tooltipFontColor: "",
          fontSize: "small",
          ml: 0,
          mr: 0,
          bg: "",
          bgSize: "small",
          bgShape: "circle",
          disabled: false,
          tooltipFlipOverrides: flipOverrides,
          ...args,
        }}
      />
    </div>
  );
};

export const All = () => (
  <>
    {ICONS.map((type) =>
      ICON_FONT_SIZES.map((fontSize) => (
        <Icon type={type} fontSize={fontSize} key={`${type}_${fontSize}`} />
      )),
    )}
    {[true, false].map((disabled) =>
      ICON_FONT_SIZES.map((fontSize) => {
        return ICON_SHAPES.map((bgShape) => {
          return ICON_SIZES.map((bgSize) => (
            <Icon
              type="add"
              disabled={disabled}
              key={`${fontSize}_${disabled}_${bgShape}_${bgSize}`}
              fontSize={fontSize}
              bgShape={bgShape}
              bgSize={bgSize}
              bg="#00b000"
            />
          ));
        });
      }),
    )}
    {/* Color presets */}
    {ICON_COLOR_TYPES.map((color) => (
      <Icon type="add" color={color} key={color} />
    ))}
    <Icon type="add" inverse bg="blackOpacity65" />
    <Icon type="add" bg="brilliantGreenShade20" />
    <Icon type="add" bg="red" />
    <Icon type="add" inverse bg="#123456" />
    <Icon type="add" inverse bg="rgb(0, 123, 10)" />
  </>
);

Default.storyName = "default";
All.storyName = "all";
All.story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

type Story = StoryObj<typeof Icon>;

// Documentation regression stories moved from the public docs.

export const DocumentationDefault: Story = () => {
  return <Icon type="add" />;
};
DocumentationDefault.storyName = "DocumentationDefault";

export const DocumentationColorPresets: Story = () => (
  <Box display="flex" flexDirection="column" gap={1}>
    {ICON_COLOR_TYPES.map((color) => (
      <Box display="flex" alignItems="center" gap={1} key={color}>
        <Icon type="add" color={color} />
        <span>{color}</span>
      </Box>
    ))}
  </Box>
);
DocumentationColorPresets.storyName = "Color Presets";

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

export const CustomColors: Story = () => (
  <>
    <Box mb={1}>
      <Icon type="add" color="--colorsUtilityYin090" />
      <Icon type="add" color="primary" />
      <Icon type="add" color="blackOpacity65" />
      <Icon type="add" color="brilliantGreenShade20" />
      <Icon type="add" color="red" />
      <Icon type="add" color="#123456" />
      <Icon type="add" color="rgb(0, 123, 10)" />
    </Box>
    <Box mb={1}>
      <Icon
        type="add"
        color="--colorsUtilityYin090"
        bg="--colorsSemanticCaution500"
      />
      <Icon type="add" color="red" bg="primary" />
      <Icon type="add" color="white" bg="blackOpacity65" />
      <Icon type="add" bg="brilliantGreenShade20" />
      <Icon type="add" bg="red" />
      <Icon type="add" color="white" bg="#123456" />
      <Icon type="add" color="white" bg="rgb(0, 123, 10)" />
    </Box>
  </>
);
CustomColors.storyName = "Custom Colors";
CustomColors.parameters = {
  info: { disable: true },
  chromatic: { disableSnapshot: true },
};

DocumentationDefault.parameters = { chromatic: { disableSnapshot: false } };
DocumentationColorPresets.parameters = {
  chromatic: { disableSnapshot: false },
};
Sizes.parameters = { chromatic: { disableSnapshot: false } };
Inverse.parameters = { chromatic: { disableSnapshot: false } };
VariousBgShapes.parameters = { chromatic: { disableSnapshot: false } };
VariousBgSizes.parameters = { chromatic: { disableSnapshot: false } };
BgSizesAndFontSizes.parameters = { chromatic: { disableSnapshot: false } };
