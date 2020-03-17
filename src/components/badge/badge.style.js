import styled from 'styled-components';
import StyledIcon from '../icon/icon.style';
import Button from '../button';
import Icon from '../icon';

const StyledBadgeWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledButton = styled(Button)`
  padding: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  text-align: center;
  margin-top: -1px;
  margin-right: 0;
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.white};
`;

const StyledCrossIcon = styled(Icon)`
  margin: 0;

  &${StyledIcon}{
    margin-top: 1px;
    margin-right: 0;
  }
`;

export {
  StyledBadgeWrapper,
  StyledButton,
  StyledCrossIcon
};
