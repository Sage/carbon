import styled from "styled-components";
import { space, grid } from "styled-system";

const GridContainerStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  width: auto;
  padding: 40px;
  grid-gap: 40px;

  @media screen and (max-width: 1920px) {
    grid-gap: 24px;
  }

  @media screen and (max-width: 1259px) {
    padding: 32px;
  }

  @media screen and (max-width: 959px) {
    grid-gap: 16px;
    padding: 24px;
  }

  @media screen and (max-width: 599px) {
    padding: 16px;
  }

  @media screen {
    ${space}
    ${({ gridGap }) => grid({ gridGap })}
`;

export default GridContainerStyle;
