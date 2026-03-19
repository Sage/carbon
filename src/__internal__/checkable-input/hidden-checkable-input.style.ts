import styled, { css } from "styled-components";

const HiddenCheckableInputStyle = styled.input<{
  disabled?: boolean;
}>`
  cursor: pointer;
  opacity: 0;
  margin: 0;
  position: relative;
  z-index: 2;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export default HiddenCheckableInputStyle;
