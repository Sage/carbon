import styled, { css } from 'styled-components';
import { isClassic } from '../../../../utils/helpers/style-helper';
import baseTheme from '../../../../style/themes/base';

const StyledToolbarButton = styled.button`
  background-color: inherit;
  border: none;
  margin: 0px 4px;
  cursor: pointer;
  padding: 0px 12px;
  width: 32px;
  font-size: 14px;
  height: 32px;

  ${({ theme, isActive }) => css`
    :focus, :active {
      ${!isClassic(theme) && css`outline: 2px solid ${theme.colors.focus};`}
      background-color: ${theme.colors.white};
      z-index: 10;
    }

    :hover {
      background-color: ${theme.editor.button.hover};
    }

    ${isActive && css`
      background-color: ${theme.editor.button.hover};
    `}
  `}
`;

StyledToolbarButton.defaultProps = {
  theme: baseTheme
};

export default StyledToolbarButton;
