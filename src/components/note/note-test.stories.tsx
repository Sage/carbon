import React from "react";

import Note, { NoteProps } from "./note.component";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenuButton,
} from "../action-popover";
import Box from "../box";
import LinkPreview from "../link-preview";
import Typography from "../typography";

export default {
  title: "Note/Test",
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
  const noteContent = "Here is some plain text content";
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
  const noteContent = html;

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
    <Box height={300} width="50%">
      <Note
        title="Here is a Title"
        inlineControl={inlineControl}
        noteContent={noteContent}
        name={name}
        createdDate={createdDate}
        {...args}
      />
    </Box>
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

export const TitleNodes = () => {
  const noteContent = "Here is some plain text content";

  const titleElements = (
    <Box display="flex" flexWrap="wrap" gap="16px">
      <Box flex="1 1 50%" display="flex" flexDirection="row" gap="8px">
        <Typography variant="h1-large">Title</Typography>
        <Typography variant="h1">Title</Typography>
        <Typography variant="h2">Title</Typography>
        <Typography variant="h3">Title</Typography>
        <Typography variant="h4">Title</Typography>
        <Typography variant="h5">Title</Typography>
        <Typography variant="segment-header">Title</Typography>
        <Typography variant="segment-header-small">Title</Typography>
        <Typography variant="segment-subheader">Title</Typography>
        <Typography variant="segment-subheader-alt">Title</Typography>
      </Box>
      <Box flex="1 1 50%" display="flex" flexDirection="row" gap="8px">
        <Typography variant="p">Title</Typography>
        <Typography variant="span">Title</Typography>
        <Typography variant="small">Title</Typography>
        <Typography variant="big">Title</Typography>
        <Typography variant="sup">Title</Typography>
        <Typography variant="sub">Title</Typography>
        <Typography variant="strong">Title</Typography>
        <Typography variant="b">Title</Typography>
        <Typography variant="em">Title</Typography>
      </Box>
      <Box flex="1 1 50%" display="flex" flexDirection="row" gap="40px">
        <Typography variant="ul">
          <li>List item 1</li>
          <li>List item 2</li>
        </Typography>
        <Typography variant="ol">
          <li>List item 1</li>
          <li>List item 2</li>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Note
      name="Lauren Smith"
      noteContent={noteContent}
      createdDate="23 May 2020, 12:08 PM"
      title={titleElements}
    />
  );
};

TitleNodes.story = {
  name: "Title Nodes",
};

TitleNodes.parameters = { chromatic: { disableSnapshot: false } };

export const AllVariants = () => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i> Aenean commodo ligula eget dolor.</p>`;
  const noteContent = "Here is some plain text content";
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
      description="Example description for link preview."
    />,
    <LinkPreview
      key="link2"
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Example description for link preview."
    />,
  ];

  return (
    <Box display="flex" flexDirection="column" gap="16px" width="50%">
      <Note
        title="With Status"
        inlineControl={inlineControl}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
        status={{ text: "Edited", timeStamp: "23 May 2020, 12:08 PM" }}
        noteContent={html}
      />
      <Note
        title="With Previews"
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
        status={{ text: "Edited", timeStamp: "23 May 2020, 12:08 PM" }}
        noteContent={noteContent}
        previews={previews}
      />
      <Note
        name="Lauren Smith"
        noteContent="With Margin — m={1}"
        createdDate="23 May 2020, 12:08 PM"
        m={1}
      />
      <Note
        name="Lauren Smith"
        noteContent="With Margin — m={3}"
        createdDate="23 May 2020, 12:08 PM"
        m={3}
      />
      <Note
        name="Lauren Smith"
        noteContent="Hello, World! www.bbc.co.uk http://www.google.com https://www.sage.com"
        createdDate="23 May 2020, 12:08 PM"
      />
      <div data-role="target-hover">
        <Note
          name="Lauren Smith"
          noteContent='Here is a link to <a href="https://carbon.sage.com">Carbon Design System</a>'
          createdDate="23 May 2020, 12:08 PM"
        />
      </div>
      <div data-role="target-focus">
        <Note
          name="Lauren Smith"
          noteContent='Here is a link to <a href="https://carbon.sage.com">Carbon Design System</a>'
          createdDate="23 May 2020, 12:08 PM"
        />
      </div>
    </Box>
  );
};

AllVariants.story = {
  name: "All Variants",
};

AllVariants.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
  pseudo: {
    hover: '[data-role="target-hover"] a',
    focus: '[data-role="target-focus"] a',
  },
};
