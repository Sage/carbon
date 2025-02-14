import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from ".";
import LinkPreview from "../link-preview";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Typography from "../typography";

test("should render with required props", () => {
  render(<Note createdDate="23 May 2020, 12:08 PM" noteContent="" />);

  expect(screen.getByText("23 May 2020, 12:08 PM")).toBeVisible();
});

test("should render with provided data- attributes", () => {
  render(
    <Note
      createdDate="23 May 2020, 12:08 PM"
      noteContent=""
      data-element="bar"
      data-role="baz"
    />,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("renders a Typography component with h2 `variant` and `title` as its child when `title` prop is a string", () => {
  render(
    <Note createdDate="23 May 2020, 12:08 PM" noteContent="" title="Title" />,
  );

  const titleElement = screen.getByRole("heading", { level: 2 });

  expect(titleElement).toHaveTextContent("Title");
  expect(titleElement).toHaveAttribute("data-role", "note-title");
});

test("renders the `title` node when `title` prop is a React node", () => {
  render(
    <Note
      createdDate="23 May 2020, 12:08 PM"
      noteContent=""
      title={
        <Typography data-role="note-node" variant="h4">
          Title
        </Typography>
      }
    />,
  );

  const titleNode = screen.getByRole("heading", { level: 4 });

  expect(titleNode).toHaveTextContent("Title");
  expect(titleNode).toHaveAttribute("data-role", "note-node");
});

test("should render with provided `name` prop", () => {
  render(
    <Note createdDate="23 May 2020, 12:08 PM" noteContent="" name="Carbon" />,
  );

  expect(screen.getByText("Carbon")).toBeVisible();
});

test("should render tooltip containing status `timeStamp` when status `text` is hovered", async () => {
  const user = userEvent.setup();
  render(
    <Note
      createdDate="23 May 2020, 12:08 PM"
      noteContent=""
      status={{
        text: "Edited",
        timeStamp: "23 May 2020, 12:10 PM",
      }}
    />,
  );

  const statusText = screen.getByText("Edited");
  expect(statusText).toBeVisible();

  await user.hover(statusText);

  const tooltip = await screen.findByRole("tooltip", {
    name: "23 May 2020, 12:10 PM",
  });
  expect(tooltip).toBeVisible();
});

test("should render LinkPreviews when passed via the `previews` prop as an array", () => {
  const previews = [
    <LinkPreview key="1" url="https://example.com" />,
    <LinkPreview key="2" url="https://example.com" />,
  ];
  render(
    <Note
      createdDate="23 May 2020, 12:08 PM"
      noteContent=""
      previews={previews}
    />,
  );

  const links = screen.getAllByRole("link");

  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute("href", "https://example.com");
});

test("should render LinkPreviews when passed via the `previews` prop as a node", () => {
  const previews = (
    <>
      <LinkPreview key="1" url="https://example.com" />
      <LinkPreview key="2" url="https://example.com" />
    </>
  );
  render(
    <Note
      createdDate="23 May 2020, 12:08 PM"
      noteContent=""
      previews={previews}
    />,
  );

  const links = screen.getAllByRole("link");

  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute("href", "https://example.com");
});

test("should render with `ActionPopover` when passed via the `inlineControl` prop", async () => {
  const user = userEvent.setup();
  const inlineControl = (
    <ActionPopover>
      <ActionPopoverItem>Copy</ActionPopoverItem>
      <ActionPopoverItem>Edit</ActionPopoverItem>
    </ActionPopover>
  );
  render(
    <Note
      createdDate="23 May 2020, 12:08 PM"
      noteContent=""
      inlineControl={inlineControl}
    />,
  );

  await user.click(screen.getByRole("button", { name: "actions" }));

  expect(screen.getByRole("button", { name: "Copy" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Edit" })).toBeVisible();
});

test("should throw when `inlineControls` is not an instance of `ActionPopover`", () => {
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});
  expect(() =>
    render(
      <Note
        createdDate="23 May 2020, 12:08 PM"
        noteContent=""
        inlineControl={<button type="button">A Button</button>}
      />,
    ),
  ).toThrow("<Note> inlineControl must be an instance of <ActionPopover>");
  spy.mockRestore();
});

test("should throw when width is 0", () => {
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});
  expect(() =>
    render(
      <Note createdDate="23 May 2020, 12:08 PM" noteContent="" width={0} />,
    ),
  ).toThrow("<Note> width must be greater than 0");
  spy.mockRestore();
});

testStyledSystemMargin(
  (props) => (
    <Note
      {...props}
      data-role="note"
      createdDate="23 May 2020, 12:08 PM"
      noteContent=""
    />
  ),
  () => screen.getByTestId("note"),
);
