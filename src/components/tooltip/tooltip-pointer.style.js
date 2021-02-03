import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";

const pointerColor = (type, theme) =>
  type === "error" ? theme.colors.error : theme.colors.black;

const StyledTooltipPointer = styled.div`
  ${({ position, theme, type }) => css`
    position: absolute;
    width: 0;
    height: 0;

    ${position === "top" &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid ${pointerColor(type, theme)};
      bottom: -${theme.spacing}px;
      @-moz-document url-prefix() {
        bottom: -7px;
      }
    `}

    ${position === "bottom" &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid ${pointerColor(type, theme)};
      top: -${theme.spacing}px;
      @-moz-document url-prefix() {
        top: -7px;
      }
    `}

    ${position === "right" &&
    css`
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid ${pointerColor(type, theme)};
      left: -${theme.spacing}px;
      @-moz-document url-prefix() {
        left: -7px;
      }
    `}

    ${position === "left" &&
    css`
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid ${pointerColor(type, theme)};
      right: -${theme.spacing}px;
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
  position: PropTypes.oneOf(OptionsHelper.positions),
  theme: PropTypes.object,
  type: PropTypes.string,
};

export default StyledTooltipPointer;
