import styled, { css } from "styled-components";
import propTypes from "prop-types";
import { padding } from "styled-system";
import BaseTheme from "../../../style/themes/base";

const StyledTab = styled.div`
  display: none;

  ${({ isTabSelected, position }) =>
    isTabSelected &&
    css`
      display: block;

      ${position === "left" &&
      css`
        width: 80%;
      `}

      ${padding}
    `}
`;

StyledTab.defaultProps = {
  position: "top",
  theme: BaseTheme,
};

StyledTab.propTypes = {
  position: propTypes.oneOf(["top", "left"]),
};

export default StyledTab;
