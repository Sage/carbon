import styled from "styled-components";

export default styled.button<{ isRed: boolean }>`
  background-color: ${({ isRed }) => (isRed ? "red" : "magenta")};
  font-size: 20px;
`;
