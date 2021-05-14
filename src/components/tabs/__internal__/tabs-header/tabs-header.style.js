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

const StyledTabsHeaderWrapper = styled.div`
  ${({ position, isInSidebar }) =>
    position === "left" &&
    css`
      overflow-y: auto;
      padding: 2px;

      ${!isInSidebar &&
      css`
        min-width: 20%;
        margin: 0 0 0 10px;
      `}

      ${isInSidebar &&
      css`
        min-width: 100%;
        margin: auto;
        padding: 0px;
      `}
    `}
`;

const StyledTabsHeaderList = styled.ul`
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
  margin: 0;
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
        margin: 0 0 0 10px;
      `}

    ${isInSidebar &&
      css`
        margin: auto;
      `}

    ${({ align }) =>
        align === "right" &&
        css`
          justify-content: flex-start;
        `}
    `}
`;

StyledTabsHeaderWrapper.defaultProps = {
  position: "top",
};

StyledTabsHeaderWrapper.propTypes = {
  position: PropTypes.oneOf(["top", "left"]),
  isInSidebar: PropTypes.bool,
};

StyledTabsHeaderList.defaultProps = {
  align: "left",
  position: "top",
  extendedLine: true,
  theme: baseTheme,
};

StyledTabsHeaderList.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  position: PropTypes.oneOf(["top", "left"]),
  isInSidebar: PropTypes.bool,
};

export { StyledTabsHeaderWrapper, StyledTabsHeaderList };
