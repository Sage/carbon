import React from "react";
import { EditorState, ContentState } from "draft-js";
import Note, { NoteProps } from "./note.component";

export default {
  title: "Note/Test",
  includeStories: ["DefaultStory"],
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
