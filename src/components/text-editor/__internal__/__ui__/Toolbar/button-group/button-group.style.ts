import styled from "styled-components";

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--global-space-comp-s);
  align-items: center;

  .button-group-divider {
    width: 1px;
    background-color: var(--container-standard-border-default);
    min-height: var(--global-size-s);
  }
`;

export default StyledButtonGroup;
