import styled, { css } from "styled-components";
import sizes from "../../../../__internal__/input/input-sizes.style";
import { SelectTextboxProps } from "./select-textbox.component";

interface StyledSelectTextProps
  extends Required<
    Pick<SelectTextboxProps, "disabled" | "readOnly" | "transparent" | "size">
  > {
  hasPlaceholder: boolean;
}

const StyledSelectText = styled.span<StyledSelectTextProps>`
  ${({ disabled, hasPlaceholder, readOnly, transparent, size }) => css`
    align-items: center;
    display: inline-flex;
    flex-grow: 1;
    font-size: 14px;
    height: auto;
    outline: none;
    width: 30px;
    z-index: 1;
    padding-left: ${sizes[size].horizontalPadding};

    ${transparent &&
    css`
      font-weight: 500;
      text-align: right;
    `}

    ${hasPlaceholder &&
    css`
      color: ${transparent
        ? `var(--colorsUtilityYin100)`
        : `var(--colorsUtilityYin055)`};
      font-weight: ${transparent ? 500 : "normal"};
      user-select: none;
    `}

    ${disabled &&
    css`
      cursor: not-allowed;
      color: var(--colorsUtilityYin030);
      text-shadow: none;
    `}

    ${readOnly &&
    css`
      cursor: default;
      color: var(--colorsUtilityYin065);
      text-shadow: none;
    `}
  `}
`;

const StyledSelectTextChildrenWrapper = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { StyledSelectText, StyledSelectTextChildrenWrapper };
