import styled, { FlattenSimpleInterpolation } from "styled-components";

interface StyledBaseLinkProps {
    $styles?: FlattenSimpleInterpolation;
}

const StyledBaseLinkWrapper = styled.span<StyledBaseLinkProps>`
  ${({ $styles }) => $styles};
`;

export default StyledBaseLinkWrapper;