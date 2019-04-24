import styled from 'styled-components';
import Icon from '../icon';
import baseTheme from '../../style/themes/base';
import ClassicIconStyle from './icon-classic.style';

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.border};
  cursor: pointer;
  margin-top: -8px;
  right: 40px;
  top: 53px;
  z-index: 1002;

  &, &.carbon-icon {
    position: absolute;
    display: block;
  }
  
  &:before, &.carbon-icon:before {
    font-size: 24px;
  }
  
  &:hover {
    color: ${({ theme }) => theme.icon.focus};
  }

  ${ClassicIconStyle}
`;

StyledIcon.defaultProps = {
  theme: baseTheme
};


export default StyledIcon;
