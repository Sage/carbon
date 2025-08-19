import styled from "styled-components";
import addFocusStyling from "../../../../../../../style/utils/add-focus-styling";

export const StyledButton = styled.button`
  width: 100%;
  min-height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background: transparent;
  border-radius: var(--borderRadius100);
  cursor: pointer;

  &:focus {
    ${addFocusStyling(false)}
  }
`;

export const StyledMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

export const StyledMenuItem = styled.li<{ isFocused: boolean }>`
  padding: 8px 12px;
  background: ${(props) => (props.isFocused ? "#f0f0f0" : "white")};
  cursor: pointer;
  user-select: none;
  padding: 8px 16px;

  &:hover {
    background: #f0f0f0;
  }
`;
