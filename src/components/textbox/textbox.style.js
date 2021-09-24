import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";
import StyledInput from "../../__internal__/input/input.style";
import { SIZES } from "./textbox.config";
import LabelStyle from "../../__internal__/label/label.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import InputPresentationStyle from "../../__internal__/input/input-presentation.style";
import FormField from "../../__internal__/form-field";

const StyledFormField = styled(FormField)`
  position: relative;
  & & {
    margin-top: 16px;
  }

  ${LabelStyle} {
    ${({ size }) =>
      css`
        font-size: ${SIZES[size].labelFontSize};
      `}
  }
  ${StyledInput} {
    ${({ size }) =>
      css`
        font-size: ${SIZES[size].fontSize};
      `}
  }

  ${InputPresentationStyle} {
    ${({ size, width, warning, theme, readOnly, error }) =>
      css`
        ${warning &&
        !error &&
        !readOnly &&
        `border-color: ${theme.colors.border}`}
        font-size: ${SIZES[size].fontSize};
        width: ${SIZES[width].width};
        overflow: hidden;
      `}
  }
  ${InputIconToggleStyle} {
    ${({ disabled, readOnly }) =>
      css`
        ${(disabled || readOnly) && "cursor: not-allowed;"}
      `}

    & span {
      ${({ theme }) =>
        css`
          color: ${theme.icon.onLightBackground};
          &:hover {
            color: ${theme.icon.onLightBackgroundHover};
          }
        `}
    }

    & span::before {
      ${({ size }) =>
        css`
          font-size: ${SIZES[size].iconSize};
        `}
    }
  }
`;

const ErrorBorder = styled.div`
  ${({ theme, warning, size }) =>
    css`
      position: absolute;
      z-index: 6;
      width: 2px;
      height: calc(100% + 8px + ${SIZES[size].labelFontSize});
      background-color: ${warning ? theme.colors.warning : theme.colors.error};
      left: -12px;
      bottom: 0;
    `}
`;

const StyledHintText = styled.p`
  margin-top: 0;
  margin-bottom: 8px;
  ${({ theme, size }) =>
    css`
      color: ${theme.colors.placeholder};
      font-size: ${SIZES[size].hintFontSize};
    `};
`;

StyledHintText.defaultProps = {
  theme: baseTheme,
  size: "medium",
};

ErrorBorder.propTypes = {
  warning: PropTypes.bool,
  size: PropTypes.string,
};

ErrorBorder.defaultProps = {
  warning: false,
  size: "medium",
  theme: baseTheme,
};

StyledFormField.defaultProps = {
  warning: false,
  size: "medium",
  width: "medium",
  theme: baseTheme,
};

StyledFormField.propTypes = {
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
  width: PropTypes.oneOf([
    "extra-small",
    "small",
    "medium",
    "large",
    "extra-large",
  ]),
};

export { StyledHintText, ErrorBorder, StyledFormField };
