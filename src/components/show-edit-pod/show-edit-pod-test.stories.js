/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import ShowEditPod from "./show-edit-pod.component";
import Content from "../content";

import specialCharacters from "../../../.storybook/utils/argTypes/specialCharacters";
import Textbox from "../textbox";
import Fieldset from "../fieldset";
import {
  SHOW_EDIT_POD_ALIGNMENTS,
  SHOW_EDIT_POD_THEMES,
} from "./show-edit-pod.config";

export default {
  component: ShowEditPod,
  title: "ShowEditPod/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    buttonAlign: {
      options: SHOW_EDIT_POD_ALIGNMENTS,
      control: {
        type: "select",
      },
    },
    variant: {
      options: SHOW_EDIT_POD_THEMES,
      control: {
        type: "select",
      },
    },
    cancelTextSpecialCharacters: specialCharacters,
    deleteTextSpecialCharacters: specialCharacters,
    saveTextSpecialCharacters: specialCharacters,
    titleSpecialCharacters: specialCharacters,
  },
  args: {
    border: false,
    buttonAlign: "right",
    cancel: true,
    cancelText: "Cancel",
    cancelTextSpecialCharacters: undefined,
    deleteText: "Delete",
    deleteTextSpecialCharacters: undefined,
    saveText: "Save",
    saveTextSpecialCharacters: undefined,
    saving: false,
    title: "Person",
    titleSpecialCharacters: undefined,
    transitionName: "carbon-show-edit-pod__transition",
    variant: "transparent",
  },
};

const ShowEditPodStory = ({
  cancelTextSpecialCharacters,
  cancelText,
  deleteTextSpecialCharacters,
  deleteText,
  saveTextSpecialCharacters,
  saveText,
  titleSpecialCharacters,
  title,
  ...args
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState({
    edit_first_name: "Alan",
    edit_second_name: "Smith",
    edit_telephone: "000 000 0000",
  });
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
  return (
    <ShowEditPod
      {...args}
      editing={isEditing}
      onDelete={onDelete}
      onCancel={onCancel}
      onEdit={onEdit}
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
      cancelText={cancelTextSpecialCharacters || cancelText}
      deleteText={deleteTextSpecialCharacters || deleteText}
      saveText={saveTextSpecialCharacters || saveText}
      title={titleSpecialCharacters || title}
    >
      {fieldProps.map(({ key, label }) => (
        <Content key={key} title={label}>
          {state[key]}
        </Content>
      ))}
    </ShowEditPod>
  );
};

export const Default = ShowEditPodStory.bind({});
