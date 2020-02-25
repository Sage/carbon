import styled, { css } from 'styled-components';
import StyledIcon from '../icon/icon.style';
import classicIconButtonStyle from './icon-button-classic.style';
import { baseTheme } from '../../style/themes';

const StyledIconButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  padding: 0;

  ${({ theme }) => css`
    &:focus {
      color: ${theme.text.color};
      background-color: transparent;
      outline: solid 3px ${theme.colors.focus};
    }
  `}

  &:hover {
    cursor: pointer;
  }

  ${StyledIcon} {
    position: relative;

    &:focus {
      border: none;
    }
  }


  ${classicIconButtonStyle};
`;

StyledIconButton.defaultProps = {
  theme: baseTheme
};

export default StyledIconButton;
