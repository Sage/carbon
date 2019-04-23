import styled from 'styled-components';
import Icon from '../icon';
import ClassicIconStyle from './classic-icon.style';

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

export default StyledIcon;
