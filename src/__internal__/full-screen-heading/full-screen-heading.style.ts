import styled, { css } from "styled-components";
import {
  StyledHeader,
  StyledHeading,
} from "../../components/heading/heading.style";

export interface StyledFullScreenHeadingProps {
  hasContent?: boolean;
  hasCloseButton?: boolean;
}

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 100%;
`;

const StyledFullScreenHeading = styled.div<StyledFullScreenHeadingProps>`
  ${({ hasContent }) =>
    hasContent &&
    css`
      border-bottom: 1px solid var(--colorsUtilityMajor050);
    `}
  background-color: var(--colorsUtilityYang100);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  padding: 0 16px;
  @media screen and (min-width: 600px) {
    padding: 0 24px;
  }
  @media screen and (min-width: 960px) {
    padding: 0 32px;
  }
  @media screen and (min-width: 1260px) {
    padding: 0 40px;
  }

  ${({ hasCloseButton }) =>
    hasCloseButton &&
    css`
      & {
        // prevent the close button from overlapping the title
        padding-right: 64px;
      }
    `}

  ${StyledHeading} {
    width: auto;
    margin-bottom: 24px;

    ${StyledHeader} {
      background-color: transparent;
      padding-bottom: 0;
      margin: 22px 24px 0 0;
    }
  }
`;

export default StyledFullScreenHeading;
