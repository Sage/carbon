import styled from "styled-components";
import StyledPill from "../../pill/pill.style";
import { baseTheme } from "../../../style/themes";
import InputIconToggleStyle from "../../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledSelect from "../select.style";
import InputPresentationStyle from "../../../__internal__/input/input-presentation.style";
import sizes from "../../../__internal__/input/input-sizes.style";

const StyledSelectPillContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3px 2px 3px 0;
  max-width: 100%;

  && ${StyledPill} {
    text-overflow: ellipsis;
  }
`;

const StyledSelectMultiSelect = styled(StyledSelect)`
  ${InputIconToggleStyle} {
    margin-right: 0;
    position: absolute;
    right: 0;
    height: 100%;
  }

  ${InputPresentationStyle} {
    padding-right: ${({ size }) => sizes[size].height};
    position: relative;
  }
`;

const StyledAccessibilityLabelContainer = styled.div`
  display: none;
`;

StyledSelectPillContainer.defaultProps = {
  theme: baseTheme,
};

export {
  StyledSelectPillContainer,
  StyledSelectMultiSelect,
  StyledAccessibilityLabelContainer,
};
