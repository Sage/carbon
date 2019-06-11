import styled from 'styled-components';
import Icon from '../../../../components/icon/icon';

const StyledTickIcon = styled(Icon)`
  height: 22px;
  width: 22px;
  pointer-events: none;

  &.carbon-icon {
    display: none;
  }

  &:before {
    font-size: 22px;
  }
`;

export default StyledTickIcon;
