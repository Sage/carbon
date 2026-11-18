import styled from "styled-components";
import StyledPill from "../../pill/pill.style";
import StyledSelect, { type StyledSelectProps } from "../select.style";

interface StyledSelectMultiSelectProps extends StyledSelectProps {
  size: string;
}

const StyledSelectMultiSelect = styled(
  StyledSelect,
)<StyledSelectMultiSelectProps>`
  && [data-role="input-text-container"] {
    ${StyledPill} {
      max-width: 100%;

      [data-element="multi-select-pill-text"] {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

const StyledAccessibilityLabelContainer = styled.div`
  display: none;
`;

export { StyledSelectMultiSelect, StyledAccessibilityLabelContainer };
