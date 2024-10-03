import styled, { css } from "styled-components";

import { space, padding } from "styled-system";
import StyledFormField from "../../__internal__/form-field/form-field.style";

import baseTheme from "../../style/themes/base";
import { FormButtonAlignment } from "./form.config";
import StyledSearch from "../search/search.style";
import StyledTextarea from "../textarea/textarea.style";

interface StyledFormContentProps {
  stickyFooter?: boolean;
  isInModal?: boolean;
}

export const StyledFormContent = styled.div<StyledFormContentProps>`
  ${({ stickyFooter, isInModal }) => css`
    ${stickyFooter &&
    css`
      /* Take responsibility for handling overflow away from parent modal */
      overflow-y: ${isInModal ? "auto" : "inherit"};
      flex: 1;
    `}
  `}
`;

interface ButtonProps extends StyledFormContentProps {
  buttonAlignment?: FormButtonAlignment;
  fullWidthButtons?: boolean;
}

export const StyledFormFooter = styled.div<ButtonProps>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--sizing200);

  ${({ buttonAlignment }) =>
    buttonAlignment === "right" &&
    css`
      justify-content: flex-end;
    `}

  ${({ stickyFooter, fullWidthButtons, isInModal }) => css`
    ${!stickyFooter &&
    css`
      margin-top: 48px;
    `}

    ${stickyFooter &&
    css`
      background-color: var(--colorsUtilityYang100);
      box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      padding: 16px 32px;
      width: 100%;
      z-index: 1000;
      ${!isInModal &&
      css`
        position: sticky;
      `}
      bottom: 0;
    `}

    ${fullWidthButtons &&
    css`
      flex-direction: column;
      align-items: stretch;
    `}
  `}

  ${padding}
`;

StyledFormFooter.defaultProps = {
  theme: baseTheme,
};

// Accounts for height of the header of Modal parent, the height form footer and some additional spacing
const HEIGHT_SPACING = 216;

interface StyledFormProps extends StyledFormContentProps {
  height?: string;
  fieldSpacing: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  isInSidebar?: boolean;
}

export const StyledForm = styled.form<StyledFormProps>`
  ${space}

  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}

  // field spacing is also applied to form field here so we need to override
  ${StyledSearch} ${StyledFormField}, ${StyledTextarea} ${StyledFormField} {
    margin-bottom: var(--spacing000);
  }

  ${({ stickyFooter, isInModal, isInSidebar }) =>
    stickyFooter &&
    css`
      display: flex;
      flex-direction: column;
      position: relative;

      ${isInModal &&
      css`
        max-height: calc(100vh - ${HEIGHT_SPACING}px);
      `}

      ${isInSidebar &&
      css`
        min-height: 100%;
      `}
    `}
`;

export const StyledRightButtons = styled.div<ButtonProps>`
  display: flex;
  gap: var(--sizing200);

  ${({ buttonAlignment }) => buttonAlignment === "left" && "flex-grow: 1;"}
`;

export const StyledLeftButtons = styled.div<ButtonProps>`
  display: flex;
  justify-content: flex-end;
  gap: var(--sizing200);

  ${({ buttonAlignment }) => buttonAlignment === "right" && "flex-grow: 1;"}
`;

StyledForm.defaultProps = {
  theme: baseTheme,
};
