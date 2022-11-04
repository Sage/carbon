import styled from "styled-components";
import { CardAlign } from "../card.config";

export interface StyledCardColumnProps {
  /** Text alignment of the card section text */
  align: CardAlign;
}
const StyledCardColumn = styled.div<StyledCardColumnProps>`
  flex-grow: 1;
  text-align: ${({ align }) => align};
`;

export default StyledCardColumn;
