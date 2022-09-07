import React, { useState, useMemo } from "react";

import { MarginProps } from "styled-system";
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
} from "./pod.style";
import Icon from "../icon";

import Event from "../../__internal__/utils/helpers/events";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import LocaleContext from "../../__internal__/i18n-context";

export interface PodProps extends MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Aligns the title to left, right or center */
  alignTitle?: "left" | "center" | "right";
  /** Enables/disables the border around the pod. */
  border?: boolean;
  /** Children elements */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Determines the padding around the pod */
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";
  /** Prop to apply a theme to the Pod */
  variant?: "primary" | "secondary" | "tertiary" | "tile" | "transparent";
  /** Title for the pod h4 element always shown */
  title?: string | React.ReactNode;
  /** Optional subtitle for the pod */
  subtitle?: string;
  /** A component to render as a Pod footer */
  footer?: string | React.ReactNode;
  /** Supplies an edit action to the pod */
  onEdit?:
    | string
    | Record<string, unknown>
    | ((
        ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
      ) => void);
  /** Supplies a delete action to the pod */
  onDelete?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /** Supplies an undo action to the pod in soft delete state. */
  onUndo?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /** Sets softboolean; delete state */
  softDelete?: boolean;
  /** Determines if the editable pod content should be full width */
  editContentFullWidth?: boolean;
  /** Determines if the edit button should be hidden until the user hovers over the content */
  displayEditButtonOnHover?: boolean;
  /** Determines if clicking the pod content calls the onEdit action */
  triggerEditOnContent?: boolean;
  /** Resets edit button styles to an older version */
  internalEditButton?: boolean;
  /** Sets Pod height, number is changed to pixels and string is passed as raw css value */
  height?: string | number;
}

const Pod = React.forwardRef<HTMLDivElement, PodProps>(
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
    }: PodProps,
    ref
  ) => {
    const [isEditFocused, setEditFocused] = useState(false);
    const [isEditHovered, setEditHovered] = useState(false);
    const [isDeleteFocused, setDeleteFocused] = useState(false);
    const [isDeleteHovered, setDeleteHovered] = useState(false);
    const [isUndoFocused, setUndoFocused] = useState(false);
    const [isUndoHovered, setUndoHovered] = useState(false);

    const shouldContentHaveEditEvents = useMemo(
      () => !!(onEdit && (triggerEditOnContent || displayEditButtonOnHover)),
      [displayEditButtonOnHover, onEdit, triggerEditOnContent]
    );

    const processPodAction = (
      action: React.EventHandler<
        React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
      >
    ) => (
      ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
    ) => {
      if (
        Event.isKeyboardEvent(ev) &&
        Event.isEventType(ev, "keydown") &&
        !Event.isEnterKey(ev)
      )
        return;

      ev.preventDefault();
      action(ev);
    };

    const editEvents = {
      onMouseEnter: () => setEditHovered(true),
      onMouseLeave: () => setEditHovered(false),
      onFocus: () => setEditFocused(true),
      onBlur: () => setEditFocused(false),
      ...(typeof onEdit === "function" && {
        onClick: processPodAction(onEdit),
        onKeyDown: processPodAction(onEdit),
      }),
    };

    const actionButtons = () => {
      if (softDelete && onUndo) {
        return (
          <StyledActionsContainer internalEditButton={internalEditButton}>
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
              onAction={processPodAction(onUndo)}
            >
              <Icon type="undo" />
            </StyledUndoButton>
          </StyledActionsContainer>
        );
      }

      if (!softDelete && (onDelete || onEdit)) {
        return (
          <StyledActionsContainer internalEditButton={internalEditButton}>
            {onEdit && (
              <LocaleContext.Consumer>
                {(l) => (
                  <div {...editEvents} data-element="edit-container">
                    <StyledEditAction
                      data-element="edit"
                      displayOnlyOnHover={displayEditButtonOnHover}
                      icon="edit"
                      internalEditButton={internalEditButton}
                      isFocused={isEditFocused}
                      isHovered={isEditHovered}
                      noBorder={!border}
                      size={size}
                      variant={variant}
                      {...(typeof onEdit === "string"
                        ? { href: onEdit }
                        : onEdit)}
                    >
                      {l.actions.edit()}
                    </StyledEditAction>
                  </div>
                )}
              </LocaleContext.Consumer>
            )}
            {onDelete && (
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
                onAction={processPodAction(onDelete)}
              >
                <Icon type="delete" />
              </StyledDeleteButton>
            )}
          </StyledActionsContainer>
        );
      }

      return null;
    };

    return (
      <StyledPod
        alignTitle={alignTitle}
        className={className}
        internalEditButton={internalEditButton}
        height={typeof height === "number" ? `${height}px` : height}
        ref={ref}
        {...tagComponent("pod", rest)}
        {...rest}
      >
        <StyledBlock
          data-element="block"
          contentTriggersEdit={shouldContentHaveEditEvents}
          hasButtons={!!(onEdit || onDelete || onUndo)}
          fullWidth={editContentFullWidth}
          internalEditButton={internalEditButton}
          isFocused={isEditFocused || isDeleteFocused}
          isHovered={isEditHovered || isDeleteHovered}
          noBorder={!border}
          variant={variant}
          softDelete={softDelete}
          {...(shouldContentHaveEditEvents && {
            ...editEvents,
            tabIndex: 0,
          })}
        >
          <StyledContent data-element="content" size={size}>
            {title && (
              <StyledHeader
                alignTitle={alignTitle}
                internalEditButton={internalEditButton}
                size={size}
              >
                <StyledTitle data-element="title">{title}</StyledTitle>
                {subtitle && (
                  <StyledSubtitle data-element="subtitle">
                    {subtitle}
                  </StyledSubtitle>
                )}
              </StyledHeader>
            )}
            <div>{children}</div>
          </StyledContent>

          {footer && (
            <StyledFooter
              data-element="footer"
              size={size}
              variant={variant}
              softDelete={softDelete}
            >
              {footer}
            </StyledFooter>
          )}
        </StyledBlock>
        {actionButtons()}
      </StyledPod>
    );
  }
);

Pod.displayName = "Pod";
export default Pod;
