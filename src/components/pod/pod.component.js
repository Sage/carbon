import React from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import Event from "../../utils/helpers/events/events";
import tagComponent from "../../utils/helpers/tags/tags";
import PodContext from "./pod-context";
import {
  StyledBlock,
  StyledContent,
  StyledDescription,
  StyledEditAction,
  StyledEditContainer,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
  StyledArrow,
} from "./pod.style.js";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

class Pod extends React.Component {
  state = {
    isCollapsed: this.props.collapsed,
    isHovered: false,
    isFocused: false,
  };

  static contextType = PodContext;

  toggleCollapse = () => {
    this.setState((prevState) => ({ isCollapsed: !prevState.isCollapsed }));
  };

  toggleHoverState = (val) => {
    this.setState({ isHovered: val });
  };

  toggleFocusState = (val) => {
    this.setState({ isFocused: val });
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
    const { footer, size, variant } = this.props;

    if (!footer) {
      return null;
    }

    return (
      <StyledFooter data-element="footer" size={size} variant={variant}>
        {footer}
      </StyledFooter>
    );
  }

  edit() {
    const {
      onEdit,
      internalEditButton,
      variant,
      size,
      border,
      displayEditButtonOnHover,
      triggerEditOnContent,
    } = this.props;

    const { isFocused, isHovered } = this.state;

    if (!onEdit) {
      return null;
    }

    return (
      <StyledEditContainer
        {...this.editEvents()}
        internalEditButton={internalEditButton}
      >
        <StyledEditAction
          contentTriggersEdit={triggerEditOnContent}
          data-element="edit"
          displayOnlyOnHover={displayEditButtonOnHover}
          icon="edit"
          internalEditButton={internalEditButton}
          isFocused={isFocused}
          isHovered={isHovered}
          noBorder={!border}
          size={size}
          variant={variant}
          {...this.linkProps()}
        >
          {I18n.t("actions.edit", { defaultValue: "Edit" })}
        </StyledEditAction>
      </StyledEditContainer>
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
      onMouseEnter: this.toggleHoverState.bind(this, true),
      onMouseLeave: this.toggleHoverState.bind(this, false),
      onFocus: this.toggleFocusState.bind(this, true),
      onBlur: this.toggleFocusState.bind(this, false),
    };

    if (typeof this.props.onEdit === "function") {
      props.onClick = this.processPodEditEvent;
      props.onKeyDown = this.processPodEditEvent;
    }

    return props;
  }

  processPodEditEvent = (ev) => {
    if (Event.isEnterKey(ev) || !Event.isEventType(ev, "keydown")) {
      ev.preventDefault();
      this.setState(() => ({
        isHovered: false,
        isFocused: false,
      }));
      this.props.onEdit(ev);
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
      size,
      title,
      height,
      ...rest
    } = this.props;

    const { isFocused, isHovered } = this.state;

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
          editable={onEdit}
          fullWidth={editContentFullWidth}
          internalEditButton={internalEditButton}
          isFocused={isFocused}
          isHovered={isHovered}
          noBorder={!border}
          variant={variant}
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
        {this.edit()}
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
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

Pod.defaultProps = {
  border: true,
  variant: "primary",
  size: "medium",
  alignTitle: "left",
};

export default Pod;
