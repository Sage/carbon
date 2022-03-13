import styled from "styled-components";
import StyledButton from "../../../button/button.style";

const StyledToolbar = styled.div`
  padding: 8px;
  display: flex;
  justify-content: flex-start;
  background: white;
  flex-wrap: wrap;
  font-size: 14px;
  user-select: none;
  order: 2;
  border: none;
  border-top: 1px solid var(--colorsUtilityMajor200);
  background-color: var(--colorsUtilityMajor025);
  min-width: 290px;
  z-index: 10;
`;

const StyledEditorStyleControls = styled.div`
  display: inline-block;
  text-align: left;
  width: 50%;
  min-width: 60px;
  margin-left: -2px;
`;

const StyledEditorActionControls = styled.div`
  display: inline-block;
  text-align: right;
  width: 50%;
  min-width: 60px;

  ${StyledButton} {
    width: 62px;
    min-height: 33px;
  }
`;

export { StyledToolbar, StyledEditorActionControls, StyledEditorStyleControls };
