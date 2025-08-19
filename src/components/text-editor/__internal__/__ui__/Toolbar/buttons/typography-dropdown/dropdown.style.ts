import styled, { css } from "styled-components";
import addFocusStyling from "../../../../../../../style/utils/add-focus-styling";

type ButtonProps = { size: "small" | "medium" | "large"; menuOpen?: boolean };
type ListProps = { size: "small" | "medium" | "large" };

const getSizeForComponent = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "32px";
    case "large":
      return "48px";
    default:
      return "40px";
  }
};

export const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  min-height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background: transparent;
  border-radius: var(--borderRadius100);
  cursor: pointer;
  font-size: var(--fontSizes100);
  font-weight: var(--fontWeights500);

  height: ${({ size }) => getSizeForComponent(size)};

  ${({ menuOpen }) =>
    menuOpen &&
    css`
      ${addFocusStyling()}
    `}

  &:focus {
    ${addFocusStyling()}
  }
`;

export const StyledMenu = styled.ul<ListProps>`
  position: absolute;
  top: ${({ size }) => {
    if (size === "small") return "38px";
    if (size === "large") return "54px";
    return "46px";
  }};
  left: 0;
  z-index: 1;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  list-style: none;
  margin: 0;
  padding: 8px 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

export const StyledMenuItem = styled.li<{
  isFocused: boolean;
}>`
  background: ${(props) => (props.isFocused ? "#f0f0f0" : "white")};
  cursor: pointer;
  user-select: none;
  padding: 8px 16px;
  color: var(--colorsUtilityYin055);

  && {
    &:hover {
      background: #f0f0f0;
      color: var(--colorsUtilityYin100);
    }
  }

  &:focus-visible {
    box-shadow: inset 0px 0px 0px var(--borderWidth300)
      var(--colorsUtilityYin090);
    outline: none;
    background: white;

    &:hover {
      background-color: var(--colorsUtilityYang100);
    }
  }
`;
