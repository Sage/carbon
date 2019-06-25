import styled, { css } from 'styled-components';
import Icon from '../../../../components/icon';

const StyledTickIcon = styled(Icon)`
  &.carbon-icon {
    height: 22px;
    width: 22px;
    pointer-events: none;
    display: none;

    &::before {
      font-size: 22px;
      color: ${({ iconColor }) => iconColor};
    }

    ${({ checked }) => checked
      && css`
         {
          display: block;
        }
      `}
  }
`;

export default StyledTickIcon;
