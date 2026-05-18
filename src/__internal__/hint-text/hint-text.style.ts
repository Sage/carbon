import styled from "styled-components";

const getFontToken = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "var(--global-font-static-comp-regular-s)";
    case "large":
      return "var(--global-font-static-comp-regular-l)";
    default:
      // default is medium
      return "var(--global-font-static-comp-regular-m)";
  }
};
interface StyledHintTextProps {
  $size: "small" | "medium" | "large";
  $disabled?: boolean;
}

const StyledHintText = styled.span<StyledHintTextProps>`
  color: ${({ $disabled }) =>
    $disabled
      ? "var(--input-labelset-label-disabled)"
      : "var(--input-labelset-label-alt)"};

  font: ${({ $size }) => getFontToken($size)};
`;

export default StyledHintText;
