import styled from "styled-components";
import Button from "../../button/__next__";

const StyledDecimalPopoverButton = styled(Button)`
  border-radius: 0 var(--global-radius-action-m) var(--global-radius-action-m) 0;
  border-left: none;
`;

const StyledDecimalPopoverButtonWrapper = styled.span`
  display: contents;
`;

export { StyledDecimalPopoverButton, StyledDecimalPopoverButtonWrapper };
