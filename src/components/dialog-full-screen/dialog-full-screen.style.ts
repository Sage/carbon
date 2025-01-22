import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledContent from "./content.style";
import StyledIconButton from "../icon-button/icon-button.style";
import StyledFullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";
import {
  StyledHeader,
  StyledHeaderContent,
  StyledHeading,
} from "../heading/heading.style";

const StyledDialogFullScreen = styled.div<{ pagesStyling?: boolean }>`
  :focus {
    outline: none;
  }

  background-color: var(--colorsUtilityMajor025);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) =>
    theme.zIndex
      .fullScreenModal}; // TODO (tokens): implement elevation tokens - FE-4437
  display: flex;
  flex-direction: column;

  ${StyledHeaderContent} {
    align-items: baseline;
  }

  > ${StyledIconButton} {
    margin: 0;
    position: absolute;
    right: 40px;
    top: 26px;
    z-index: 1;
  }

  /**
    The following CSS is for a legacy use of the Pages component.
    Please do not remove this until Pages has been re-written.
   */
  ${({ pagesStyling, title }) =>
    pagesStyling &&
    css`
      ${StyledContent} {
        padding: 0;
        margin-top: -25px;
      }

      ${StyledIconButton} {
        margin: 0;
        position: absolute;
        right: 33px;
        top: 32px;
        z-index: 1;
      }

      /* If the component has a title, we need to keep the same styles. If it does not have a title,
       we need the padding to compensate for loss of 32px height */
      ${StyledFullScreenHeading} {
        padding: ${title ? `32px 32px 0` : `64px 32px 0`};
      }

      ${StyledHeading} {
        width: auto;
        padding-top: 4px;

        ${StyledHeader} {
          margin: 0 0 0 3px;
          box-sizing: content-box;
          width: 100%;
        }
      }
    `}
`;

StyledDialogFullScreen.defaultProps = {
  theme: baseTheme,
};

export default StyledDialogFullScreen;
