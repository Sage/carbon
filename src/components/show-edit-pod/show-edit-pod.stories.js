import React, { useState } from "react";
import { text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import OptionsHelper from "../../utils/helpers/options-helper";
import ShowEditPod, { BaseShowEditPod } from "./show-edit-pod.component";
import Content from "../content";

import Textbox from "../../__experimental__/components/textbox";
import Fieldset from "../../__experimental__/components/fieldset";

export default {
  title: "ShowEditPod/Test",
  component: ShowEditPod,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

const fieldProps = [
  {
    key: "edit_first_name",
    label: "First Name",
  },
  {
    key: "edit_second_name",
    label: "Second Name",
  },
  {
    key: "edit_telephone",
    label: "Telephone",
  },
];

export const Default = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState({
    edit_first_name: "Alan",
    edit_second_name: "Smith",
    edit_telephone: "000 000 0000",
  });

  const onEdit = () => {
    setIsEditing(true);
    action("edit")();
  };

  const onCancel = () => {
    setIsEditing(false);
    action("cancel")();
  };

  const onDelete = () => {
    setIsEditing(false);
    action("delete")();
  };

  const onSave = () => {
    setIsEditing(false);
    action("onSave")();
  };

  const setField = (fieldName) => (e) => {
    setState({ ...state, [fieldName]: e.target.value });
  };

  const border = boolean("border", BaseShowEditPod.defaultProps.border);
  const buttonAlign = select(
    "buttonAlign",
    OptionsHelper.alignBinary,
    BaseShowEditPod.defaultProps.buttonAlign
  );
  const cancel = boolean("cancel", BaseShowEditPod.defaultProps.cancel);
  const cancelText = cancel ? text("cancelText", "Cancel") : undefined;
  const deleteText = text("deleteText", "Delete");
  const saveText = text("saveText", "Save");
  const saving = boolean("saving", BaseShowEditPod.defaultProps.saving);
  const title = text("title", "Person");
  const transitionName = text(
    "transitionName",
    BaseShowEditPod.defaultProps.transitionName
  );
  const variant = select(
    "variant",
    OptionsHelper.themesFull,
    BaseShowEditPod.defaultProps.variant
  );

  return (
    <ShowEditPod
      border={border}
      buttonAlign={buttonAlign}
      cancel={cancel}
      editing={isEditing}
      cancelText={cancelText}
      deleteText={deleteText}
      onDelete={onDelete}
      onCancel={onCancel}
      onEdit={onEdit}
      saveText={saveText}
      saving={saving}
      title={title}
      transitionName={transitionName}
      editFields={
        <Fieldset>
          {fieldProps.map(({ key, label }) => (
            <Textbox
              label={label}
              key={key}
              onChange={setField(key)}
              value={state[key]}
              labelInline
              labelAlign="right"
            />
          ))}
        </Fieldset>
      }
      onSave={onSave}
      variant={variant}
    >
      {fieldProps.map(({ key, label }) => (
        <Content key={key} title={label}>
          {state[key]}
        </Content>
      ))}
    </ShowEditPod>
  );
};
