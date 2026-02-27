import styled, { css } from "styled-components";

const sizeMap = {
  small: {
    gap: "var(--global-space-comp-s)",
  },
  medium: {
    gap: "var(--global-space-comp-m)",
  },
  large: {
    gap: "var(--global-space-comp-l)",
  },
};

const StyledRadioButtonGroupContent = styled.div<{
  $size: "small" | "medium" | "large";
  $inline?: boolean;
}>`
  ${({ $size, $inline }) => css`
    display: flex;
    flex-direction: column;
    gap: ${sizeMap[$size].gap};

    ${$inline &&
    css`
      flex-direction: row;
      gap: var(--global-space-comp-l);
    `}
  `}
`;

export default StyledRadioButtonGroupContent;
