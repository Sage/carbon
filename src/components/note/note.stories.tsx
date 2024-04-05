import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
} from "../action-popover";
import LinkPreview from "../link-preview";
import Box from "../box";
import Note from "./note.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Note> = {
  title: "Note",
  component: Note,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Note>;

export const Default: Story = () => {
  const noteContent = EditorState.createWithContent(
    ContentState.createFromText("Here is some plain text content")
  );
  return (
    <div style={{ height: 200, width: "50%" }}>
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
      />
    </div>
  );
};
Default.storyName = "Default";

export const WithRichText: Story = () => {
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
  return (
    <Box height={300} width="50%">
      <Note
        noteContent={noteContent}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
};
WithRichText.storyName = "With Rich Text";

export const WithTitle: Story = () => {
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
  return (
    <Box height={300} width="50%">
      <Note
        title="Here is a Title"
        noteContent={noteContent}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
};
WithTitle.storyName = "With Title";

export const WithInlineControls: Story = () => {
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
    <ActionPopover>
      <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
    </ActionPopover>
  );
  return (
    <Box height={300} width="50%">
      <Note
        title="Here is a Title"
        inlineControl={inlineControl}
        noteContent={noteContent}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
};
WithInlineControls.storyName = "With Inline Controls";

export const WithStatus: Story = () => {
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
    <ActionPopover>
      <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
    </ActionPopover>
  );
  return (
    <Box height={300} width="50%">
      <Note
        title="Here is a Title"
        inlineControl={inlineControl}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
        status={{ text: "Edited", timeStamp: "23 May 2020, 12:08 PM" }}
        noteContent={noteContent}
      />
    </Box>
  );
};
WithStatus.storyName = "With Status";

export const WithPreviews: Story = () => {
  const json = JSON.stringify({
    blocks: [
      {
        key: "47lv5",
        text: "www.bbc.co.uk",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "ab5do",
        text: "www.sage.com",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  });
  const content = convertFromRaw(JSON.parse(json));
  const noteContent = EditorState.createWithContent(content);
  const inlineControl = (
    <ActionPopover>
      <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
    </ActionPopover>
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
    <Box width="50%">
      <Note
        title="Here is a Title"
        inlineControl={inlineControl}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
        status={{ text: "Edited", timeStamp: "23 May 2020, 12:08 PM" }}
        noteContent={noteContent}
        previews={previews}
      />
    </Box>
  );
};
WithPreviews.storyName = "With Previews";

export const WithMargin: Story = () => {
  const noteContent = EditorState.createWithContent(
    ContentState.createFromText("Here is some plain text content")
  );
  return (
    <Box width="50%">
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m={1}
      />
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m={3}
      />
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m={5}
      />
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m="16px"
      />
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m="32px"
      />
    </Box>
  );
};
WithMargin.storyName = "With Margin";
