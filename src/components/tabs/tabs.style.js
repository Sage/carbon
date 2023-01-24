import styled, { css } from "styled-components";
import { margin } from "styled-system";
import PropTypes from "prop-types";
import BaseTheme from "../../style/themes/base";
import { StyledTabsHeaderWrapper } from "./__internal__/tabs-header/tabs-header.style";
import StyledTab from "./tab/tab.style";

const StyledTabs = styled.div`
  ${({ position, inSidebar, headerWidth }) => css`
    color: var(--colorsActionMinorYin090);

    span {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    ${position === "left" &&
    css`
      ${headerWidth &&
      css`
        ${StyledTabsHeaderWrapper} {
          width: ${headerWidth};
        }

        ${StyledTab} {
          width: auto;
        }
      `}

      ${!inSidebar &&
      css`
        display: flex;
      `}

      width: 100%;
    `}
  `}

  ${margin}
`;

StyledTabs.defaultProps = {
  position: "top",
  theme: BaseTheme,
};

StyledTabs.propTypes = {
  position: PropTypes.oneOf(["top", "left"]),
  hasCustomTarget: PropTypes.bool,
};

export default StyledTabs;
