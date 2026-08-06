import styled, { css } from "styled-components";

const sizeMap = {
  small: {
    font: "var(--global-font-static-comp-regular-s)",
    gap: "var(--global-space-comp-m)",
  },
  medium: {
    font: "var(--global-font-static-comp-regular-m)",
    gap: "var(--global-space-comp-l)",
  },
  large: {
    font: "var(--global-font-static-comp-regular-l)",
    gap: "var(--global-space-comp-xl)",
  },
};

const StyledNumeralDate = styled.div<{
  name?: string;
  $size: "small" | "medium" | "large";
}>`
  display: inline-flex;

  ${({ $size }) => css`
    gap: ${sizeMap[$size].gap};

    .numeral-date-wrapper label {
      font: ${sizeMap[$size].font};
    }
  `}
`;

export default StyledNumeralDate;
