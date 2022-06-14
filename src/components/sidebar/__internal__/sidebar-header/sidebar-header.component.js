import React from "react";
import PropTypes from "prop-types";
import tagComponent from "../../../../__internal__/utils/helpers/tags/tags";
import SidebarHeaderStyle from "./sidebar-header.style";

const SidebarHeader = ({ className, children, id, ...props }) => (
  <SidebarHeaderStyle
    className={className}
    id={id}
    {...tagComponent("sidebar-header", props)}
  >
    {children}
  </SidebarHeaderStyle>
);

SidebarHeader.propTypes = {
  /** This component supports children. */
  children: PropTypes.node,
  /** A custom class name. */
  className: PropTypes.string,
  /** A custom id. */
  id: PropTypes.string,
};

export default SidebarHeader;
