import styled from 'styled-components';

const PagerContainerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 16px;
  border: 1px solid #d8dfe3;
  border-top-width: 0;
  background-color: #fafbfb;
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
  padding: 8px 0;
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
  PagerSummaryStyles
};
