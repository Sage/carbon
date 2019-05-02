import styled, { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const PagerContainerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 16px;
  border: 1px solid #d8dfe3;
  border-top-width: 0;
  
  ${({ theme }) => theme.name === THEMES.classic && css`
    background-color: ${theme.table.pager};
  `};
`;

const PagerSizeOptionsStyles = styled.div`
  display: flex;
  flex: 1 1 30%;
  justify-content: flex-start;

  .carbon-dropdown {
    width: 55px;
    margin: 0 4px;
  }
`;

const PagerSizeOptionsInnerStyles = styled.div`
  display: flex;
  align-items: center;
`;

const PagerNavigationStyles = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`;

const PagerNoSelectStyles = styled.span`
  user-select: none;
`;

const PagerSummaryStyles = styled.div`
  display: flex;
  flex: 1 1 30%;
  justify-content: flex-end;
`;

export {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerSizeOptionsInnerStyles,
  PagerNavigationStyles,
  PagerNoSelectStyles,
  PagerSummaryStyles
};
