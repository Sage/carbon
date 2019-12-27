import styled from 'styled-components';
import Icon from '../icon';
import baseTheme from '../../style/themes/base';
import classicIconStyle from './icon-classic.style';

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.border};
  cursor: pointer;
  margin-top: -8px;
  right: 40px;
  top: 60px;
  z-index: 1002;
  position: fixed;
  display: block;
  
  &::before {
    font-size: 24px;
  }
  
  &:hover {
    color: ${({ theme }) => theme.icon.onLightBackgroundHover};
  }

  ${classicIconStyle}
`;

StyledIcon.defaultProps = {
  theme: baseTheme
};


export default StyledIcon;
