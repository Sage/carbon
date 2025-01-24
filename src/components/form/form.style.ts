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

export const StyledFormContent = styled.div<StyledFormContentProps>(
  ({ stickyFooter, isInModal }) =>
    stickyFooter &&
    isInModal &&
    css`
      flex-grow: 1;
      min-height: 0;
      overflow-y: auto;
    `,
);

interface StyledFormFooterProps {
  stickyFooter?: boolean;
  fullWidthButtons?: boolean;
  buttonAlignment?: FormButtonAlignment;
}

export const StyledFormFooter = styled.div<StyledFormFooterProps>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--sizing200);

  ${({ buttonAlignment }) =>
    buttonAlignment === "right" &&
    css`
      justify-content: flex-end;
    `}

  ${({ stickyFooter, fullWidthButtons }) => css`
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
      position: sticky;
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

interface StyledFormProps extends StyledFormContentProps {
  height?: string;
  fieldSpacing: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const StyledForm = styled.form<StyledFormProps>`
  ${space}

  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}

  // field spacing is also applied to form field here so we need to override
  ${StyledSearch} ${StyledFormField}, ${StyledTextarea} ${StyledFormField}, [data-component="time"] ${StyledFormField} {
    margin-bottom: var(--spacing000);
  }

  ${({ stickyFooter, isInModal }) =>
    stickyFooter &&
    css`
      display: flex;
      flex-direction: column;
      position: relative;

      ${isInModal &&
      css`
        flex-grow: 1;
        min-height: 0;
        height: 100%;
      `}
    `}
`;

export const StyledRightButtons = styled.div<{
  buttonAlignment?: FormButtonAlignment;
}>`
  display: flex;
  gap: var(--sizing200);

  ${({ buttonAlignment }) => buttonAlignment === "left" && "flex-grow: 1;"}
`;

export const StyledLeftButtons = styled.div<{
  buttonAlignment?: FormButtonAlignment;
}>`
  display: flex;
  justify-content: flex-end;
  gap: var(--sizing200);

  ${({ buttonAlignment }) => buttonAlignment === "right" && "flex-grow: 1;"}
`;

StyledForm.defaultProps = {
  theme: baseTheme,
};
