import React from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";

import Note, { NoteProps } from "./note.component";

import { ActionPopover, ActionPopoverMenuButton } from "../action-popover";

export default {
  title: "Note/Test",
  includeStories: ["DefaultStory", "InlineControlMenuButton"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = ({
  name,
  createdDate,
  ...args
}: Omit<NoteProps, "noteContent">) => {
  const noteContent = EditorState.createWithContent(
    ContentState.createFromText("Here is some plain text content")
  );
  return (
    <Note
      name={name}
      noteContent={noteContent}
      createdDate={createdDate}
      {...args}
    />
  );
};

DefaultStory.story = {
  name: "default",
  args: {
    name: "Lauren Smith",
    createdDate: "23 May 2020, 12:08 PM",
  },
};

export const InlineControlMenuButton = ({
  name,
  createdDate,
  ...args
}: Omit<NoteProps, "noteContent">) => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i> Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
  <ul><li>unordered</li></ul>
  <ol><li>ordered</li></ol></br>
  <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
  <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;
  const blocksFromHTML = convertFromHTML(html);
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const noteContent = EditorState.createWithContent(content);

  const inlineControl = (
    <ActionPopover
      renderButton={(props) => (
        <ActionPopoverMenuButton
          buttonType="tertiary"
          iconType="ellipsis_vertical"
          iconPosition="after"
          size="small"
          {...props}
        >
          Actions
        </ActionPopoverMenuButton>
      )}
    />
  );

  return (
    <div style={{ height: 300, width: "50%" }}>
      <Note
        title="Here is a Title"
        inlineControl={inlineControl}
        noteContent={noteContent}
        name={name}
        createdDate={createdDate}
        {...args}
      />
    </div>
  );
};

InlineControlMenuButton.story = {
  name: "inline control menu button",
  args: {
    name: "Lauren Smith",
    createdDate: "23 May 2020, 12:08 PM",
  },
};

InlineControlMenuButton.parameters = {
  themeProvider: { chromatic: { disableSnapshot: false, theme: "sage" } },
};
