import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Modal from "../modal";
import SidebarStyle from "./sidebar.style";
import IconButton from "../icon-button";
import Icon from "../icon";
import Browser from "../../utils/helpers/browser";
import FocusTrap from "../../__internal__/focus-trap";
import SidebarHeader from "./__internal__/sidebar-header";
import Box from "../box";

class Sidebar extends Modal {
  /** Returns classes for the component. */
  constructor(args) {
    super(args);
    this.document = Browser.getDocument();
  }

  get mainClasses() {
    return classNames("carbon-sidebar", this.props.className);
  }

  closeIcon() {
    const { onCancel } = this.props;
    if (!onCancel) return null;
    return (
      <IconButton onAction={onCancel} data-element="close">
        <Icon type="close" />
      </IconButton>
    );
  }

  handleOpen() {
    super.handleOpen();
    this.document.documentElement.style.overflow = "hidden";
  }

  handleClose() {
    super.handleClose();
    this.document.documentElement.style.overflow = "";
  }

  componentTags(props) {
    return {
      "data-component": "sidebar",
      "data-element": props["data-element"],
      "data-role": props["data-role"],
    };
  }

  renderSidebar = () => {
    const { header, position, size, children } = this.props;
    return (
      <SidebarStyle
        ref={(element) => {
          this.sideBarRef = element;
        }}
        position={position}
        size={size}
        data-element="sidebar"
      >
        {this.closeIcon()}
        {header && <SidebarHeader>{header}</SidebarHeader>}
        {/* Box for sidebar content */}
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
  };

  /** Returns the computed HTML for the sidebar. */
  get modalHTML() {
    if (this.props.enableBackgroundUI) {
      return this.renderSidebar();
    }
    return (
      <FocusTrap wrapperRef={this.sideBarRef}>{this.renderSidebar()}</FocusTrap>
    );
  }
}

Sidebar.propTypes = {
  onCancel: PropTypes.func,
  /** A boolean to track the open state of the dialog */
  open: PropTypes.bool,
  /** Set this prop to false to hide the translucent background when the dialog is open. */
  enableBackgroundUI: PropTypes.bool,
  /** Sets the position of sidebar, either left or right. */
  position: PropTypes.string,
  /** Sets the size of the sidebar when open. */
  size: PropTypes.string,
  /** Node that will be used as sidebar header. */
  header: PropTypes.node,
};

Sidebar.defaultProps = {
  position: "right",
  size: "medium",
  open: false,
  enableBackgroundUI: false,
};

export default Sidebar;
