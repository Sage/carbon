import styled from 'styled-components';
import Icon from '../icon';

const StyledIcon = styled(Icon)`
  color: #4d7080;
  cursor: pointer;
  margin-top: -8px;
  right: 40px;
  top: 53px;
  z-index: 1002;

  &, &.carbon-icon {
    position: absolute;
    display: block;
  }
  
  &:before {
    font-size: 24px;
  }
  
  &:hover {
    color: #255BC7;
  }
`;

export default StyledIcon;
