/* eslint-disable multiline-ternary */
import React from "react";
import { text, number, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Pill from "./pill.component";

const getKnobs = () => {
  const pillRole = select("pillRole", ["tag", "status"], "tag");

  return {
    ml: number("ml", 0),
    mr: number("mr", 0),
    children: text("children", "Pill"),
    borderColor: text("borderColor", undefined),
    fill: boolean("fill", Pill.defaultProps.fill),
    onDelete: boolean("onDelete", false),
    size: select("size", ["S", "M", "L", "XL"], Pill.defaultProps.size),
    pillRole,
    colorVariant:
      pillRole === "status"
        ? select(
            "colorVariant",
            ["neutral", "negative", "positive", "warning"],
            "neutral"
          )
        : undefined,
  };
};

export default {
  component: Pill,
  title: "Design System/Pill/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const basic = () => {
  const {
    children,
    colorVariant,
    fill,
    onDelete,
    pillRole,
    borderColor,
    size,
    ml,
    mr,
  } = getKnobs();
  return (
    <Pill
      colorVariant={colorVariant}
      fill={fill}
      onDelete={onDelete ? action("delete") : null}
      borderColor={borderColor}
      pillRole={pillRole}
      size={size}
      ml={ml}
      mr={mr}
    >
      {children}
    </Pill>
  );
};
