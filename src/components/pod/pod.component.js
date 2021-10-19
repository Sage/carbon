import React, { useState, useCallback, forwardRef } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import Event from "../../__internal__/utils/helpers/events";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import LocaleContext from "../../__internal__/i18n-context";
import {
  StyledBlock,
  StyledContent,
  StyledEditAction,
  StyledActionsContainer,
  StyledDeleteButton,
  StyledUndoButton,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
} from "./pod.style.js";
import Icon from "../icon";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Pod = forwardRef(
  (
    {
      alignTitle = "left",
      border = true,
      children,
      className,
      displayEditButtonOnHover,
      editContentFullWidth,
      footer,
      height,
      internalEditButton,
      onDelete,
      onEdit,
      onUndo,
      size = "medium",
      softDelete,
      subtitle,
      title,
      triggerEditOnContent,
      variant = "primary",
      ...rest
    },
    ref
  ) => {
    const [isEditFocused, setEditFocused] = useState(false);
    const [isEditHovered, setEditHovered] = useState(false);
    const [isDeleteFocused, setDeleteFocused] = useState(false);
    const [isDeleteHovered, setDeleteHovered] = useState(false);
    const [isUndoFocused, setUndoFocused] = useState(false);
    const [isUndoHovered, setUndoHovered] = useState(false);

    let podHeight;

    if (height && typeof height === "number") {
      podHeight = `${height}px`;
    } else if (height) {
      podHeight = height;
    }

    const shouldContentHaveEditEvents = useCallback(() => {
      return (triggerEditOnContent || displayEditButtonOnHover) && onEdit;
    }, [displayEditButtonOnHover, onEdit, triggerEditOnContent]);

    const processPodAction = (action) => (ev) => {
      if (Event.isEnterKey(ev) || !Event.isEventType(ev, "keydown")) {
        ev.preventDefault();
        action(ev);
      }
    };

    function editEvents() {
      const editProps = {
        onMouseEnter: () => setEditHovered(true),
        onMouseLeave: () => setEditHovered(false),
        onFocus: () => setEditFocused(true),
        onBlur: () => setEditFocused(false),
      };

      if (typeof onEdit === "function") {
        editProps.onClick = processPodAction(onEdit);
        editProps.onKeyDown = processPodAction(onEdit);
      }

      return editProps;
    }

    function podHeader() {
      if (!title) {
        return null;
      }

      return (
        <StyledHeader
          alignTitle={alignTitle}
          internalEditButton={internalEditButton}
          size={size}
        >
          <StyledTitle data-element="title">{title}</StyledTitle>
          {subtitle && (
            <StyledSubtitle data-element="subtitle">{subtitle}</StyledSubtitle>
          )}
        </StyledHeader>
      );
    }

    function renderFooter() {
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

    function actionButtons() {
      if (softDelete && onUndo) {
        return (
          <StyledActionsContainer internalEditButton={internalEditButton}>
            {undo()}
          </StyledActionsContainer>
        );
      }

      if (!softDelete && (onDelete || onEdit)) {
        return (
          <StyledActionsContainer internalEditButton={internalEditButton}>
            {onEdit && edit()}
            {onDelete && renderDelete()}
          </StyledActionsContainer>
        );
      }

      return null;
    }

    function renderDelete() {
      return (
        <StyledDeleteButton
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          onFocus={() => setDeleteFocused(true)}
          onBlur={() => setDeleteFocused(false)}
          data-element="delete"
          internalEditButton={internalEditButton}
          displayOnlyOnHover={displayEditButtonOnHover}
          isFocused={isDeleteFocused}
          isHovered={isDeleteHovered}
          noBorder={!border}
          size={size}
          variant={variant}
          onKeyDown={processPodAction(onDelete)}
          onAction={processPodAction(onDelete)}
        >
          <Icon type="delete" />
        </StyledDeleteButton>
      );
    }

    function edit() {
      return (
        <LocaleContext.Consumer>
          {(l) => (
            <div {...editEvents()} data-element="edit-container">
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
                {...linkProps()}
              >
                {l.actions.edit()}
              </StyledEditAction>
            </div>
          )}
        </LocaleContext.Consumer>
      );
    }

    function undo() {
      return (
        <StyledUndoButton
          onMouseEnter={() => setUndoHovered(true)}
          onMouseLeave={() => setUndoHovered(false)}
          onFocus={() => setUndoFocused(true)}
          onBlur={() => setUndoFocused(false)}
          data-element="undo-container"
          internalEditButton={internalEditButton}
          isFocused={isUndoFocused}
          isHovered={isUndoHovered}
          noBorder={!border}
          size={size}
          variant={variant}
          onKeyDown={processPodAction(onUndo)}
          onAction={processPodAction(onUndo)}
        >
          <Icon type="undo" />
        </StyledUndoButton>
      );
    }

    function linkProps() {
      if (typeof onEdit === "string") {
        return { to: onEdit };
      }

      return onEdit;
    }

    return (
      <StyledPod
        {...rest}
        className={className}
        internalEditButton={internalEditButton}
        {...tagComponent("pod", rest)}
        height={podHeight}
        ref={ref}
      >
        <StyledBlock
          contentTriggersEdit={shouldContentHaveEditEvents()}
          hasButtons={onEdit || onDelete || onUndo}
          fullWidth={editContentFullWidth}
          internalEditButton={internalEditButton}
          isFocused={isEditFocused || isDeleteFocused}
          isHovered={isEditHovered || isDeleteHovered}
          noBorder={!border}
          variant={variant}
          softDelete={softDelete}
          {...(shouldContentHaveEditEvents()
            ? { ...editEvents(), tabIndex: "0" }
            : {})}
        >
          <StyledContent data-element="content" size={size}>
            {podHeader()}
            <div>{children}</div>
          </StyledContent>
          {renderFooter()}
        </StyledBlock>
        {actionButtons()}
      </StyledPod>
    );
  }
);

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

export default Pod;
