import styled from "styled-components";
import StyledPill from "../../pill/pill.style";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import InputIconToggleStyle from "../../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledSelect, { type StyledSelectProps } from "../select.style";
import InputPresentationStyle from "../../../__internal__/input/input-presentation.style";
import StyledInput from "../../../__internal__/input/input.style";
import sizes from "../../../__internal__/input/input-sizes.style";

const StyledSelectPillContainer = styled.div.attrs(applyBaseTheme)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3px 2px 3px 0;
  max-width: 100%;

  && ${StyledPill} {
    text-overflow: ellipsis;
  }
`;

interface StyledSelectMultiSelectProps extends StyledSelectProps {
  size: string;
}

const StyledSelectMultiSelect = styled(
  StyledSelect,
)<StyledSelectMultiSelectProps>`
  ${InputIconToggleStyle} {
    position: absolute;
    right: 0;
    height: 100%;
  }

  ${InputPresentationStyle} {
    padding-right: ${({ size }) => sizes[size].height};
    padding-left: ${({ size }) => sizes[size].horizontalPadding};
    position: relative;

    ${StyledInput} {
      padding: 0;
    }
  }
`;

const StyledAccessibilityLabelContainer = styled.div`
  display: none;
`;

export {
  StyledSelectPillContainer,
  StyledSelectMultiSelect,
  StyledAccessibilityLabelContainer,
};
