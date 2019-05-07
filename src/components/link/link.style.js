import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import classicThemeForLinkAnchor from './link-classic.style';
import { THEMES } from '../../style/themes';

const LinkStyleAnchor = styled.a`
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
      cursor: default;
      background-color: ${theme.colors.focus};
      outline: none;
    }
  `}  

  ${classicThemeForLinkAnchor};
`;

const LinkRouterStyle = styled(LinkStyleAnchor);

const LinkStyle = styled.div`
  display: inline-block;

  ${({ disabled, theme }) => disabled && css`
    cursor: not-allowed;

  ${LinkStyleAnchor} { 
    color: ${theme.disabled.text};
    pointer-events: none;

  ${classicThemeForLinkAnchor};

  }
`}
`;

LinkStyle.defaultProps = {
  theme: baseTheme,
  disabled: false
};

LinkStyle.propTypes = {
  disabled: PropTypes.bool
};

LinkStyleAnchor.defaultProps = {
  theme: baseTheme
};

export { LinkStyle, LinkStyleAnchor, LinkRouterStyle };
