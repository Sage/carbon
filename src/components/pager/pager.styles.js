import styled, { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const PagerContainerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 16px;
  border: 1px solid #d8dfe3;
  border-top-width: 0;
  
  /* ${({ theme }) => theme.name === THEMES.classic && css`
    background-color: ${theme.table.pager};
  `}; */
  ${({ theme }) => css`
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

const PagerButtonWrapperStyles = styled.div`
  display: inline-block;
  transform: rotate(90deg) scale(1.4);
  cursor: pointer;
  margin-right: 8px;

  ${({ disabled }) => disabled && css`
    opacity: 0.3;
    cursor: default;
  `};

  ${({ next }) => next && css`
    transform: rotate(-90deg) scale(1.4);
    margin-right: 0;
    margin-left: 8px;
  `};
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
  PagerButtonWrapperStyles,
  PagerNoSelectStyles,
  PagerSummaryStyles
};
