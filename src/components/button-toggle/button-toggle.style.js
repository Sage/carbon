import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';
import {
  StyledButtonToggleClassicLabel,
  StyledButtonToggleClassicIcon
} from './button-toggle-classic.style';

const StyledButtonToggleContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledButtonToggleLabel = styled.label`
  display: inline-block;
  height: 38px;
  padding: 0 24px;
  font-weight: 600;

  ${({ theme }) => css`
    border: 1px solid ${theme.colors.border};
    font-size: ${theme.text.size};
    background-color: ${theme.colors.white};
    
    input:checked ~ & {
      color: ${theme.colors.white};
      background-color: ${theme.colors.tertiary};
    }

    input:focus ~ & {
      outline: 3px solid ${theme.colors.focus};
    }

    &:hover {
      background-color: ${theme.colors.whiteMix};
      border-color: ${theme.colors.tertiary};
    }
  `};

  ${({ buttonIcon, buttonIconSize }) => buttonIcon && buttonIconSize === 'large' && css`
    min-width: 104px;
    height: 102px;
    padding: 0 16px;

    ${StyledButtonToggleContentWrapper} {
      flex-direction: column;
    }
  `}

  ${({ disabled, theme }) => disabled && css`
    background-color: ${theme.disabled.button} !important};
    border-color: ${theme.disabled.button} !important};
    color: ${theme.disabled.buttonText} !important};
  `};

    ${StyledButtonToggleClassicLabel}
`;

const iconFontSizes = {
  classic: {
    smallIcon: 16,
    largeIcon: 60
  },
  modern: {
    smallIcon: 16,
    largeIcon: 32
  }
};

const StyledButtonToggleIcon = styled.div`
  margin-right: 8px;
  
  .carbon-icon {
    top: -2px;
  }

  ${({ buttonIconSize }) => buttonIconSize === 'large' && css`
    margin-right: 0;
    
    .carbon-icon {
      margin-right: 0;
      margin-bottom: 8px;
    }

    .carbon-icon::before {
      font-size: ${`${iconFontSizes.modern[`${buttonIconSize}Icon`]}px`};
      line-height: ${`${iconFontSizes.modern[`${buttonIconSize}Icon`]}px`};
    }
  `}

  ${({ theme, buttonIconSize }) => theme.name === THEMES.classic && css`
    margin-right: ${buttonIconSize === 'large' ? '0' : '3px'};
  
    .carbon-icon::before {
      font-size: ${`${iconFontSizes.classic[`${buttonIconSize}Icon`]}px`};
      line-height: ${`${iconFontSizes.classic[`${buttonIconSize}Icon`]}px`};
    }
  `};

  ${StyledButtonToggleClassicIcon}
`;

const StyledButtonToggle = styled.div`
  display: inline-block;
  vertical-align: middle;

  &:not(:first-of-type) {
    margin-left: 10px;
  }
  
  ${({ grouped }) => grouped && css`
    &:not(:first-of-type) {
      margin-left: 0;
      ${StyledButtonToggleLabel} {
        border-left-width: 0;
      }
    }
  `};
`;

const StyledButtonToggleInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

StyledButtonToggle.propTypes = {
  buttonSize: PropTypes.string
};

StyledButtonToggleIcon.propTypes = {
  buttonIconSize: PropTypes.string
};

StyledButtonToggleLabel.defaultProps = {
  theme: baseTheme
};

StyledButtonToggleLabel.defaultProps = {
  theme: baseTheme
};

export {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleIcon,
  StyledButtonToggleInput,
  StyledButtonToggleContentWrapper
};
