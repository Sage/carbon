import styled from "styled-components";
import Typography from "../typography";
import { LoaderStarProps } from "./loader-star.component";

export const StyledLoaderStarWrapper = styled.div<LoaderStarProps>`
  position: relative;
  width: max-content;
`;

export const StyledLabel = styled(Typography)`
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const StyledStars = styled.div`
  width: 40px;
  height: 40px;
`;
