import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import StyledIcon from "../icon/icon.style";

const heightConfig = {
  small: 32,
  medium: 40,
  large: 48,
};

const fontSizeConfig = {
  small: 14,
  medium: 14,
  large: 16,
};

const paddingConfig = {
  small: 16,
  medium: 24,
  large: 32,
};

const heightLargeIconConfig = {
  small: 80,
  medium: 96,
  large: 112,
};

const paddingLargeIconConfig = {
  small: 32,
  medium: 40,
  large: 48,
};

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
  box-sizing: border-box;
  ${({ size }) => css`
    height: ${heightConfig[size]}px;
    padding: 0 ${paddingConfig[size]}px;
    font-size: ${fontSizeConfig[size]}px;
  `}
  font-weight: 700;
  cursor: pointer;

  border: 1px solid var(--colorsActionMinor500);

  ${StyledIcon} {
    color: var(--colorsActionMinor500);
  }

  input:checked ~ && {
    background-color: var(--colorsActionMinor300);
    color: var(--colorsActionMinor600);
    cursor: auto;
  }

  input:focus ~ & {
    outline: 3px solid var(--colorsSemanticFocus500);
    z-index: 100;
  }

  input:not(:checked):not(:disabled) ~ &:hover {
    background-color: var(--colorsWhiteMixTheme, var(--colorsActionMinor200));
    border-color: var(--colorsActionMinor500);
    color: var(--colorsActionMinor500);

    ${StyledIcon} {
      color: var(--colorsActionMinor500);
    }
  }

  ${({ buttonIcon, buttonIconSize, size }) =>
    buttonIcon &&
    buttonIconSize === "large" &&
    css`
      height: ${heightLargeIconConfig[size]}px;
      padding: 0 ${paddingLargeIconConfig[size]}px;

      ${StyledButtonToggleContentWrapper} {
        flex-direction: column;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      & {
        border-color: var(--colorsActionDisabled500);
        color: var(--colorsActionMinorYin030);

        ${StyledIcon} {
          color: var(--colorsActionMinorYin030);
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
  ${({ hasNoContent }) =>
    hasNoContent
      ? ""
      : css`
          margin-right: 8px;
        `}
  ${({ buttonIconSize }) =>
    buttonIconSize === "large" &&
    css`
      margin-right: 0;

      ${StyledIcon} {
        margin-right: 0;
        margin-bottom: 8px;
        height: ${`${iconFontSizes.largeIcon}px`};
        width: ${`${iconFontSizes.largeIcon}px`};
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
    margin-left: 8px;
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

export {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleIcon,
  StyledButtonToggleInput,
  StyledButtonToggleContentWrapper,
};
