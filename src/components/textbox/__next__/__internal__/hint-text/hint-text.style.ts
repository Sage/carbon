import styled from "styled-components";

interface StyledHintTextProps {
  isLarge?: boolean;
  disabled?: boolean;
}

const StyledHintText = styled.span<StyledHintTextProps>`
  color: ${({ disabled }) =>
    disabled
      ? "var(--input-labelset-label-disabled)"
      : "var(--input-labelset-label-alt)"};

  font-family: var(--fontFamiliesDefault);

  font-size: ${({ isLarge }) =>
    isLarge
      ? "var(--global-font-static-body-regular-l)"
      : "var(--global-font-static-body-regular-m)"};

  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

export default StyledHintText;
