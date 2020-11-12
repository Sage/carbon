import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import OptionsHelper from "../../../../utils/helpers/options-helper/options-helper";
import baseTheme from "../../../../style/themes/base";

const computeLineWidth = ({ alternateStyling, isInSidebar, position }) => {
  if (isInSidebar && position === "left") {
    return "0px";
  }
  return alternateStyling ? "-1px" : "-2px";
};

const StyledTabHeaders = styled.ul`
  display: flex;
  box-shadow: inset 0px ${computeLineWidth} 0px 0px
    ${({ theme }) => theme.tab.background};
  ${({ extendedLine }) =>
    !extendedLine &&
    css`
      width: fit-content;
    `}
  cursor: pointer;
  list-style: none;
  margin: 0 0 10px;
  padding: 0;

  ${({ align }) =>
    align === "right" &&
    css`
      justify-content: flex-end;
      text-align: right;
    `}

  ${({ position, noRightBorder, isInSidebar, theme }) =>
    position === "left" &&
    css`
      flex-direction: column;
      box-shadow: inset ${computeLineWidth} 0px 0px 0px ${theme.tab.background};

      ${noRightBorder &&
      css`
        box-shadow: none;
      `}

      ${!isInSidebar &&
      css`
        width: 20%;
        margin: 0 10px 0;
      `}

    ${isInSidebar &&
      css`
        width: 100%;
        margin: auto;
      `}

    ${({ align }) =>
        align === "right" &&
        css`
          justify-content: flex-start;
        `}
    `}
`;

StyledTabHeaders.defaultProps = {
  align: "left",
  position: "top",
  extendedLine: true,
  theme: baseTheme,
};

StyledTabHeaders.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  position: PropTypes.oneOf(["top", "left"]),
};

export default StyledTabHeaders;
