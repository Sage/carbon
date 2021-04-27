import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledContent from "./content.style";
import StyledIconButton from "../icon-button/icon-button.style";
import StyledFullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";
import { StyledHeader, StyledHeading } from "../heading/heading.style";

const StyledDialogFullScreen = styled.div`
  background-color: ${({ theme }) => theme.disabled.input};
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.fullScreenModal};
  display: flex;
  flex-direction: column;

  /**
    The following CSS is for a legacy use of the Pages component.
    Please do not remove this until Pages has been re-written.
   */
  ${({ pagesStyling }) =>
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

      ${StyledFullScreenHeading} {
        padding: 32px 32px 0;
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
