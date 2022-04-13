import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { shade, meetsContrastGuidelines } from "polished";
import { margin } from "styled-system";

import styleConfig from "./pill.style.config";
import { baseTheme } from "../../style/themes";
import StyledIcon from "../icon/icon.style";
import { toColor } from "../../style/utils/color.js";
import getColorValue from "../../style/utils/get-color-value";

function addStyleToPillIcon(fontSize) {
  return `
    ${StyledIcon} {
      &:before {
        font-size: ${fontSize};
      }
    }
  `;
}

const PillStyle = styled.span`
  ${margin};
  ${({
    colorVariant,
    borderColor,
    theme,
    inFill,
    isDeletable,
    pillRole,
    size,
  }) => {
    const isStatus = pillRole === "status";
    const variety = isStatus ? colorVariant : "primary";
    let pillColor;
    let buttonFocusColor;
    let contentColor;

    try {
      if (borderColor) {
        pillColor = toColor(theme, borderColor);
        buttonFocusColor = shade(0.2, getColorValue(pillColor));
        contentColor = meetsContrastGuidelines(
          getColorValue(pillColor),
          theme.compatibility.colorsUtilityYin090
        ).AAA
          ? "var(--colorsUtilityYin090)"
          : "var(--colorsUtilityYang100)";
      } else {
        const { varietyColor, buttonFocus, content } = styleConfig(theme)[
          pillRole
        ][variety];
        pillColor = varietyColor;
        buttonFocusColor = buttonFocus;
        contentColor = content;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    return css`
      border-radius: 12px;
      letter-spacing: 0.7px;
      position: relative;
      display: inline-flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      border: 2px solid ${pillColor};
      height: auto;
      white-space: nowrap;
      color: ${contentColor};

      ${inFill &&
      css`
        background-color: ${pillColor};
      `}

      ${!inFill &&
      css`
        color: var(--colorsUtilityYin090);
      `}

      ${size === "S" &&
      css`
        font: var(--typographyPillLabelS);
      `}

      ${size === "M" &&
      css`
        font: var(--typographyPillLabelM);
      `}

      ${size === "L" &&
      css`
        font: var(--typographyPillLabelL);
      `}

      ${size === "XL" &&
      css`
        font: var(--typographyPillLabelXl);
      `}

      ${isDeletable &&
      css`
        button {
          -webkit-appearance: none;
          border-radius: 0 6px 6px 0;
          border: none;
          bottom: 0;
          font-size: 100%;
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          margin: 0;
          line-height: 16px;

          &:focus {
            outline: none;
            box-shadow: 0 0 0 3px var(--colorsSemanticFocus500);
            background-color: ${buttonFocusColor};
            & {
              color: ${contentColor};
            }
            ::-moz-focus-inner {
              border: 0;
            }
            ${StyledIcon} {
              color: ${contentColor};
            }
          }

          &:hover {
            background-color: ${buttonFocusColor};
            color: ${contentColor};
            cursor: pointer;
            ${StyledIcon} {
              color: ${contentColor};
            }
          }

          ${StyledIcon} {
            font-size: 12px;
            padding: 0 4px;
            height: unset;
            width: unset;
            color: ${contentColor};

            &:hover,
            &:focus {
              color: ${contentColor};
            }
          }

          ${!inFill &&
          css`
            ${StyledIcon} {
              color: var(--colorsUtilityYin090);
            }
          `}
        }

        ${size === "S" &&
        css`
          padding: 0 24px 0 7px;

          button {
            padding: 0;
            border-radius: 0 8px 8px 0;
            line-height: 14px;

            ${addStyleToPillIcon("7px")}
          }
        `}

        ${size === "M" &&
        css`
          padding: 0 32px 0 11px;
          border-radius: 12px;

          button {
            width: 24px;
            padding: 0;
            border-radius: 0 10px 10px 0;
            line-height: 15px;

            ${addStyleToPillIcon("10px")}
          }
        `}

        ${size === "L" &&
        css`
          padding: 0 36px 0 15px;
          border-radius: 13px;

          button {
            width: 28px;
            padding: 0;
            border-radius: 0 11px 11px 0;
            line-height: 16px;

            ${addStyleToPillIcon("12px")}
          }
        `}

        ${size === "XL" &&
        css`
          padding: 0 41px 0 19px;
          border-radius: 15px;

          button {
            width: 32px;
            padding: 0;
            border-radius: 0 12px 12px 0;
            line-height: 18px;

            ${addStyleToPillIcon("13px")}
          }
        `}
      `}

      ${!isDeletable &&
      css`
        ${size === "S" &&
        css`
          padding: 0 7px;

          button {
            padding: 0;
          }
        `}

        ${size === "M" &&
        css`
          padding: 0 11px;
          border-radius: 12px;

          button {
            width: 24px;
            padding: 0;
            border-radius: 0 8px 8px 0;
          }
        `}

        ${size === "L" &&
        css`
          padding: 0 15px;
          border-radius: 13px;

          button {
            width: 28px;
            padding: 0;
            border-radius: 0 10px 10px 0;
          }
        `}

        ${size === "XL" &&
        css`
          padding: 0 19px;
          border-radius: 15px;

          button {
            width: 32px;
            padding: 0;
            border-radius: 0 12px 12px 0;
          }
        `}
      `}
    `;
  }}
`;

PillStyle.defaultProps = {
  inFill: false,
  colorVariant: "default",
  isDeletable: false,
  theme: baseTheme,
};

PillStyle.propTypes = {
  inFill: PropTypes.bool,
  colorVariant: PropTypes.oneOf(["neutral", "negative", "positive", "warning"]),
  isDeletable: PropTypes.func,
  size: PropTypes.oneOf(["S", "M", "L", "XL"]),
  pillRole: PropTypes.oneOf(["tag", "status"]),
  borderColor: PropTypes.string,
  theme: PropTypes.object,
};

export default PillStyle;
