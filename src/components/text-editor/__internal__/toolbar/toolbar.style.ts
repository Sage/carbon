import styled from "styled-components";

const StyledToolbar = styled.div`
  display: inline-flex;
  justify-content: space-between;
  flex-flow: row wrap;
  gap: 8px;
  padding: 12px;
  height: fit-content;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-top: 1px solid var(--colorsUtilityMajor200);
  background-color: var(--colorsUtilityMajor025);
  user-select: none;
  z-index: 10;
`;

const StyledEditorStyleControls = styled.div`
  display: inline-flex;
  gap: 8px;
`;

const StyledEditorActionControls = styled.div`
  flex-grow: 1;
  display: inline-flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--spacing200);
`;

export { StyledToolbar, StyledEditorActionControls, StyledEditorStyleControls };
