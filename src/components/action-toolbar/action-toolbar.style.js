import styled from 'styled-components';

const StyledActionToolbar = styled.div`
  display: inline-block;
  padding: 15px 0;
`;

const StyledActionToolbarTotal = styled.div`
  display: inline-block;
  margin-right: 10px;
  min-width: auto;
  text-align: left;
`;

const StyledActionToolbarActions = styled.div`
  display: inline-flex;
  margin: 0 10px;

  & > * {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  &.carbon-link__anchor--disabled {
    color: '##b3c2c8';
  }
`;

export { StyledActionToolbar, StyledActionToolbarTotal, StyledActionToolbarActions };
