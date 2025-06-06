import styled, { SimpleInterpolation } from "styled-components";

interface StyledBaseLinkProps {
  $styles?: SimpleInterpolation;
}

const StyledBaseLinkWrapper = styled.span<StyledBaseLinkProps>`
  ${({ $styles }) => $styles};
`;

export default StyledBaseLinkWrapper;
