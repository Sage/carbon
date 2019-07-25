import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledFormSummary = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin: -8px;
  white-space: nowrap;
  padding: 8px;
  border-radius: 4px;
 
  ${({ isInvalid, theme }) => {
    return isInvalid && css`
      background-color: ${theme.form.invalid};
      margin-left: 15px;
    `;
  }}
`;

export const StyledInternalSummary = styled.span`
  padding: 0 3px;

  carbon-form-summary__icon {
    padding: 0 3px;
    position: relative;
    top: -2px;
  }

  ${({ type }) => {
    if (!['error', 'warning'].includes(type)) return css``;
    if (type === 'error') return css`color: #D63F40;`;

    return css`color: #FF7D00;`;
  }}
`;

export const StyledSummaryText = styled.span`
  padding: 0 3px;

  ${({ type }) => {
    return type === 'warning' && css`color: #c33e00;`;
  }}
`;

StyledFormSummary.defaultProps = {
  theme: baseTheme
};

StyledInternalSummary.defaultProps = {
  theme: baseTheme
};

StyledSummaryText.defaultProps = {
  theme: baseTheme
};

export default StyledFormSummary;
