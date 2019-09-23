import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../../style/themes/base';
import StyledIcon from '../../../../components/icon/icon.style';

const StyledFormSummary = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin: -8px;
  white-space: nowrap;
  padding: 8px;
  border-radius: 4px;
 
  ${({ isInvalid, theme }) => isInvalid && css`
    background-color: ${theme.form.invalid};
    margin-left: 15px;
  `}
`;

export const StyledInternalSummary = styled.span`
  padding: 0 3px;

  ${StyledIcon} {
    padding: 0 3px;
    position: relative;
    top: -2px;
    vertical-align: middle;
    ${({ type, theme }) => type === 'warning' && css`color: ${theme.colors.warning};`}
    ${({ type, theme }) => type === 'error' && css`color: ${theme.colors.error};`}
  }
  ${({ type, theme }) => type === 'warning' && css`color: ${theme.colors.warning};`}
  ${({ type, theme }) => type === 'error' && css`color: ${theme.colors.error};`}
`;

export const StyledSummaryText = styled.span`
  padding: 0 3px;
  ${({ type, theme }) => type === 'warning' && css`color: ${theme.colors.warning};`}
`;

StyledFormSummary.defaultProps = {
  theme: baseTheme
};

StyledFormSummary.propTypes = {
  theme: PropTypes.object,
  isInvalid: PropTypes.bool
};

StyledInternalSummary.defaultProps = {
  theme: baseTheme
};

StyledInternalSummary.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.oneOf(['error', 'warning'])
};

StyledSummaryText.defaultProps = {
  theme: baseTheme
};

StyledSummaryText.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.oneOf(['error', 'warning'])
};

export default StyledFormSummary;
