import styled, { css } from 'styled-components';
import { isDLS } from '../../../utils/helpers/style-helper';
import baseTheme from '../../../style/themes/base';

const StyledToolbar = styled.div`
  padding: 4px;
  display: flex;
  justify-content: flex-start;
  background: white;
  flex-wrap: wrap;
  font-size: 14px;
  user-select: none;
  order: 2;
  border: none;
  ${({ theme }) => `
    background-color: ${theme.editor.toolbar.background};
    border-top: 1px solid ${theme.editor.border};
  `}
  height: 40px;
`;

const StyledToolbarButton = styled.button`
  background-color: inherit;
  border: none;
  margin: 0px 4px;
  cursor: pointer;
  padding: 0px 12px;
  min-width: 44px;
  font-size: 14px;

  ${({ theme }) => css`
    :focus, :active {
      ${isDLS(theme) && css`outline: 2px solid ${theme.colors.focus};`}
      background-color: ${theme.colors.white};
      z-index: 10;
    }

    :hover {
      background-color: ${theme.colors.white};
    }
  `}
`;

StyledToolbar.defaultProps = {
  theme: baseTheme
};

StyledToolbarButton.defaultProps = {
  theme: baseTheme
};

export {
  StyledToolbar,
  StyledToolbarButton
};
