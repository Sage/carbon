import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Modal from "../modal";
import SidebarStyle from "./sidebar.style";
import IconButton from "../icon-button";
import Icon from "../icon";
import Browser from "../../utils/helpers/browser";
import FocusTrap from "../../__internal__/focus-trap";

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
    return (
      <SidebarStyle
        ref={(element) => {
          this.sideBarRef = element;
        }}
        position={this.props.position}
        size={this.props.size}
        data-element="sidebar"
      >
        {this.closeIcon()}
        {this.props.children}
      </SidebarStyle>
    );
  };

  /** Returns the computed HTML for the sidebar. */
  get modalHTML() {
    if (this.props.enableBackgroundUI) {
      return this.renderSidebar();
    }
    return <FocusTrap>{this.renderSidebar()}</FocusTrap>;
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
};

Sidebar.defaultProps = {
  position: "right",
  size: "medium",
  open: false,
  enableBackgroundUI: false,
};

export default Sidebar;
