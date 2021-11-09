import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import Form from "../form";
import Button from "../button";
import StyledDeleteButton from "./delete-button.style";
import Events from "../../__internal__/utils/helpers/events";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import LocaleContext from "../../__internal__/i18n-context";
import StyledPod from "./show-edit-pod.style";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const ShowEditPod = ({
  border = false,
  className,
  children,
  saving = false,
  editFields,
  editing,
  onEdit,
  onSave,
  onCancel,
  onUndo,
  cancel = true,
  cancelText,
  saveText,
  onDelete,
  deleteText,
  softDelete,
  buttonAlign = "right",
  transitionName = "carbon-show-edit-pod__transition",
  title,
  hideDeleteButtonInViewMode = false,
  variant = "transparent",
  ...rest
}) => {
  const locale = useContext(LocaleContext);

  const ref = useRef();

  const [isEditing, setIsEditingState] = useState(false);

  const isControlled = editing !== undefined;

  const focusPod = () => {
    ref.current.focus();
  };

  useEffect(() => {
    if (editing) {
      focusPod();
    }
  }, [editing]);

  const isInEditMode = isControlled ? editing : isEditing;

  const toggleEditingState = (newState) => {
    if (!isControlled) {
      setIsEditingState(newState);
    }
  };

  const handleEdit = (ev) => {
    onEdit(ev);
    toggleEditingState(true);
    focusPod();
  };

  const onSaveEditForm = (ev) => {
    ev.preventDefault();
    onSave(ev);
    toggleEditingState(false);
  };

  const onCancelEditForm = (ev) => {
    if (onCancel) {
      onCancel(ev);
    }

    toggleEditingState(false);
  };

  const onKeyDown = (ev) => {
    if (Events.isEscKey(ev)) {
      onCancelEditForm(ev);
    }
  };

  const deleteButton = () => {
    const label = deleteText || locale.actions.delete();

    return (
      <StyledDeleteButton
        buttonType="tertiary"
        data-element="delete-button"
        size="small"
        onClick={onDelete}
      >
        {label}
      </StyledDeleteButton>
    );
  };

  const editContent = () => (
    <Form
      onSubmit={onSaveEditForm}
      buttonAlignment={buttonAlign}
      data-element="edit-form"
      leftSideButtons={
        cancel && (
          <Button
            data-element="cancel-button"
            onClick={onCancelEditForm}
            size="small"
          >
            {cancelText}
          </Button>
        )
      }
      saveButton={
        <Button
          disabled={saving}
          data-element="submit-button"
          buttonType="primary"
          type="submit"
          size="small"
        >
          {saveText}
        </Button>
      }
      rightSideButtons={onDelete ? deleteButton() : null}
      saving={saving}
    >
      {editFields}
    </Form>
  );

  const content = () => {
    if (isInEditMode) {
      return (
        <CSSTransition
          key="1"
          classNames={transitionName}
          timeout={{ enter: 300, exit: 50 }}
        >
          <div key="edit">{editContent()}</div>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition
        key="2"
        classNames={transitionName}
        timeout={{ enter: 300, exit: 50 }}
      >
        <div key="show">{children}</div>
      </CSSTransition>
    );
  };

  const universalProps = () => ({
    size: "small",
    tabIndex: "-1",
    title,
    ref,
    className,
    border,
    onUndo,
    softDelete,
    variant,
    ...rest,
    ...tagComponent("show-edit-pod", rest),
  });

  const contentProps = () => ({
    ...universalProps(),
    ...(!hideDeleteButtonInViewMode && { onDelete }),
    ...(onEdit && { onEdit: handleEdit }),
  });

  const editingProps = () => ({ ...universalProps(), onKeyDown });

  const podProps = () => (isInEditMode ? editingProps() : contentProps());

  return (
    <StyledPod {...podProps()}>
      <TransitionGroup>{content()}</TransitionGroup>
    </StyledPod>
  );
};

ShowEditPod.propTypes = {
  ...marginPropTypes,
  /** Pod theme variant. */
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "tile",
    "transparent",
  ]),
  /** Enable/disable the border on the Pod. */
  border: PropTypes.bool,
  /** This component supports children. */
  children: PropTypes.node,
  /** Classes to apply to the component. */
  className: PropTypes.string,
  /** Allows developers to control the editing state manually. */
  editing: PropTypes.bool,
  /** Callback when edit button is clicked. */
  onEdit: PropTypes.func,
  /** A callback triggered when the delete action is clicked. */
  onDelete: PropTypes.func,
  /** A callback triggered when the undo action is clicked. */
  onUndo: PropTypes.func,
  /** Sets soft delete state. */
  softDelete: PropTypes.bool,
  /** Hide delete button in view mode. */
  hideDeleteButtonInViewMode: PropTypes.bool,
  /** Define fields to be rendered in the edit state */
  editFields: PropTypes.node,
  /** Define a custom transition between show and edit states */
  transitionName: PropTypes.string,
  // Props passed to Form
  /** A callback triggered after clicking the save button */
  onSave: PropTypes.func,
  /** Controls which direction the form buttons align */
  buttonAlign: PropTypes.oneOf(["left", "right"]),
  /** Set to false to hide the cancel button */
  cancel: PropTypes.bool,
  /** Supply custom text for the cancel button */
  cancelText: PropTypes.string,
  /** A callback triggered when the form is cancelled */
  onCancel: PropTypes.func,
  /** Supply custom text for the save button */
  saveText: PropTypes.string,
  /** Supply custom text for the delete button */
  deleteText: PropTypes.string,
  /** Can inform if the form is in a saving state (disables the save button) */
  saving: PropTypes.bool,
  /** Title to be displayed */
  title: PropTypes.node,
};

export default ShowEditPod;

export { ShowEditPod as BaseShowEditPod };
