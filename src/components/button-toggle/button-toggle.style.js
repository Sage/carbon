import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const StyledButtonToggleLabel = styled.label`
  display: inline-block;
  height: 40px;
  padding: 0 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.text.size};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.white};
  
  input:checked ~ & {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.tertiary};
  }

  input:focus ~ & {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.whiteMix};
    border-color: ${({ theme }) => theme.colors.tertiary};
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  ${({ buttonIcon, buttonIconSize }) => buttonIcon && buttonIconSize === 'large' && css`
    min-width: 104px;
    height: 104px;
    padding: 0 16px;

    .content-wrapper {
      flex-direction: column;
    }
  `}

  ${({ disabled }) => disabled && css`
    background-color: #e6ebed !important;
    border-color: #e6ebed !important;
    color: rgba(0,0,0,.2) !important;
  `};


  /* CLASSIC STYLES */
  ${({ theme }) => theme.name === THEMES.classic && css`
    height: 47px;
    
    input:checked ~ & {
      color: ${theme.colors.white};
      background-color: #1573e6;
    }
    
    &:hover {
      border-color: #1e499f;
      color: ${theme.colors.white};
      background-color: #1e499f;
    }

    &:focus {
      outline: 0;
    }  

    ${({ size }) => size === 'small' && css`
      height: auto;
      padding: 5px 8px;
      font-weight: 700;
      font-size: 12px;
    `};
  
    ${({ size, buttonIcon, buttonIconSize }) => buttonIcon && size === 'large' && buttonIconSize === 'large' && css`
      height: auto;
      padding-top: 15px;
      padding-bottom: 15px;
    `};
  `};
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
`;

const StyledButtonToggle = styled.div`
  display: inline-block;

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

export {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleIcon,
  StyledButtonToggleInput
};
