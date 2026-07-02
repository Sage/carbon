import styled, { css } from "styled-components";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import visuallyHidden from "../../style/utils/visually-hidden";

import { getFont } from "../../components/textarea/textarea.style";
import type { TextAreaSize } from "../../components/textarea/textarea.style";

const StyledCharacterCountWrapper = styled.div``;

const StyledCharacterCount = styled.div.attrs(applyBaseTheme)<{
  isOverLimit: boolean;
  isLarge?: boolean;
  $size?: TextAreaSize;
}>`
  text-align: left;
  ${({ $size }) => getFont($size || "medium", "regular")};
  margin: ${({ $size }) =>
    `${$size === "large" ? "var(--global-space-comp-s)" : "var(--global-space-comp-xs)"} 0px`};
  color: ${({ isOverLimit }) =>
    isOverLimit
      ? " var(--input-validation-label-error)"
      : "var(--input-typical-txt-alt)"};

  ${({ isLarge }) =>
    isLarge &&
    css`
      font: var(--global-font-static-comp-regular-l);
    `}
  ${({ isOverLimit, $size }) =>
    isOverLimit &&
    css`
      ${getFont($size || "medium", "medium")};
    `}
`;

const VisuallyHiddenCharacterCount = styled.div`
  ::after {
    content: " ";
  }

  ${visuallyHidden}
`;

const VisuallyHiddenHint = styled.div`
  ::before {
    content: " ";
  }

  ::after {
    content: " ";
  }

  ${visuallyHidden}
`;

export {
  StyledCharacterCountWrapper,
  StyledCharacterCount,
  VisuallyHiddenCharacterCount,
  VisuallyHiddenHint,
};
