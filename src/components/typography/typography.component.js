import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import color from "../../style/utils/color";
import baseTheme from "../../style/themes/base";

const getAs = (variant) => {
  switch (variant) {
    case "h1-large":
      return "h1";
    case "segment-header":
    case "segment-header-small":
    case "segment-subheader":
    case "segment-subheader-alt":
      return "h5";
    case "big":
      return "p";
    default:
      return variant;
  }
};

const getSize = (variant) => {
  switch (variant) {
    case "h1-large":
      return "32px";
    case "h1":
      return "24px";
    case "h2":
      return "22px";
    case "h3":
    case "segment-header":
      return "20px";
    case "h4":
    case "segment-header-small":
      return "18px";
    case "h5":
    case "segment-subheader":
    case "big":
      return "16px";
    case "small":
    case "sub":
    case "sup":
      return "13px";
    case "segment-subheader-alt":
    case "p":
    case "b":
    case "strong":
    case "em":
    default:
      return "14px";
  }
};

const getLineHeight = (variant) => {
  switch (variant) {
    case "h1-large":
      return "40px";
    case "h1":
    case "segment-subheader":
      return "31px";
    case "h2":
      return "29px";
    case "h3":
    case "segment-header":
      return "26px";
    case "big":
      return "24px";
    case "h4":
    case "segment-header-small":
      return "23px";
    case "small":
    case "sub":
    case "sup":
      return "20px";
    case "h5":
    case "segment-subheader-alt":
    case "p":
    case "b":
    case "strong":
    case "em":
    default:
      return "21px";
  }
};

const getWeight = (variant) => {
  switch (variant) {
    case "h1-large":
    case "h1":
    case "segment-header":
    case "segment-header-small":
    case "strong":
      return "900";
    case "h2":
    case "h3":
    case "segment-subheader":
    case "segment-subheader-alt":
    case "b":
    case "em":
      return "700";
    case "h4":
    case "h5":
    case "p":
    case "small":
    case "big":
    case "sub":
    case "sup":
    default:
      return "400";
  }
};

const getTransform = (variant) => {
  if (variant === "segment-subheader-alt") {
    return "uppercase";
  }
  return "none";
};

const getDecoration = (variant) => {
  if (variant === "em") {
    return "underline";
  }
  return "none";
};

const Typography = styled.span.attrs(
  ({
    variant,
    as,
    fontSize,
    fontWeight,
    textTransform,
    lineHeight,
    textDecoration,
  }) => {
    return {
      as: as || getAs(variant),
      size: fontSize || getSize(variant),
      weight: fontWeight || getWeight(variant),
      textTransform: textTransform || getTransform(variant),
      textDecoration: textDecoration || getDecoration(variant),
      lineHeight: lineHeight || getLineHeight(variant),
      defaultMargin: variant === "p" ? "0 0 16px" : "0",
    };
  }
)`
  font-family: "Lato";
  ${({
    size,
    weight,
    textTransform,
    lineHeight,
    defaultMargin,
    textDecoration,
    display,
    variant,
    listStyleType,
  }) => css`
    font-style: normal;
    font-size: ${size};
    font-weight: ${weight};
    text-transform: ${textTransform};
    text-decoration: ${textDecoration};
    line-height: ${lineHeight};
    margin: ${defaultMargin};
    padding: 0;
    ${variant === "sup" && "vertical-align: super;"}
    ${variant === "sub" && "vertical-align: sub;"}
${display && `display: ${display};`}
${listStyleType && `list-style-type: ${listStyleType};`}
  `}
  ${space}
${color}
`;

Typography.defaultProps = {
  color: "blackOpacity90",
  variant: "p",
  theme: baseTheme,
};

Typography.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Styled system color props */
  ...propTypes.color,
  /** The visual style to apply to the component */
  variant: PropTypes.oneOf([
    "h1-large",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "segment-header",
    "segment-header-small",
    "segment-subheader",
    "segment-subheader-alt",
    "p",
    "small",
    "big",
    "sup",
    "sub",
    "strong",
    "b",
    "em",
  ]),
  /** Override the variant component */
  as: PropTypes.string,
  /** Override the variant font-size */
  fontSize: PropTypes.string,
  /** Override the variant font-weight */
  fontWeight: PropTypes.string,
  /** Override the variant line-height */
  lineHeight: PropTypes.string,
  /** Override the variant text-transform */
  textTransform: PropTypes.string,
  /** Override the variant text-decoration */
  textDecoration: PropTypes.string,
  /** Override the variant display */
  display: PropTypes.string,
  /** Override the list-style-type */
  listStyleType: PropTypes.string,
};
export default Typography;
