import styled from 'styled-components';
import StyledIcon from '../icon/icon.style';
import IconButton from '../icon-button';
import Icon from '../icon';
import { baseTheme } from '../../style/themes';

const StyledBadgeWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledCounter = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-top: -1px;
`;

const StyledIconButton = styled(IconButton)`
  padding: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  text-align: center;
  position: absolute;
  top: -11px;
  right: -11px;
  background: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  color: ${({ theme }) => theme.colors.primary};

  &:hover, &:focus{
    background: ${({ theme }) => theme.colors.primary};

    ${StyledCounter}{
      display: none;
    }

    ${StyledIcon}{
      display: block;

      :before{
        margin-right: 3px;
        margin-top: 1px;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

const StyledCrossIcon = styled(Icon)`
  margin: 0;
  display: none;
  height: 21px;
  width: 21px;
`;

StyledIconButton.defaultProps = {
  theme: baseTheme
};

export {
  StyledBadgeWrapper,
  StyledIconButton,
  StyledCrossIcon,
  StyledCounter
};
