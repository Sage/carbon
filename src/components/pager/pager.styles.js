import styled, { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const PagerContainerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 24px;
  align-items: center;
  border: 1px solid #d8dfe3;
  border-top-width: 0;
  font-size: 13px;
  
  ${({ theme }) => css`
  background-color: ${theme.table.pager};
  `};
  ${({ theme }) => theme.name === THEMES.classic && css`
    padding: 3px 16px;
    font-size: 14px;
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

  .carbon-number__input {
    width: 34px;
    height: 24px;
    padding: 0;
    margin: 0 4px;
    line-height: 24px;
    text-align: center;
  }
  ${({ theme }) => theme.name === THEMES.classic && css`
    .carbon-number__input {
      width: 35px;
      height: 31px;
    }
  `};
`;

const PagerNavInnerStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
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

const PagerLinkStyles = styled.button`
  padding: 0 12px;
  font-size: 13px;
  border-width: 0;
  text-decoration: underline;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  ${({ disabled }) => disabled && css`
    color: rgba(0,0,0,0.3);
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
  PagerNavInnerStyles,
  PagerLinkStyles,
  PagerButtonWrapperStyles,
  PagerNoSelectStyles,
  PagerSummaryStyles
};
