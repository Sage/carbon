import styled, { css } from "styled-components";
import { StyledForm, StyledFormContent } from "../form/form.style";
import addFocusStyling from "../../style/utils/add-focus-styling";

type StyledContentProps = {
  hasHeader: boolean;
  disableContentPadding?: boolean;
  hasTitle?: boolean;
};

function computePadding() {
  return css`
    padding: 0 16px;
    @media screen and (min-width: 600px) {
      padding: 0 24px;
    }
    @media screen and (min-width: 960px) {
      padding: 0 32px;
    }
    @media screen and (min-width: 1260px) {
      padding: 0 40px;
    }
  `;
}

const StyledContent = styled.div<StyledContentProps>`
  box-sizing: border-box;
  display: block;
  overflow-y: auto;

  flex: 1;

  &:focus-visible {
    margin: var(--spacing075);
    ${({ hasTitle }) =>
      !hasTitle && "border-top-left-radius: var(--borderRadius200)"};
    ${addFocusStyling()}
  }

  ${({ disableContentPadding }) =>
    disableContentPadding ? "padding: 0" : computePadding()}

  &:has(${StyledForm}.sticky) {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    padding: 0;

    ${StyledForm}.sticky {
      ${StyledFormContent} {
        ${({ disableContentPadding }) =>
          disableContentPadding ? "padding: 0" : computePadding()}
      }
    }
  }

  ${({ hasHeader }) =>
    !hasHeader &&
    css`
      padding-top: 0;
      margin-top: -25px;
    `}
`;

export default StyledContent;
