import React from "react";
import PropTypes from "prop-types";
import { ArgsTable } from "@storybook/components";
import { ArgsTable as Props } from "@storybook/addon-docs";

const generateStyledSystemMarginProps = (defaults) => {
  return [
    {
      name: "m",
      type: { summary: "number | string" },
      description:
        "Margin, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.m || "-",
      },
      table: {
        category: "Margin",
      },
    },
    {
      name: "mt",
      type: { summary: "number | string" },
      description:
        "Margin top, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.mt || "-",
      },
      table: {
        category: "Margin",
      },
    },
    {
      name: "mr",
      type: { summary: "number | string" },
      description:
        "Margin right, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.mr || "-",
      },
      table: {
        category: "Margin",
      },
    },
    {
      name: "mb",
      type: { summary: "number | string" },
      description:
        "Margin bottom, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.mb || "-",
      },
      table: {
        category: "Margin",
      },
    },
    {
      name: "ml",
      type: { summary: "number | string" },
      description:
        "Margin left, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.ml || "-",
      },
      table: {
        category: "Margin",
      },
    },
    {
      name: "mx",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Margin left/right, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.mx || "-",
      },
      table: {
        category: "Margin",
      },
    },
    {
      name: "my",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Margin top/bottom, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.my || "-",
      },
      table: {
        category: "Margin",
      },
    },
  ];
};

const generateStyledSystemPaddingProps = (defaults) => {
  return [
    {
      name: "p",
      type: { summary: "number | string" },
      description:
        "Padding, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.p || "-",
      },
      table: {
        category: "Padding",
      },
    },
    {
      name: "pt",
      type: { summary: "number | string" },
      description:
        "Padding top, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.pt || "-",
      },
      table: {
        category: "Padding",
      },
    },
    {
      name: "pr",
      type: { summary: "number | string" },
      description:
        "Padding right, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.pr || "-",
      },
      table: {
        category: "Padding",
      },
    },
    {
      name: "pb",
      type: { summary: "number | string" },
      description:
        "Padding bottom, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.pb || "-",
      },
      table: {
        category: "Padding",
      },
    },
    {
      name: "pl",
      type: { summary: "number | string" },
      description:
        "Padding left, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.pl || "-",
      },
      table: {
        category: "Padding",
      },
    },
    {
      name: "px",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Padding left/right, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.px || "-",
      },
      table: {
        category: "Padding",
      },
    },
    {
      name: "py",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Padding top/bottom, an integer multiplier of the base spacing constant (8px) or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.py || "-",
      },
      table: {
        category: "Padding",
      },
    },
  ];
};

const generateStyledSystemSpacingProps = (defaults) => {
  return [
    ...generateStyledSystemMarginProps(defaults),
    ...generateStyledSystemPaddingProps(defaults),
  ];
};

const generateStyledSystemColorProps = (defaults) => {
  return [
    {
      name: "color",
      type: { summary: "string" },
      description: "Color, theme value or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.color || "-",
      },
      table: {
        category: "Color",
      },
    },
    {
      name: "backgroundColor",
      type: { summary: "string" },
      description: "Background, theme value or any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.backgroundColor || "-",
      },
      table: {
        category: "Color",
      },
    },
    {
      name: "bg",
      type: { summary: "string" },
      description: "Shorthand for backgroundColor",
      required: false,
      defaultValue: {
        summary: defaults.bg || "-",
      },
      table: {
        category: "Color",
      },
    },
    {
      name: "opacity",
      type: { summary: "decimal" },
      description: "Any decimal between 0 and 1.0",
      required: false,
      defaultValue: {
        summary: defaults.opacity || "-",
      },
      table: {
        category: "Color",
      },
    },
  ];
};

const generateStyledSystemWidthProps = (defaults) => [
  {
    name: "width",
    type: { summary: "number | string" },
    description:
      "Numbers from 0-1 are converted to percentage widths. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme",
    required: false,
    defaultValue: {
      summary: defaults.width || "-",
    },
    table: {
      category: "Layout",
    },
  },
];

const generateStyledSystemLayoutProps = (defaults) => {
  return [
    ...generateStyledSystemWidthProps(defaults),
    {
      name: "height",
      type: { summary: "number | string" },
      description:
        "Numbers from 0-1 are converted to percentage heights. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive height styles. If theme.sizes is defined, the height prop will attempt to pick up values from the theme",
      required: false,
      defaultValue: {
        summary: defaults.height || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "minWidth",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Numbers from 0-1 are converted to percentage widths. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme",
      required: false,
      defaultValue: {
        summary: defaults.minWidth || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "maxWidth",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Numbers from 0-1 are converted to percentage widths. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme",
      required: false,
      defaultValue: {
        summary: defaults.maxWidth || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "minHeight",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Numbers from 0-1 are converted to percentage heights. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive height styles. If theme.sizes is defined, the height prop will attempt to pick up values from the theme",
      required: false,
      defaultValue: {
        summary: defaults.minWidth || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "maxHeight",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Numbers from 0-1 are converted to percentage heights. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive height styles. If theme.sizes is defined, the height prop will attempt to pick up values from the theme",
      required: false,
      defaultValue: {
        summary: defaults.maxWidth || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "size",
      type: { summary: "number | string" },
      // eslint-disable-next-line max-len
      description:
        "Width/Height, Numbers from 0-1 are converted to percentage values. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive styles. If theme.sizes is defined, the height and width props will attempt to pick up values from the theme",
      required: false,
      defaultValue: {
        summary: defaults.size || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "display",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.display || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "verticalAlign",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.verticalAlign || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "overflow",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.overflow || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "overflowX",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.overflowX || "-",
      },
      table: {
        category: "Layout",
      },
    },
    {
      name: "overflowY",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.display || "-",
      },
      table: {
        category: "Layout",
      },
    },
  ];
};

const generateStyledSystemFlexBoxProps = (defaults) => {
  return [
    {
      name: "alignItems",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.alignItems || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "alignContent",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.alignContent || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "justifyItems",
      type: { summary: "string" },
      description: "Any valid CSS string",
      required: false,
      defaultValue: {
        summary: defaults.justifyItems || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "justifyContent",
      type: { summary: "string" },
      description: "Any valid CSS string",
      required: false,
      defaultValue: {
        summary: defaults.justifyContent || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "flexWrap",
      type: { summary: "string" },
      description: "Any valid CSS string",
      required: false,
      defaultValue: {
        summary: defaults.flexWrap || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "flexDirection",
      type: { summary: "string" },
      description: "Any valid CSS string",
      required: false,
      defaultValue: {
        summary: defaults.flexDirection || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "flex",
      type: { summary: "string" },
      description: "Any valid CSS string",
      required: false,
      defaultValue: {
        summary: defaults.flex || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "flexGrow",
      type: { summary: "number" },
      description: "Any number greater than 0.",
      required: false,
      defaultValue: {
        summary: defaults.flexGrow || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "flexShrink",
      type: { summary: "number" },
      description: "Any number greater than 0.",
      required: false,
      defaultValue: {
        summary: defaults.flexShrink || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "flexBasis",
      type: { summary: "string" },
      description: "Any valid CSS string",
      required: false,
      defaultValue: {
        summary: defaults.flexBasis || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "justifySelf",
      type: { summary: "string" },
      description: "Any valid CSS string",
      required: false,
      defaultValue: {
        summary: defaults.justifySelf || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "alignSelf",
      type: { summary: "string" },
      description: "Any valid CSS string",
      required: false,
      defaultValue: {
        summary: defaults.alignSelf || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
    {
      name: "order",
      type: { summary: "number" },
      description: "Any number greater than 0.",
      required: false,
      defaultValue: {
        summary: defaults.order || "-",
      },
      table: {
        category: "Flexbox",
      },
    },
  ];
};

const generateStyledSystemBackgroundProps = (defaults) => {
  return [
    {
      name: "background",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.background || "-",
      },
      table: {
        category: "Background",
      },
    },
    {
      name: "backgroundImage",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.backgroundImage || "-",
      },
      table: {
        category: "Background",
      },
    },
    {
      name: "backgroundSize",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.backgroundSize || "-",
      },
      table: {
        category: "Background",
      },
    },
    {
      name: "backgroundPosition",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.backgroundPosition || "-",
      },
      table: {
        category: "Background",
      },
    },
    {
      name: "backgroundRepeat",
      type: { summary: "string" },
      description: "Any valid CSS string.",
      required: false,
      defaultValue: {
        summary: defaults.backgroundRepeat || "-",
      },
      table: {
        category: "Background",
      },
    },
  ];
};

const StyledSystemProps = ({
  of,
  spacing,
  color,
  width,
  layout,
  flexBox,
  defaults = {},
  noHeader,
  margin,
  padding,
  background,
}) => {
  let rows = [];

  if (spacing) {
    rows.push(...generateStyledSystemSpacingProps(defaults));
  }
  if (margin) {
    rows.push(...generateStyledSystemMarginProps(defaults));
  }
  if (padding) {
    rows.push(...generateStyledSystemPaddingProps(defaults));
  }
  if (color) {
    rows.push(...generateStyledSystemColorProps(defaults));
  }
  if (layout) {
    rows.push(...generateStyledSystemLayoutProps(defaults));
  }
  if (width) {
    rows.push(...generateStyledSystemWidthProps(defaults));
  }
  if (flexBox) {
    rows.push(...generateStyledSystemFlexBoxProps(defaults));
  }
  if (background) {
    rows.push(...generateStyledSystemBackgroundProps(defaults));
  }

  return (
    <>
      {!noHeader && <h2>Props</h2>}
      <ArgsTable rows={rows} />
      {of && <Props of={of} />}
    </>
  );
};

StyledSystemProps.propTypes = {
  of: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
  noHeader: PropTypes.bool,
  spacing: PropTypes.bool,
  width: PropTypes.bool,
  layout: PropTypes.bool,
  flex: PropTypes.bool,
  defaults: PropTypes.object,
  margin: PropTypes.bool,
  padding: PropTypes.bool,
  background: PropTypes.bool,
};

export default StyledSystemProps;
