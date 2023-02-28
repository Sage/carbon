import React from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import Note, { NoteProps } from "./note.component";
import { ActionPopover, ActionPopoverItem } from "../action-popover";

export default {
  title: "Note/Test",
  includeStories: "DefaultStory",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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

export const NoteComponent = ({
  text,
  ...props
}: Omit<NoteProps, "noteContent" | "createdDate"> & { text?: string }) => {
  const initialValue = text
    ? EditorState.createWithContent(ContentState.createFromText(text))
    : EditorState.createEmpty();

  return (
    <Note
      title="Here is a Title"
      name="Lauren Smith"
      noteContent={initialValue}
      createdDate="23 May 2020, 12:08 PM"
      {...props}
    />
  );
};

export const NoteComponentWithInlineControl = () => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet. Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
        <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
        <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;
  const blocksFromHTML = convertFromHTML(html);
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const noteContentVal = EditorState.createWithContent(content);
  const inlineControl = (
    <ActionPopover>
      <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
    </ActionPopover>
  );
  return (
    <Note
      title="Here is a Title"
      inlineControl={inlineControl}
      noteContent={noteContentVal}
      name="Lauren Smith"
      createdDate="23 May 2020, 12:08 PM"
    />
  );
};
