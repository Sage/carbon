import styled, { css } from "styled-components";
import { margin } from "styled-system";
import PropTypes from "prop-types";
import BaseTheme from "../../style/themes/base";

const StyledTabs = styled.div`
  ${({ position, inSidebar, theme }) => css`
    color: ${theme.text.color};

    ${position === "left" &&
    css`
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
