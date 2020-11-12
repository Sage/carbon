import styled from "styled-components";
import StyledPill from "../../pill/pill.style";
import { baseTheme } from "../../../style/themes";

const StyledMultiSelect = styled.div`
  position: relative;
`;

const StyledSelectPillContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3px 2px 3px 0;

  && ${StyledPill} {
    text-overflow: ellipsis;
  }
`;

StyledSelectPillContainer.defaultProps = {
  theme: baseTheme,
};

export default StyledMultiSelect;
