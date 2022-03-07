import styled from "styled-components";
import { Input as SimpleColorInput } from "../../../__internal__/input";
import StyledColorSampleBox from "../color-sample-box/color-sample-box.style";

const StyledSimpleColorInput = styled(SimpleColorInput)`
  position: absolute;
  opacity: 0;
  height: var(--sizing700);
  width: var(--sizing700);
  margin: 0;

  &:hover {
    cursor: pointer;
  }

  &:disabled:hover {
    cursor: not-allowed;
  }

  &:focus + ${StyledColorSampleBox} {
    box-shadow: inset 0px 0px 0px var(--borderWidth200)
      var(--colorsUtilityYang100);
    border: 2px solid var(--colorsSemanticFocus500);
  }
`;

export default StyledSimpleColorInput;
