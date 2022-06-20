import styled from "styled-components";
import StyledValidationIcon from "../validations/validation-icon.style";
import StyledHelp from "../../components/help/help.style";

const StyledIconWrapper = styled.div`
  display: inline-block;
  margin: 0;
  margin-left: 4px;
  width: 24px;
  height: 24px;
  position: relative;
  margin-top: -3px;
  margin-bottom: -4px;
  vertical-align: top;

  :focus {
    outline: 2px solid var(--colorsSemanticFocus500);
  }

  ${StyledValidationIcon}, ${StyledHelp} {
    position: static;
  }
`;

export default StyledIconWrapper;
