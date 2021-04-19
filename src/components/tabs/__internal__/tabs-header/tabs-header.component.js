import React from "react";
import PropTypes from "prop-types";
import {
  StyledTabsHeaderWrapper,
  StyledTabsHeaderList,
} from "./tabs-header.style";

const TabsHeader = ({
  align = "left",
  children,
  position = "top",
  role,
  extendedLine,
  alternateStyling,
  noRightBorder = false,
  isInSidebar = false,
}) => {
  return (
    <StyledTabsHeaderWrapper isInSidebar={isInSidebar} position={position}>
      <StyledTabsHeaderList
        align={align}
        position={position}
        role={role}
        extendedLine={extendedLine}
        alternateStyling={alternateStyling}
        noRightBorder={noRightBorder}
        isInSidebar={isInSidebar}
      >
        {children}
      </StyledTabsHeaderList>
    </StyledTabsHeaderWrapper>
  );
};

TabsHeader.propTypes = {
  align: PropTypes.oneOf(["left", "right"]),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["top", "left"]),
  role: PropTypes.string,
  extendedLine: PropTypes.bool,
  alternateStyling: PropTypes.bool,
  noRightBorder: PropTypes.bool,
  isInSidebar: PropTypes.bool,
};

export default TabsHeader;
