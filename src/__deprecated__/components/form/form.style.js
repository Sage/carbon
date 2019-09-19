import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import StyledFormField from '../../../__experimental__/components/form-field/form-field.style';
import StyledButton from '../../../components/button/button.style';
import StyledFormSummary from './form-summary/form-summary.style';
import { isClassic } from '../../../utils/helpers/style-helper';
import baseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';

const applyButtonLeftMargin = ({ theme }) => ((isClassic(theme)) ? 'margin-left: 15px;' : 'margin-left: 16px;');

export const StyledAdditionalFormAction = styled.div`
  ${({ type }) => type && css`
    ${type === 'leftAlignedActions' && css`
      flex-grow: 1;
    `}

    ${type !== 'leftAlignedActions' && css`
      display: inline-block;
    `}

    ${applyButtonLeftMargin}

    && ${StyledButton} {
      margin-left: 0px;
      &:first-child {
        margin-left: 0;
      }
    }
  `}
`;

export const StyledResponsiveFooterWrapper = styled.div`
  margin: 20px auto 0 auto;
  max-width: inherit;
  min-width: inherit;
  padding: 0;
  align-items: center;
  display: flex;
  ${({ borderWidth }) => borderWidth && css`
    &&&& {
      border-width: ${borderWidth};
    }
  `}

  div:first-of-type {
    ${StyledButton} {
      margin-left: 0;
    }
  }

  ${({
    showSummary,
    buttonAlign,
    hasAdditionalActions
  }) => showSummary && (buttonAlign === 'right' || hasAdditionalActions) && css`
    && ${StyledFormSummary} {
      ${StyledButton} {
        ${applyButtonLeftMargin}
      } 
    }
  `}

  ${StyledAdditionalFormAction}:first-of-type { 
    margin-left: 0;
  }
`;

const FormButtonAnimation = keyframes`
  0%   { bottom: -50px; }
  100% { bottom: 0; }
`;

export const StyledFormFooter = styled.div`
  ${({ theme, stickyFooter }) => !isClassic(theme) && !stickyFooter && css`
    margin-top: 48px;
  `}

  ${({ buttonAlign }) => buttonAlign === 'right' && css`
    ${StyledResponsiveFooterWrapper} {
      justify-content: flex-end;
    }
  `}
`;

const StyledForm = styled.form`
  ${StyledButton} {
    align-items: center;
    display: flex;
    ${applyButtonLeftMargin}
  }

  ${({ theme }) => !isClassic(theme) && css`
    && ${StyledFormField} {
      margin-bottom: 32px;
    }
  `}

  ${({ fixedBottom }) => fixedBottom && css`
    padding-bottom: 80px;
  `}

  ${({ stickyFooter, theme }) => stickyFooter && css`
    padding-bottom: 80px;
    ${StyledFormFooter} {
      animation: ${FormButtonAnimation} 0.25s ease-out;  
      background-color: ${theme.colors.white};
      bottom: 0;
      box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.05);
      box-sizing: content-box;
      left: 0;
      padding-bottom: 13px;
      padding-top: 15px;
      position: fixed;
      width: 100%;
      z-index: 1000;
      
      ${StyledResponsiveFooterWrapper} {
        align-items: center;
        display: flex;
        margin-top: 0;
        border-left-style: solid;
        border-left-color: ${theme.colors.white};
        border-right-style: solid;
        border-right-color: ${theme.colors.white};
        border-width: 0;
        box-sizing: border-box;
        min-width: 450px;
        padding: 0 40px;
      }
    }
  `}

  [data-component='icon'].common-input__icon {
    height: 19px;
  }
`;

StyledForm.defaultProps = {
  theme: baseTheme
};

StyledForm.propTypes = {
  theme: PropTypes.object,
  stickyFooter: PropTypes.bool,
  fixedBottom: PropTypes.bool
};

StyledFormFooter.defaultProps = {
  theme: baseTheme
};

StyledFormFooter.propTypes = {
  theme: PropTypes.object,
  buttonAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  stickyFooter: PropTypes.bool
};

StyledAdditionalFormAction.defaultProps = {
  theme: baseTheme
};

StyledAdditionalFormAction.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.oneOf(OptionsHelper.additionalActionAlignments)
};

StyledResponsiveFooterWrapper.propTypes = {
  theme: PropTypes.object,
  buttonAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  showSummary: PropTypes.bool,
  borderWidth: PropTypes.string,
  hasAdditionalActions: PropTypes.bool
};

StyledResponsiveFooterWrapper.defaultProps = {
  theme: baseTheme
};

export default StyledForm;
