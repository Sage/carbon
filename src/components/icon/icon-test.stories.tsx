import React from "react";

import {
  ICONS,
  ICON_SHAPES,
  ICON_SIZES,
  ICON_TOOLTIP_POSITIONS,
  ICON_FONT_SIZES,
} from "./icon-config";
import Icon from ".";

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
          color: "",
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
    {/* Custom colors */}
    <Icon type="add" color="blackOpacity65" />
    <Icon type="add" color="brilliantGreenShade20" />
    <Icon type="add" color="red" />
    <Icon type="add" color="#123456" />
    <Icon type="add" color="rgb(0, 123, 10)" />
    <Icon type="add" color="white" bg="blackOpacity65" />
    <Icon type="add" bg="brilliantGreenShade20" />
    <Icon type="add" bg="red" />
    <Icon type="add" color="white" bg="#123456" />
    <Icon type="add" color="white" bg="rgb(0, 123, 10)" />
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
