import styled, { css } from "styled-components";
import { margin } from "styled-system";
import InputPresentation from "../../__internal__/input/input-presentation.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import baseTheme from "../../style/themes/base";
import { InlineInputsProps } from "./inline-inputs.component";

type GutterOptions =
  | "none"
  | "extra-small"
  | "small"
  | "medium-small"
  | "medium"
  | "medium-large"
  | "large"
  | "extra-large";
interface StyledInlineInputProps {
  /** Gutter prop gets passed down to Row component if false gutter value is "none" */
  gutter?: GutterOptions;
}

export interface StyledContentContainerProps extends StyledInlineInputProps {
  /** Width of the inline inputs container in percentage */
  inputWidth?: number;
}

export interface StyledInlineInputsProps extends StyledInlineInputProps {
  /** Width of a label in percentage */
  labelWidth?: number;
  /** @ignore @private */
  labelInline?: boolean;
}

const spacings = {
  none: 0,
  "extra-small": 8,
  small: 16,
  "medium-small": 20,
  medium: 24,
  "medium-large": 28,
  large: 32,
  "extra-large": 40,
};

const StyledInlineInput = styled.div<InlineInputsProps>`
  flex: 1;

  ${({ gutter }) =>
    gutter &&
    css`
      margin-bottom: 0;
      padding-left: ${spacings[gutter]}px;
    `}
`;

const StyledContentContainer = styled.div<InlineInputsProps>`
  display: flex;
  flex: ${({ inputWidth }) => (inputWidth ? `0 0 ${inputWidth}%` : 1)};

  ${({ gutter }) =>
    gutter &&
    css`
      margin-bottom: 0;
      margin-left: -${spacings[gutter]}px;

      ${gutter === "none" &&
      css`
        ${StyledInlineInput} + ${StyledInlineInput} ${InputPresentation} {
          border-left: none;
        }
      `}
    `}
`;

const StyledInlineInputs = styled.div<InlineInputsProps>`
  ${margin}

  display: ${({ labelInline }) => (labelInline ? `flex` : `block`)};
  align-items: center;

  ${StyledLabelContainer} {
    width: auto;
    margin-bottom: ${({ labelInline }) => (labelInline ? `0px` : `8px`)};
    padding-right: 16px;
    flex: 0 0 ${({ labelWidth }) => (labelWidth ? `${labelWidth}%` : "auto")};
  }

  input {
    width: 1px;
  }

  [data-component="carbon-select"] input {
    width: 30px;
  }
`;

StyledInlineInputs.defaultProps = {
  theme: baseTheme,
};

export { StyledContentContainer, StyledInlineInput };
export default StyledInlineInputs;
