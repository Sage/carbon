import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import Event from "../../utils/helpers/events/events";
import tagComponent from "../../utils/helpers/tags/tags";
import LocaleContext from "../../__internal__/i18n-context";
import PodContext from "./pod-context";
import {
  StyledBlock,
  StyledContent,
  StyledDescription,
  StyledEditAction,
  StyledActionsContainer,
  StyledDeleteButton,
  StyledUndoButton,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
  StyledArrow,
} from "./pod.style.js";
import Icon from "../icon";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

class Pod extends React.Component {
  state = {
    isCollapsed: this.props.collapsed,
    isEditHovered: false,
    isEditFocused: false,
    isDeleteHovered: false,
    isDeleteFocused: false,
    isUndoHovered: false,
    isUndoFocused: false,
  };

  static contextType = PodContext;

  toggleCollapse = () => {
    this.setState((prevState) => ({ isCollapsed: !prevState.isCollapsed }));
  };

  handleEditMouseEnter = () => {
    this.setState({ isEditHovered: true });
  };

  handleEditMouseLeave = () => {
    this.setState({ isEditHovered: false });
  };

  handleEditFocus = () => {
    this.setState({ isEditFocused: true });
  };

  handleEditBlur = () => {
    this.setState({ isEditFocused: false });
  };

  handleDeleteMouseEnter = () => {
    this.setState({ isDeleteHovered: true });
  };

  handleDeleteMouseLeave = () => {
    this.setState({ isDeleteHovered: false });
  };

  handleDeleteFocus = () => {
    this.setState({ isDeleteFocused: true });
  };

  handleDeleteBlur = () => {
    this.setState({ isDeleteFocused: false });
  };

  handleUndoMouseEnter = () => {
    this.setState({ isUndoHovered: true });
  };

  handleUndoMouseLeave = () => {
    this.setState({ isUndoHovered: false });
  };

  handleUndoFocus = () => {
    this.setState({ isUndoFocused: true });
  };

  handleUndoBlur = () => {
    this.setState({ isUndoFocused: false });
  };

  podHeader() {
    const {
      title,
      alignTitle,
      internalEditButton,
      size,
      subtitle,
    } = this.props;

    if (!title) {
      return null;
    }

    const { isCollapsed } = this.state;

    const isCollapsable = isCollapsed !== undefined;

    return (
      <StyledHeader
        alignTitle={alignTitle}
        internalEditButton={internalEditButton}
        size={size}
        isCollapsed={isCollapsed}
        onClick={isCollapsable ? this.toggleCollapse : undefined}
      >
        <StyledTitle data-element="title">{title}</StyledTitle>
        {subtitle && (
          <StyledSubtitle data-element="subtitle">{subtitle}</StyledSubtitle>
        )}
        {isCollapsable && (
          <StyledArrow isCollapsed={isCollapsed} type="dropdown" />
        )}
      </StyledHeader>
    );
  }

  podDescription() {
    const { description } = this.props;

    if (description) {
      return (
        <StyledDescription data-element="description">
          {description}
        </StyledDescription>
      );
    }
    return null;
  }

  podContent() {
    if (this.state.isCollapsed) return null;

    return (
      <>
        {this.podDescription()}
        <div>{this.props.children}</div>
      </>
    );
  }

  footer() {
    const { footer, size, variant, softDelete } = this.props;

    if (!footer) {
      return null;
    }

    return (
      <StyledFooter
        data-element="footer"
        size={size}
        variant={variant}
        softDelete={softDelete}
      >
        {footer}
      </StyledFooter>
    );
  }

  actionButtons() {
    const {
      onDelete,
      onEdit,
      onUndo,
      softDelete,
      internalEditButton,
    } = this.props;

    if (softDelete && onUndo) {
      return (
        <StyledActionsContainer internalEditButton={internalEditButton}>
          {this.undo()}
        </StyledActionsContainer>
      );
    }

    if (!softDelete && (onDelete || onEdit)) {
      return (
        <StyledActionsContainer internalEditButton={internalEditButton}>
          {onEdit && this.edit()}
          {onDelete && this.delete()}
        </StyledActionsContainer>
      );
    }

    return null;
  }

  delete() {
    const {
      onDelete,
      internalEditButton,
      variant,
      size,
      border,
      displayEditButtonOnHover,
    } = this.props;

    const { isDeleteFocused, isDeleteHovered } = this.state;

    return (
      <StyledDeleteButton
        onMouseEnter={this.handleDeleteMouseEnter}
        onMouseLeave={this.handleDeleteMouseLeave}
        onFocus={this.handleDeleteFocus}
        onBlur={this.handleDeleteBlur}
        data-element="delete"
        internalEditButton={internalEditButton}
        displayOnlyOnHover={displayEditButtonOnHover}
        isFocused={isDeleteFocused}
        isHovered={isDeleteHovered}
        noBorder={!border}
        size={size}
        variant={variant}
        onKeyDown={this.processPodAction(onDelete)}
        onAction={this.processPodAction(onDelete)}
      >
        <Icon type="delete" />
      </StyledDeleteButton>
    );
  }

  edit() {
    const {
      internalEditButton,
      variant,
      size,
      border,
      displayEditButtonOnHover,
      triggerEditOnContent,
    } = this.props;

    const { isEditFocused, isEditHovered } = this.state;

    return (
      <LocaleContext.Consumer>
        {(l) => (
          <div {...this.editEvents()} data-element="edit-container">
            <StyledEditAction
              contentTriggersEdit={triggerEditOnContent}
              data-element="edit"
              displayOnlyOnHover={displayEditButtonOnHover}
              icon="edit"
              internalEditButton={internalEditButton}
              isFocused={isEditFocused}
              isHovered={isEditHovered}
              noBorder={!border}
              size={size}
              variant={variant}
              {...this.linkProps()}
            >
              {l.actions.edit()}
            </StyledEditAction>
          </div>
        )}
      </LocaleContext.Consumer>
    );
  }

  undo() {
    const { onUndo, internalEditButton, variant, size, border } = this.props;

    const { isUndoFocused, isUndoHovered } = this.state;

    return (
      <StyledUndoButton
        onMouseEnter={this.handleUndoMouseEnter}
        onMouseLeave={this.handleUndoMouseLeave}
        onFocus={this.handleUndoFocus}
        onBlur={this.handleUndoBlur}
        data-element="undo"
        internalEditButton={internalEditButton}
        isFocused={isUndoFocused}
        isHovered={isUndoHovered}
        noBorder={!border}
        size={size}
        variant={variant}
        onKeyDown={this.processPodAction(onUndo)}
        onAction={this.processPodAction(onUndo)}
      >
        <Icon type="undo" />
      </StyledUndoButton>
    );
  }

  linkProps = () => {
    const { onEdit } = this.props;
    let props = {};

    if (typeof onEdit === "string") {
      props.to = onEdit;
    } else if (typeof onEdit === "object") {
      props = onEdit;
    }

    return props;
  };

  editEvents() {
    const props = {
      onMouseEnter: this.handleEditMouseEnter,
      onMouseLeave: this.handleEditMouseLeave,
      onFocus: this.handleEditFocus,
      onBlur: this.handleEditBlur,
    };

    if (typeof this.props.onEdit === "function") {
      props.onClick = this.processPodAction(this.props.onEdit);
      props.onKeyDown = this.processPodAction(this.props.onEdit);
    }

    return props;
  }

  processPodAction = (action) => (ev) => {
    if (Event.isEnterKey(ev) || !Event.isEventType(ev, "keydown")) {
      ev.preventDefault();
      action(ev);
    }
  };

  shouldContentHaveEditEvents() {
    const {
      triggerEditOnContent,
      displayEditButtonOnHover,
      onEdit,
    } = this.props;
    return (triggerEditOnContent || displayEditButtonOnHover) && onEdit;
  }

  render() {
    const {
      variant,
      border,
      editContentFullWidth,
      internalEditButton,
      onEdit,
      onUndo,
      onDelete,
      softDelete,
      size,
      title,
      height,
      ...rest
    } = this.props;

    const {
      isEditFocused,
      isEditHovered,
      isDeleteFocused,
      isDeleteHovered,
    } = this.state;

    let podHeight;

    if (this.context.heightOfTheLongestPod) {
      podHeight = `${this.context.heightOfTheLongestPod}px`;
    }

    if (height && typeof height === "number") {
      podHeight = `${height}px`;
    } else if (height) {
      podHeight = height;
    }

    return (
      <StyledPod
        {...rest}
        className={this.props.className}
        internalEditButton={internalEditButton}
        {...tagComponent("pod", this.props)}
        height={podHeight}
      >
        <StyledBlock
          contentTriggersEdit={this.shouldContentHaveEditEvents()}
          hasButtons={onEdit || onDelete || onUndo}
          fullWidth={editContentFullWidth}
          internalEditButton={internalEditButton}
          isFocused={isEditFocused || isDeleteFocused}
          isHovered={isEditHovered || isDeleteHovered}
          noBorder={!border}
          variant={variant}
          softDelete={softDelete}
          {...(this.shouldContentHaveEditEvents()
            ? { ...this.editEvents(), tabIndex: "0" }
            : {})}
        >
          <StyledContent data-element="content" size={size}>
            {this.podHeader()}
            {this.podContent()}
          </StyledContent>
          {this.footer()}
        </StyledBlock>
        {this.actionButtons()}
      </StyledPod>
    );
  }
}

Pod.propTypes = {
  ...marginPropTypes,
  /**
   * Enables/disables the border around the pod.
   */
  border: PropTypes.bool,

  /**
   * Children elements
   */
  children: PropTypes.node,

  /**
   * Custom className
   */
  className: PropTypes.string,

  /**
   * Determines the size of the pod.
   */
  size: PropTypes.oneOf([
    "none",
    "extra-small",
    "small",
    "medium",
    "large",
    "extra-large",
  ]),

  /**
   * Prop to apply a theme to the Pod.
   */
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "tile",
    "transparent",
  ]),

  /**
   * The collapsed state of the pod
   *
   * undefined - Pod is not collapsible |
   * true - Pod is closed |
   * false - Pod is open
   */
  collapsed: PropTypes.bool,

  /**
   * Title for the pod h4 element
   * always shown
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Optional subtitle for the pod
   */
  subtitle: PropTypes.string,

  /**
   * Aligns the title to left, right or center
   */
  alignTitle: PropTypes.oneOf(["left", "center", "right"]),

  /**
   * Description for the pod
   * Not shown if collapsed
   */
  description: PropTypes.string,

  /**
   * A component to render as a Pod footer.
   */
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Supplies an edit action to the pod.
   */
  onEdit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Supplies a delete action to the pod.
   */
  onDelete: PropTypes.func,
  /**
   * Supplies an undo action to the pod in soft delete state.
   */
  onUndo: PropTypes.func,

  /**
   * Sets soft delete state.
   */
  softDelete: PropTypes.bool,

  /**
   * Determines if the editable pod content should be full width.
   */
  editContentFullWidth: PropTypes.bool,

  /**
   * Determines if the edit button should be hidden until the user
   * hovers over the content.
   */
  displayEditButtonOnHover: PropTypes.bool,

  /**
   * Determines if clicking the pod content calls the onEdit action
   */
  triggerEditOnContent: PropTypes.bool,

  /**
   * Resets edit button styles to an older version
   */
  internalEditButton: PropTypes.bool,

  /**
   * Sets Pod height, number is changed to pixels and string is passed as raw css value
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Pod.defaultProps = {
  border: true,
  variant: "primary",
  size: "medium",
  alignTitle: "left",
};

export default Pod;
