import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import classicThemeForLinkAnchor from './link-classic.style';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledIcon from '../icon/icon.style';

const LinkStyleAnchor = styled.a`
  font-size: 14px;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary};
  display: inline-block;

  ${StyledIcon} {
    margin-right: 5px;
    position: relative;
    ${({ iconAlign }) => iconAlign === 'right' && css`
      margin-right: 0;
      margin-left: 5px;
    `}
    vertical-align: middle;
    top: ${({ theme }) => (isClassic(theme) ? '-2px' : '')};
  }
  
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
  }

  ${({ theme }) => !isClassic(theme) && css`
    &:focus {
      color: ${theme.text.color};
      cursor: default;
      background-color: ${theme.colors.focusedLinkBackground};
      outline: none;
    }
  `}  

  ${classicThemeForLinkAnchor}
`;

const LinkRouterStyle = styled(LinkStyleAnchor);

const LinkStyle = styled.div`
  ${({ disabled, theme }) => disabled && css`
    cursor: not-allowed;

  ${LinkStyleAnchor} { 
    color: ${theme.disabled.text};
    pointer-events: none;

    ${classicThemeForLinkAnchor}
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

export {
  LinkStyle, LinkStyleAnchor, LinkRouterStyle
};
