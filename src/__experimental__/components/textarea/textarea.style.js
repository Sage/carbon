import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const StyledTextarea = styled.textarea`
  background-color: transparent;
  flex-grow: 1;
  padding-top: 12px;
  padding-bottom: 12px;
  border: none;
  resize: none;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text.color};
  font-size: ${({ theme }) => theme.text.size};
  outline: none
  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  ${({ disabled, theme }) => disabled && css`
    color: ${theme.disabled.text};
    cursor: not-allowed;
  `}
`;

StyledTextarea.defaultProps = {
  theme: baseTheme
};

StyledTextarea.propTypes = {
  disabled: PropTypes.bool
};

export default StyledTextarea;
