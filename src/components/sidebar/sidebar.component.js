import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Modal from "../modal";
import SidebarStyle from "./sidebar.style";
import "./sidebar.scss";
import focusTrap from "../../utils/helpers/focus-trap";
import IconButton from "../icon-button";
import Icon from "../icon";

class Sidebar extends Modal {
  /** Returns classes for the component. */
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
    if (!this.props.enableBackgroundUI) {
      this.removeFocusTrap = focusTrap(this.sideBarRef);
    }
  }

  handleClose() {
    super.handleClose();
    this.removeFocusTrap();
  }

  componentTags(props) {
    return {
      "data-component": "sidebar",
      "data-element": props["data-element"],
      "data-role": props["data-role"],
    };
  }

  /** Returns the computed HTML for the sidebar. */
  get modalHTML() {
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
  }

  get transitionName() {
    return `sidebar--${this.props.position}`;
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
