import styled from "styled-components";
import InputSizes from "../../../__internal__/input/input-sizes.style";
import { TextboxProps } from "../textbox.component";

const StyledPrefix = styled.span<{ size: NonNullable<TextboxProps["size"]> }>`
  align-self: center;
  font-weight: 900;
  margin-left: ${({ size }) =>
    InputSizes[size]
      .horizontalPadding}; // margin must match the original component padding

  && + input {
    padding-left: var(--spacing100);
  }
`;

export default StyledPrefix;
