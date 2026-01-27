import styled, { css } from "styled-components";

interface StyledLabelProps {
  isLarge?: boolean;
  isRequired?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
  color: ${({ disabled, readOnly }) => {
    if (disabled) {
      return "var(--input-labelset-label-disabled)";
    }
    if (readOnly) {
      return "var(--input-labelset-label-readOnly)";
    }
    return "var(--input-labelset-label-default)";
  }};

  font-family: var(--fontFamiliesDefault);

  font-size: ${({ isLarge }) =>
    isLarge
      ? "var(--global-font-static-body-regular-l)"
      : "var(--global-font-static-body-regular-m)"};

  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  ${({ isRequired, isLarge }) =>
    isRequired &&
    css`
      display: inline-flex;
      align-items: center;

      ::after {
        content: "*";
        color: var(--input-labelset-label-required);
        font-family: var(--fontFamiliesDefault);

        font-size: ${isLarge
          ? "var(--global-font-static-body-regular-l)"
          : "var(--global-font-static-body-regular-m)"};

        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        margin-left: 4px;
      }
    `}
`;

export default StyledLabel;
