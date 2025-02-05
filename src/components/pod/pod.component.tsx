import React, { useState, useMemo } from "react";
import { MarginProps } from "styled-system";
import useLocale from "../../hooks/__internal__/useLocale";

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
import { PodAlignment, PodSize, PodVariant } from "./pod.config";

export interface PodProps extends MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Aligns the title to left, right or center */
  alignTitle?: PodAlignment;
  /** Enables/disables the border around the pod. */
  border?: boolean;
  /** Children elements */
  children?: React.ReactNode;
  /** Determines the padding around the pod */
  size?: PodSize;
  /** Prop to apply a theme to the Pod */
  variant?: PodVariant;
  /** Title for the pod */
  title?: React.ReactNode;
  /** Optional subtitle for the pod */
  subtitle?: React.ReactNode;
  /** A component to render as a Pod footer */
  footer?: string | React.ReactNode;
  /** Supplies an edit action to the pod */
  onEdit?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  /** Supplies a delete action to the pod */
  onDelete?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  /** Supplies an undo action to the pod in soft delete state. */
  onUndo?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  /** Sets softboolean; delete state */
  softDelete?: boolean;
  /** Determines if the editable pod content should be full width */
  editContentFullWidth?: boolean;
  /** Determines if the edit button should be hidden until the user hovers over the content */
  displayEditButtonOnHover?: boolean;
  /** Determines if clicking the pod content calls the onEdit action */
  triggerEditOnContent?: boolean;
  /** Sets Pod height, number is changed to pixels and string is passed as raw css value */
  height?: string | number;
  /** Renders edit button inside the pod if it exists. */
  internalEditButton?: boolean;
}

const Pod = React.forwardRef<HTMLDivElement, PodProps>(
  (
    {
      "data-element": dataElement,
      "data-role": dataRole,
      alignTitle = "left",
      border = true,
      children,
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
    ref,
  ) => {
    const [isEditFocused, setEditFocused] = useState(false);
    const [isEditHovered, setEditHovered] = useState(false);
    const [isDeleteFocused, setDeleteFocused] = useState(false);
    const [isDeleteHovered, setDeleteHovered] = useState(false);
    const [isUndoFocused, setUndoFocused] = useState(false);
    const [isUndoHovered, setUndoHovered] = useState(false);

    const l = useLocale();
    const shouldContentHaveEditEvents = useMemo(
      () => !!(onEdit && (triggerEditOnContent || displayEditButtonOnHover)),
      [displayEditButtonOnHover, onEdit, triggerEditOnContent],
    );
    const hasButtons = useMemo(
      () => !!(onEdit || onDelete || onUndo),
      [onEdit, onDelete, onUndo],
    );

    const processPodAction =
      (
        action: React.EventHandler<
          React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
        >,
      ) =>
      (
        ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
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
      onClick: onEdit && processPodAction(onEdit),
      onKeyDown: onEdit && processPodAction(onEdit),
    };

    return (
      <StyledPod
        alignTitle={alignTitle}
        internalEditButton={internalEditButton}
        height={typeof height === "number" ? `${height}px` : height}
        ref={ref}
        data-component="pod"
        data-element={dataElement}
        data-role={dataRole}
        {...rest}
      >
        <StyledBlock
          data-element="block"
          data-role="pod-block"
          contentTriggersEdit={shouldContentHaveEditEvents}
          hasButtons={hasButtons}
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
                data-role="pod-content-header"
                alignTitle={alignTitle}
                internalEditButton={internalEditButton}
                size={size}
              >
                {typeof title === "string" ? (
                  <StyledTitle data-element="title">{title}</StyledTitle>
                ) : (
                  title
                )}

                {typeof subtitle === "string" ? (
                  <StyledSubtitle data-element="subtitle">
                    {subtitle}
                  </StyledSubtitle>
                ) : (
                  subtitle
                )}
              </StyledHeader>
            )}
            {children}
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
        {hasButtons && (
          <StyledActionsContainer
            data-element="action-button-container"
            data-role="action-button-container"
            internalEditButton={internalEditButton}
          >
            {softDelete && onUndo && (
              <StyledUndoButton
                aria-label={l.pod.undo()}
                onMouseEnter={() => setUndoHovered(true)}
                onMouseLeave={() => setUndoHovered(false)}
                onFocus={() => setUndoFocused(true)}
                onBlur={() => setUndoFocused(false)}
                data-element="undo"
                internalEditButton={internalEditButton}
                isFocused={isUndoFocused}
                isHovered={isUndoHovered}
                noBorder={!border}
                size={size}
                variant={variant}
                onClick={processPodAction(onUndo)}
              >
                <Icon type="undo" />
              </StyledUndoButton>
            )}
            {!softDelete && onEdit && (
              <StyledEditAction
                {...editEvents}
                aria-label={l.actions.edit()}
                data-element="edit"
                displayOnlyOnHover={displayEditButtonOnHover}
                internalEditButton={internalEditButton}
                isFocused={isEditFocused}
                isHovered={isEditHovered}
                noBorder={!border}
                size={size}
                variant={variant}
              >
                <Icon type="edit" />
              </StyledEditAction>
            )}
            {!softDelete && onDelete && (
              <StyledDeleteButton
                aria-label={l.actions.delete()}
                data-element="delete"
                onMouseEnter={() => setDeleteHovered(true)}
                onMouseLeave={() => setDeleteHovered(false)}
                onFocus={() => setDeleteFocused(true)}
                onBlur={() => setDeleteFocused(false)}
                internalEditButton={internalEditButton}
                isFocused={isDeleteFocused}
                isHovered={isDeleteHovered}
                noBorder={!border}
                size={size}
                variant={variant}
                onClick={processPodAction(onDelete)}
              >
                <Icon type="delete" />
              </StyledDeleteButton>
            )}
          </StyledActionsContainer>
        )}
      </StyledPod>
    );
  },
);

Pod.displayName = "Pod";
export default Pod;
