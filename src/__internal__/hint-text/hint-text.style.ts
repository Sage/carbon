import styled from "styled-components";

interface StyledHintTextProps {
  $isLarge?: boolean;
  $disabled?: boolean;
}

const StyledHintText = styled.span<StyledHintTextProps>`
  color: ${({ $disabled }) =>
    $disabled
      ? "var(--input-labelset-label-disabled)"
      : "var(--input-labelset-label-alt)"};

  font: ${({ $isLarge }) =>
    $isLarge
      ? "var(--global-font-static-comp-regular-l)"
      : "var(--global-font-static-comp-regular-m)"};
`;

export default StyledHintText;
