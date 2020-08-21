import styled, { css } from 'styled-components';

import { MenuButton } from '../../action-popover/action-popover.style';
import StyledIcon from '../../icon/icon.style';

import { baseTheme } from '../../../style/themes';

export const StyledEntity = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -16px;
`;

export const StyledEntityHeaderContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  flex-basis: 100%;

  & ${MenuButton} {
    margin: 0;
    margin-left: auto;

    & > ${StyledIcon} {
      color: ${({ theme }) => theme.entity.menuButton};
    }
  }
`;

StyledEntityHeaderContainer.defaultProps = {
  theme: baseTheme
};

export const StyledEntityHeader = styled.h3`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 900;
  margin: 0;
`;

export const StyledEntityContent = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const StyledEntityContentDivider = styled.div`
  display: inline-block;
  height: auto;
  align-self: stretch;
  width: 1px;
  background-color: ${({ theme }) => theme.entity.divider};
  margin-bottom: 16px;

  ${({ ml, theme }) => ml && css`margin-left: ${ml * theme.spacing}px`}
  ${({ mr, theme }) => mr && css`margin-right: ${mr * theme.spacing}px`}
`;

StyledEntityContentDivider.defaultProps = {
  theme: baseTheme
};
