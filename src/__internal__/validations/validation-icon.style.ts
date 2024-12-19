import styled, { css } from "styled-components";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";
import StyledIcon from "../../components/icon/icon.style";
import { ValidationIconProps } from "./validation-icon.component";
import addFocusStyling from "../../style/utils/add-focus-styling";

const validationIconTypes = {
  error: "var(--colorsSemanticNegative500)",
  info: "var(--colorsSemanticInfo500)",
  warning: "var(--colorsSemanticCaution500)",
};

type ValidationType = "error" | "warning" | "info";

const ValidationIconStyle = styled.span<
  ValidationIconProps & { validationType: ValidationType }
>`
  background: none;
  cursor: default;
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  border: 0;
  outline: none;

  ${({ isPartOfInput }) =>
    isPartOfInput &&
    css`
      cursor: pointer;
    `}

  ${StyledIcon}:before {
    color: ${({ validationType }) => validationIconTypes[validationType]};
  }

  ${StyledIcon}:focus {
    ${addFocusStyling()}
  }

  ${margin}
`;

ValidationIconStyle.defaultProps = {
  validationType: "error",
  theme: BaseTheme,
};

export default ValidationIconStyle;
