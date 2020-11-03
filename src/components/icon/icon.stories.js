import React from "react";
import { text, number, select, boolean } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper";
import Icon from ".";
import createGuid from "../../utils/helpers/guid";

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
  return {
    tooltipMessage,
    type: select("type", OptionsHelper.icons, "add"),
    tooltipPosition: tooltipMessage
      ? select("tooltipPosition", OptionsHelper.positions, "top")
      : undefined,
    tooltipAlign: tooltipMessage
      ? select("tooltipAlign", OptionsHelper.alignAroundEdges, "top")
      : undefined,
  };
};

const dlsKnobs = () => {
  const bgTheme = select("bgTheme", [...OptionsHelper.iconBackgrounds], "none");
  const fontSize = select(
    "fontSize",
    OptionsHelper.sizesBinary,
    Icon.defaultProps.fontSize
  );
  const canSizeBg = bgTheme !== "none" && fontSize !== " large";
  return {
    bgTheme,
    fontSize,
    ml: number("ml", 0),
    mr: number("mr", 0),
    color: text("color", undefined),
    bg: text("bg", undefined),
    bgSize: canSizeBg
      ? select(
          "bgSize",
          OptionsHelper.sizesRestricted,
          Icon.defaultProps.bgSize
        )
      : undefined,
    bgShape:
      bgTheme !== "none"
        ? select("bgShape", OptionsHelper.shapes, OptionsHelper.shapes[0])
        : undefined,
    iconColor:
      bgTheme === "none"
        ? select(
            "iconColor",
            [...OptionsHelper.iconColors],
            OptionsHelper.iconColors[0]
          )
        : undefined,
    disabled: boolean("disabled", Icon.defaultProps.disabled),
  };
};

export const Default = () => {
  const knobs = dlsKnobs();

  if (knobs.iconColor === "on-dark-background") knobs.bgTheme = "info";

  return <Icon {...commonKnobs()} {...knobs} />;
};

export const All = () => (
  <>
    {OptionsHelper.icons.map((type) =>
      OptionsHelper.sizesBinary.map((fontSize) => {
        return OptionsHelper.shapes.map((bgShape) => {
          if (fontSize === "large") {
            return (
              <Icon
                type={type}
                fontSize={fontSize}
                key={createGuid()}
                bgTheme="info"
                bgShape={bgShape}
              />
            );
          }
          return OptionsHelper.sizesRestricted.map((bgSize) => (
            <Icon
              type={type}
              fontSize={fontSize}
              key={createGuid()}
              bgTheme="info"
              bgShape={bgShape}
              bgSize={bgSize}
            />
          ));
        });
      })
    )}

    {OptionsHelper.sizesBinary.map((fontSize) =>
      [true, false].map((disabled) =>
        OptionsHelper.iconBackgrounds.map((bgTheme) => {
          if (bgTheme !== "none") {
            return OptionsHelper.shapes.map((bgShape) => {
              if (fontSize === "large") {
                return (
                  <Icon
                    type="add"
                    fontSize={fontSize}
                    disabled={disabled}
                    key={createGuid()}
                    bgTheme={bgTheme}
                    bgShape={bgShape}
                  />
                );
              }
              return OptionsHelper.sizesRestricted.map((bgSize) => (
                <Icon
                  type="add"
                  fontSize={fontSize}
                  disabled={disabled}
                  key={createGuid()}
                  bgTheme={bgTheme}
                  bgShape={bgShape}
                  bgSize={bgSize}
                />
              ));
            });
          }
          return OptionsHelper.iconColors.map((iconColor) => (
            <Icon
              type="add"
              fontSize={fontSize}
              disabled={disabled}
              key={createGuid()}
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
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
