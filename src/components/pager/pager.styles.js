import styled, { css } from 'styled-components';

const PagerContainerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border: 1px solid #d8dfe3;
  border-top-width: 0;
  background-color: #fafbfb;
`;

const PagerSizeOptionsStyles = styled.div`
  display: flex;
  flex: 1 1 30%;
  /* background-color: pink; */
  justify-content: flex-start;
`;

const PagerNavigationStyles = styled.div`
  display: flex;
  flex: 1 1 auto;
  /* background-color: blue; */
  justify-content: center;
  padding: 8px 0;
`;

const PagerSummaryStyles = styled.div`
  display: flex;
  flex: 1 1 30%;
  /* background-color: pink; */
  justify-content: flex-end;
`;

export {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerNavigationStyles,
  PagerSummaryStyles
};
