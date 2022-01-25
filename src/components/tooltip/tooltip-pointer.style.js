import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import { toColor } from "../../style/utils/color";

const pointerColor = (type, theme, bgColor) => {
  if (bgColor) return toColor(theme, bgColor);
  return type === "error"
    ? "var(--colorsSemanticNegative500)"
    : "var(--colorsSemanticNeutral500)";
};
const StyledTooltipPointer = styled.div`
  ${({ position, theme, type, bgColor }) => css`
    position: absolute;
    width: 0;
    height: 0;

    ${position === "top" &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid ${pointerColor(type, theme, bgColor)};
      bottom: calc(-1 * var(--spacing100));
      @-moz-document url-prefix() {
        bottom: -7px;
      }
    `}

    ${position === "bottom" &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid ${pointerColor(type, theme, bgColor)};
      top: calc(-1 * var(--spacing100));
      @-moz-document url-prefix() {
        top: -7px;
      }
    `}

    ${position === "right" &&
    css`
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid ${pointerColor(type, theme, bgColor)};
      left: calc(-1 * var(--spacing100));
      @-moz-document url-prefix() {
        left: -7px;
      }
    `}

    ${position === "left" &&
    css`
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid ${pointerColor(type, theme, bgColor)};
      right: calc(-1 * var(--spacing100));
      @-moz-document url-prefix() {
        right: -7px;
      }
    `}
  `}
`;

StyledTooltipPointer.defaultProps = {
  theme: baseTheme,
  position: "top",
};

StyledTooltipPointer.propTypes = {
  position: PropTypes.oneOf(["bottom", "left", "right", "top"]),
  theme: PropTypes.object,
  type: PropTypes.string,
  bgColor: PropTypes.string,
};

export default StyledTooltipPointer;
