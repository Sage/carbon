import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import classicThemeForLink from './link-classic.style';
import { THEMES } from '../../style/themes';

const LinkStyle = styled.div`
a {
  font-size: 14px;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary};
  
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
  }

  ${({ theme }) => theme.name !== THEMES.classic && css`
    &:focus {
      color: ${theme.text.color};
      background-color: ${theme.colors.focus};
      outline: none;
    }
  `}  
  
  ${({ disabled, theme }) => disabled && css`
    color: ${theme.disabled.text};
    pointer-events: none;
  `}  
}

${({ disabled }) => disabled && css`cursor: not-allowed;`}

${classicThemeForLink}
`;

LinkStyle.defaultProps = {
  theme: baseTheme,
  disabled: false
};

LinkStyle.propTypes = {
  disabled: PropTypes.bool
};

export default LinkStyle;
