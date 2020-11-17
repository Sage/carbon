import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const StyledButtonToggleContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledButtonToggleLabel = styled.label`
  display: inline-block;
  position: relative;
  height: 38px;
  padding: 0 24px;
  font-weight: 600;
  cursor: pointer;

  ${({ theme }) => css`
    border: 1px solid ${theme.colors.border};
    font-size: ${theme.text.size};
    background-color: ${theme.colors.white};

    input:checked ~ & {
      color: ${theme.colors.white};
      background-color: ${theme.colors.tertiary};

      ${StyledIcon} {
        color: ${theme.colors.white};
      }
    }

    input:focus ~ & {
      outline: 3px solid ${theme.colors.focus};
      z-index: 100;
    }

    &:hover {
      background-color: ${theme.colors.whiteMix};
      border-color: ${theme.colors.tertiary};
    }
  `};

  ${({ buttonIcon, buttonIconSize }) =>
    buttonIcon &&
    buttonIconSize === "large" &&
    css`
      min-width: 104px;
      height: 102px;
      padding: 0 16px;

      ${StyledButtonToggleContentWrapper} {
        flex-direction: column;
      }
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      & {
        background-color: ${theme.disabled.button};
        border-color: ${theme.disabled.button};
        color: ${theme.disabled.buttonText};

        ${StyledIcon} {
          color: ${theme.disabled.buttonText};
        }
      }
      cursor: not-allowed;
    `};
`;

const iconFontSizes = {
  smallIcon: 16,
  largeIcon: 32,
};

const StyledButtonToggleIcon = styled.div`
  margin-right: 8px;

  ${({ buttonIconSize }) =>
    buttonIconSize === "large" &&
    css`
      margin-right: 0;

      ${StyledIcon} {
        margin-right: 0;
        margin-bottom: 8px;
      }

      ${StyledIcon}::before {
        font-size: ${`${iconFontSizes[`${buttonIconSize}Icon`]}px`};
        line-height: ${`${iconFontSizes[`${buttonIconSize}Icon`]}px`};
      }

      .carbon-icon__svg--credit-card-slash {
        margin-left: 6px;
      }
    `}
`;

const StyledButtonToggle = styled.div`
  display: inline-block;
  vertical-align: middle;

  &:not(:first-of-type) {
    margin-left: 10px;
  }

  ${({ grouped }) =>
    grouped &&
    css`
      &:not(:first-of-type) {
        margin-left: -1px;
      }
    `};
`;

const StyledButtonToggleInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

StyledButtonToggleIcon.propTypes = {
  buttonIconSize: PropTypes.string,
};

StyledButtonToggleLabel.defaultProps = {
  theme: baseTheme,
};

StyledButtonToggleLabel.defaultProps = {
  theme: baseTheme,
};

export {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleIcon,
  StyledButtonToggleInput,
  StyledButtonToggleContentWrapper,
};
