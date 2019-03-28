import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const LinkStyle = styled.div`
  a {
    font-size: 14px;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.secondary};
    }

    &:focus {
      color: ${({ theme }) => theme.text.color};
      background-color: ${({ theme }) => theme.colors.focus};
      outline: none;
    }

    ${({ disabled, theme }) => disabled && css`
      color: ${theme.disabled.text};
      pointer-events: none;
    `}
  }

  ${({ disabled }) => disabled && css`cursor: not-allowed;`}
`;

LinkStyle.defaultProps = {
  theme: baseTheme,
  disabled: false
};

LinkStyle.propTypes = {
  disabled: PropTypes.bool
};

export default LinkStyle;
