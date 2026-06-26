import styled from "styled-components";

const StyledLabelWrapper = styled.div<{ $align?: "left" | "right" }>`
  display: flex;
  justify-content: ${({ $align }) =>
    $align === "right" ? "flex-end" : "flex-start"};
`;

export default StyledLabelWrapper;
