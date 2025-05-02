import styled, { css } from "styled-components";
import { space } from "styled-system";
import styledColor from "../../style/utils/color";
import baseTheme from "../../style/themes/base";
import { TypographyProps, VariantTypes } from "./typography.component";
import visuallyHidden from "../../style/utils/visually-hidden";

const getSize = (variant?: VariantTypes) => {
  switch (variant) {
    case "h1-large":
      return "40px";
    case "h1":
      return "30px";
    case "h2":
      return "24px";
    case "h3":
    case "segment-header":
      return "21px";
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
    case "span":
    case "b":
    case "strong":
    case "em":
    default:
      return "14px";
  }
};

const getLineHeight = (variant?: VariantTypes) => {
  switch (variant) {
    case "h1-large":
      return "50px";
    case "h1":
      return "37.5px";
    case "h2":
      return "30px";
    case "h3":
      return "26.25px";
    case "h4":
      return "22.5px";
    case "h5":
      return "20px";
    case "segment-header":
      return "26.25px";
    case "segment-header-small":
      return "22.5px";
    case "segment-subheader":
      return "24px";
    case "big":
      return "24px";
    case "small":
    case "sub":
    case "sup":
      return "20px";
    case "segment-subheader-alt":
    case "p":
    case "span":
    case "b":
    case "strong":
    case "em":
    default:
      return "21px";
  }
};

const getWeight = (variant?: VariantTypes) => {
  switch (variant) {
    case "h1-large":
    case "h1":
    case "h2":
    case "segment-header":
    case "segment-header-small":
      return "700";
    case "h3":
    case "segment-subheader":
    case "segment-subheader-alt":
    case "b":
    case "em":
    case "strong":
      return "500";
    case "h4":
    case "h5":
    case "p":
    case "span":
    case "small":
    case "big":
    case "sub":
    case "sup":
    default:
      return "400";
  }
};

const getTransform = (variant?: VariantTypes) => {
  if (variant === "segment-subheader-alt") {
    return "uppercase";
  }
  return "none";
};

const getDecoration = (variant?: VariantTypes) => {
  if (variant === "em") {
    return "underline";
  }
  return "none";
};

const StyledTypography = styled.span<TypographyProps>`
  ${({
    fontSize,
    fontWeight,
    display,
    variant,
    lineHeight: lHeight,
    listStyleType,
    whiteSpace,
    wordBreak,
    wordWrap,
    textAlign,
    textDecoration: decoration,
    textOverflow,
    textTransform: transform,
    truncate,
    screenReaderOnly,
  }) => {
    const size = fontSize || getSize(variant);
    const weight = fontWeight || getWeight(variant);
    const textTransform = transform || getTransform(variant);
    const textDecoration = decoration || getDecoration(variant);
    const lineHeight = lHeight || getLineHeight(variant);
    const defaultMargin = variant === "p" ? "0 0 16px" : "0";

    return css`
      font-style: normal;
      font-size: ${size};
      font-weight: ${weight};
      text-transform: ${textTransform};
      text-decoration: ${textDecoration};
      line-height: ${lineHeight};
      margin: ${defaultMargin};
      padding: 0;
      white-space: ${truncate ? "nowrap" : whiteSpace};
      word-break: ${wordBreak};
      word-wrap: ${wordWrap};
      text-align: ${textAlign};
      text-overflow: ${textOverflow || (truncate && "ellipsis")};
      ${truncate &&
      `
        overflow: hidden;
      `};
      ${screenReaderOnly && visuallyHidden}
      ${variant === "sup" && "vertical-align: super;"}
      ${variant === "sub" && "vertical-align: sub;"}
      ${display && `display: ${display};`}
      ${listStyleType && `list-style-type: ${listStyleType};`}
    `;
  }}
  ${space}

  ${({ color, bg, backgroundColor, ...rest }) =>
    styledColor({ color, bg, backgroundColor, ...rest })}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--colorsUtilityYin030);
    `}
`;

StyledTypography.defaultProps = {
  theme: baseTheme,
};

StyledTypography.displayName = "Typography";
export default StyledTypography;
