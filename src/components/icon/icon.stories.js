import React from "react";
import { text, number, select, boolean } from "@storybook/addon-knobs";
import Icon from ".";
import {
  ICONS,
  ICON_BACKGROUNDS,
  ICON_COLORS,
  ICON_SHAPES,
  ICON_SIZES,
  ICON_TOOLTIP_POSITIONS,
} from "./icon-config";

export default {
  title: "Icon/Test",
  component: Icon,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

const commonKnobs = () => {
  const tooltipMessage = text("tooltipMessage", "");

  const tooltipPosition = tooltipMessage
    ? select("position", ICON_TOOLTIP_POSITIONS, "top")
    : undefined;

  const isVertical = ["top", "bottom"].includes(tooltipPosition);
  const enableFlipOverrides = tooltipMessage
    ? boolean("enable flip overrides", false)
    : undefined;

  return {
    tooltipMessage,
    type: select("type", ICONS, "add"),
    tooltipPosition,
    tooltipBgColor: tooltipMessage
      ? text("tooltipBgColor", undefined)
      : undefined,
    tooltipFontColor: tooltipMessage
      ? text("tooltipFontColor", undefined)
      : undefined,
    tooltipFlipOverrides:
      tooltipMessage && enableFlipOverrides
        ? select(
            "tooltipFlipOverrides",
            isVertical ? ["left", "right"] : ["top", "bottom"],
            isVertical ? "right" : "bottom"
          )
        : undefined,
  };
};

const dlsKnobs = () => {
  const bgTheme = select("bgTheme", [...ICON_BACKGROUNDS], "none");
  const fontSize = select("fontSize", ICON_SIZES, Icon.defaultProps.fontSize);
  const hasBg = bgTheme !== "none";

  return {
    bgTheme,
    fontSize,
    ml: number("ml", 0),
    mr: number("mr", 0),
    color: text("color", undefined),
    bg: text("bg", undefined),
    bgSize: hasBg
      ? select("bgSize", ICON_SIZES, Icon.defaultProps.bgSize)
      : undefined,
    bgShape: hasBg ? select("bgShape", ICON_SHAPES, ICON_SHAPES[0]) : undefined,
    iconColor: hasBg
      ? select("iconColor", [...ICON_COLORS], ICON_COLORS[0])
      : undefined,
    disabled: boolean("disabled", Icon.defaultProps.disabled),
  };
};

export const Default = () => {
  const knobs = dlsKnobs();

  if (knobs.iconColor === "on-dark-background") knobs.bgTheme = "info";

  const { tooltipFlipOverrides } = commonKnobs();

  const flipOverrides = tooltipFlipOverrides
    ? [tooltipFlipOverrides]
    : undefined;

  return (
    <div style={{ margin: 100 }}>
      <Icon
        {...commonKnobs()}
        {...knobs}
        tooltipFlipOverrides={flipOverrides}
      />
    </div>
  );
};

export const All = () => (
  <>
    {ICONS.map((type) =>
      ICON_SIZES.map((fontSize) => (
        <Icon type={type} fontSize={fontSize} key={`${type}_${fontSize}`} />
      ))
    )}

    {[true, false].map((disabled) =>
      ICON_SIZES.map((fontSize) =>
        ICON_BACKGROUNDS.map((bgTheme) => {
          if (bgTheme !== "none") {
            return ICON_SHAPES.map((bgShape) => {
              return ICON_SIZES.map((bgSize) => (
                <Icon
                  type="add"
                  disabled={disabled}
                  key={`${fontSize}_${disabled}_${bgTheme}_${bgShape}_${bgSize}`}
                  fontSize={fontSize}
                  bgTheme={bgTheme}
                  bgShape={bgShape}
                  bgSize={bgSize}
                />
              ));
            });
          }
          return ICON_COLORS.map((iconColor) => (
            <Icon
              type="add"
              disabled={disabled}
              key={`${fontSize}_${disabled}_${bgTheme}_${iconColor}`}
              bgTheme={iconColor === "on-dark-background" ? "info" : bgTheme}
              iconColor={iconColor}
            />
          ));
        })
      )
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

All.story = {
  name: "all",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

Default.story = {
  name: "default",
};
