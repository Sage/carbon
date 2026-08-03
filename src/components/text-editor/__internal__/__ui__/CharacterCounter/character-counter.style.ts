import styled, { css } from "styled-components";

import visuallyHidden from "../../../../../style/utils/visually-hidden";

const fontSize = {
  small: "var(--global-font-static-comp-regular-s)",
  medium: "var(--global-font-static-comp-regular-m)",
  large: "var(--global-font-static-comp-regular-l)",
};

export const StyledCharacterCounter = styled.div<{
  size: "small" | "medium" | "large";
}>`
  ${({ size }) => css`
    font: ${fontSize[size]};
    color: var(--input-typical-txt-alt);
  `}
`;

export const VisuallyHiddenCharacterCounter = styled.div`
  ::after {
    content: " ";
  }

  ${visuallyHidden}
`;

export default StyledCharacterCounter;
