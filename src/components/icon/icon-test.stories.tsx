import React from "react";

import {
  ICONS,
  ICON_SHAPES,
  ICON_SIZES,
  ICON_TOOLTIP_POSITIONS,
  ICON_FONT_SIZES,
} from "./icon-config";
import Icon, { ICON_COLOR_TYPES } from ".";

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
