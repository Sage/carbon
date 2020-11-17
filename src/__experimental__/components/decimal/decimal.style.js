/* eslint-disable react/no-did-update-set-state */
import styled, { keyframes, css } from "styled-components";

export const wiggleAnimation = keyframes`
  0% {
    transform: translate3d(-5px, 0, 0);
  }
  25% {
    transform: translate3d(5px, 0, 0);
  }
  50% {
    transform: translate3d(-5px, 0, 0);
  }
  75% {
    transform: translate3d(5px, 0, 0);
  }
  100% {
    transform: translate3d(0px, 0, 0);
  }
`;

const StyledWiggle = styled.div`
  transform: translate3d(0, 0, 0);
  ${(p) =>
    p.isAnimating &&
    css`
      animation: 0.4s ${wiggleAnimation} 1 ease-in forwards;
    `};
`;

export default StyledWiggle;
