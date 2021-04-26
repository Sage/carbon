import React, { useRef } from "react";
import PropTypes from "prop-types";

import Modal from "../modal";
import SidebarStyle from "./sidebar.style";
import IconButton from "../icon-button";
import Icon from "../icon";
import FocusTrap from "../../__internal__/focus-trap";
import SidebarHeader from "./__internal__/sidebar-header";
import Box from "../box";

const Sidebar = ({
  open,
  disableEscKey,
  enableBackgroundUI,
  header,
  position,
  size,
  children,
  onCancel,
  ...rest
}) => {
  const sideBarRef = useRef();

  const closeIcon = () => {
    if (!onCancel) return null;
    return (
      <IconButton onAction={onCancel} data-element="close">
        <Icon type="close" />
      </IconButton>
    );
  };

  const componentTags = {
    "data-component": "sidebar",
    "data-element": rest["data-element"],
    "data-role": rest["data-role"],
  };

  const sidebar = (
    <SidebarStyle
      ref={sideBarRef}
      position={position}
      size={size}
      data-element="sidebar"
      role="complementary"
    >
      {closeIcon()}
      {header && <SidebarHeader>{header}</SidebarHeader>}
      <Box
        data-element="sidebar-content"
        p={4}
        pt="27px"
        scrollVariant="light"
        overflow="auto"
      >
        {children}
      </Box>
    </SidebarStyle>
  );

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      disableEscKey={disableEscKey}
      enableBackgroundUI={enableBackgroundUI}
      className="carbon-sidebar"
      {...componentTags}
    >
      {enableBackgroundUI ? (
        sidebar
      ) : (
        <FocusTrap wrapperRef={sideBarRef}>{sidebar}</FocusTrap>
      )}
    </Modal>
  );
};

Sidebar.propTypes = {
  /** Modal content */
  children: PropTypes.node,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Determines if the Esc Key closes the modal */
  disableEscKey: PropTypes.bool,
  /** A boolean to track the open state of the dialog */
  open: PropTypes.bool.isRequired,
  /** Set this prop to false to hide the translucent background when the dialog is open. */
  enableBackgroundUI: PropTypes.bool,
  /** Sets the position of sidebar, either left or right. */
  position: PropTypes.string,
  /** Sets the size of the sidebar when open. */
  size: PropTypes.oneOf([
    "extra-small",
    "small",
    "medium-small",
    "medium",
    "medium-large",
    "large",
    "extra-large",
  ]),
  /** Node that will be used as sidebar header. */
  header: PropTypes.node,
};

Sidebar.defaultProps = {
  position: "right",
  size: "medium",
  enableBackgroundUI: false,
};

export default Sidebar;
