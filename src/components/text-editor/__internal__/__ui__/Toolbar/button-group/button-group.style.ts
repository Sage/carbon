import styled from "styled-components";

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;

  .button-group-divider {
    width: 1px;
    background-color: var(--colorsUtilityMajor100);
    margin: 0 8px;
    min-height: 32px;
  }
`;

export default StyledButtonGroup;
