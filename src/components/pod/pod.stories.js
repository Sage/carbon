import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Pod from "./pod.component";
import { POD_ALIGNMENTS, POD_SIZES, POD_THEMES } from "./pod.config";

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
  const size = select("size", POD_SIZES, Pod.defaultProps.size);
  const title = text("title", "");
  const subtitle = text("subtitle", "");
  const alignTitle = title
    ? select("alignTitle", POD_ALIGNMENTS, Pod.defaultProps.alignTitle)
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
  const variant = select("variant", POD_THEMES, Pod.defaultProps.variant);

  return (
    <Pod
      border={border}
      size={size}
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

Default.story = {
  name: "default",
};
