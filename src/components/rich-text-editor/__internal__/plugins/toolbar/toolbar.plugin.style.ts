import styled from "styled-components";

const StyledToolbar = styled.div`
  width: 500px;
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  background-color: var(--colorsUtilityYang100);
  outline: 1px solid var(--colorsUtilityMajor200);
  padding: 4px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: var(--borderRadius050);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export default StyledToolbar;
