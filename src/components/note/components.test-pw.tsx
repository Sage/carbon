import React from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import Note, { NoteProps } from "./note.component";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import LinkPreview from "../link-preview";

const NoteComponent = ({
  text,
  createdDate = "23 May 2020, 12:08 PM",
  ...props
}: Omit<NoteProps, "noteContent" | "createdDate"> & {
  text?: string;
  createdDate?: string;
}) => {
  const initialValue = text
    ? EditorState.createWithContent(ContentState.createFromText(text))
    : EditorState.createEmpty();

  return (
    <Note
      title="Here is a Title"
      name="Lauren Smith"
      noteContent={initialValue}
      createdDate={createdDate}
      {...props}
    />
  );
};

const NoteComponentWithInlineControl = () => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet. Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
        <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
        <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;
  const blocksFromHTML = convertFromHTML(html);
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
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

const NoteComponentWithPreviews = () => {
  const noteContent = EditorState.createWithContent(
    ContentState.createFromText("Here is some plain text content"),
  );
  const previews = [
    <LinkPreview
      key="link1"
      title="This is an example of a title"
      url="https://www.bbc.co.uk"
      description="Captain, why are we out here chasing comets? I'd like to think that I haven't changed those things, sir. Computer, lights up! Not if I weaken first. Damage report! Yesterday I did not know how to eat gagh. The Federation's gone; the Borg is everywhere! We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Our neural pathways have become accustomed to your sensory input patterns. Wouldn't that bring about chaos?"
    />,
    <LinkPreview
      key="link2"
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets? I'd like to think that I haven't changed those things, sir. Computer, lights up! Not if I weaken first. Damage report! Yesterday I did not know how to eat gagh. The Federation's gone; the Borg is everywhere! We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Our neural pathways have become accustomed to your sensory input patterns. Wouldn't that bring about chaos?"
    />,
  ];
  return (
    <div style={{ width: "50%" }}>
      <Note
        title="Here is a Title"
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
        status={{ text: "Edited", timeStamp: "23 May 2020, 12:08 PM" }}
        noteContent={noteContent}
        previews={previews}
      />
    </div>
  );
};

export {
  NoteComponent,
  NoteComponentWithInlineControl,
  NoteComponentWithPreviews,
};
