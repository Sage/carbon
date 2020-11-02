import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Pod from "./pod.component";
import OptionsHelper from "../../utils/helpers/options-helper";

export default {
  title: "Pod/Test",
  component: Pod,
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

export const Default = () => {
  const border = boolean("border", Pod.defaultProps.border);
  const children = text("children", "This is some example content for a Pod");
  const padding = select(
    "padding",
    OptionsHelper.sizesPod,
    Pod.defaultProps.padding
  );
  const title = text("title", "");
  const subtitle = text("subtitle", "");
  const alignTitle = title
    ? select("alignTitle", OptionsHelper.alignFull, Pod.defaultProps.alignTitle)
    : undefined;
  const description = text("description", "");
  const footer = text("footer", "");
  const onEdit = boolean("onEdit", false);
  const editContentFullWidth = onEdit
    ? boolean("editContentFullWidth", false)
    : undefined;
  const displayEditButtonOnHover = onEdit
    ? boolean("displayEditButtonOnHover", false)
    : undefined;
  const triggerEditOnContent = onEdit
    ? boolean("triggerEditOnContent", false)
    : undefined;
  const internalEditButton = onEdit
    ? boolean("internalEditButton", false)
    : undefined;
  const variant = select(
    "variant",
    OptionsHelper.themesFull,
    Pod.defaultProps.variant
  );

  return (
    <Pod
      border={border}
      padding={padding}
      title={title}
      subtitle={subtitle}
      alignTitle={alignTitle}
      description={description}
      footer={footer}
      onEdit={onEdit ? action("edit") : undefined}
      editContentFullWidth={editContentFullWidth}
      displayEditButtonOnHover={displayEditButtonOnHover}
      triggerEditOnContent={triggerEditOnContent}
      internalEditButton={internalEditButton}
      variant={variant}
    >
      {children}
    </Pod>
  );
};
