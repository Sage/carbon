import styled, { css } from "styled-components";
import sizes from "./input-sizes.style";
import StyledInput from "./input.style";
import { CommonInputPresentationProps } from "./input-presentation.component";
import { InputContextProps } from "../input-behaviour";
import { CarbonProviderProps } from "../../components/carbon-provider";

export const StyledInputPresentationContainer = styled.div<
  Pick<CommonInputPresentationProps, "inputWidth" | "maxWidth">
>`
  flex: 0 0 ${({ inputWidth }) => inputWidth}%;
  display: flex;
  position: relative;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}` : "100%")};
`;

function stylingForValidations({
  error,
  warning,
  info,
  disabled,
  validationRedesignOptIn,
}: Pick<
  CommonInputPresentationProps,
  "error" | "warning" | "info" | "disabled"
> &
  Pick<CarbonProviderProps, "validationRedesignOptIn">) {
  let validationColor;

  if (disabled) {
    return "";
  }

  if (error) {
    validationColor = "var(--colorsSemanticNegative500)";
  } else if (warning) {
    validationColor = validationRedesignOptIn
      ? "var(--colorsUtilityMajor300)"
      : "var(--colorsSemanticCaution500)";
  } else if (info) {
    validationColor = "var(--colorsSemanticInfo500)";
  } else {
    return "";
  }

  return css`
    border-color: ${validationColor} !important;
    z-index: 1;
    ${error &&
    `box-shadow: inset 1px 1px 0 ${validationColor}, inset -1px -1px 0 ${validationColor};`}
  `;
}

const InputPresentationStyle = styled.div<
  Pick<InputContextProps, "hasFocus"> &
    Pick<
      CommonInputPresentationProps,
      | "align"
      | "disabled"
      | "readOnly"
      | "size"
      | "error"
      | "warning"
      | "info"
      | "hasIcon"
    > &
    Pick<CarbonProviderProps, "validationRedesignOptIn">
>`
  align-items: stretch;
  background: var(--colorsUtilityYang100);
  border: 1px solid var(--colorsUtilityMajor300);
  border-radius: var(--borderRadius050);
  box-sizing: border-box;
  cursor: text;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  ${({ size, hasIcon, align }) =>
    size &&
    css`
      min-height: ${sizes[size].height};

      ${StyledInput} {
        padding: 0 ${sizes[size].horizontalPadding};
        ${hasIcon && align === "right" && "padding-left: 0;"}
        ${hasIcon && align === "left" && "padding-right: 0;"}
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background: var(--colorsUtilityDisabled400);
      border-color: var(--colorsUtilityDisabled600);
      cursor: not-allowed;
    `}

  ${({ hasFocus }) =>
    hasFocus &&
    css`
      & {
        outline: 3px solid var(--colorsSemanticFocus500);
        z-index: 2;
      }
    `}

  ${stylingForValidations}

  ${({ readOnly }) =>
    readOnly &&
    css`
      background-color: var(--colorsUtilityReadOnly400);
      border-color: var(--colorsUtilityReadOnly600);
    `}

  ${({ align }) => align === "right" && "flex-direction: row-reverse"}

  input::-ms-clear {
    display: none;
  }
  input::-webkit-contacts-auto-fill-button {
    display: none !important;
  }
`;

export default InputPresentationStyle;
