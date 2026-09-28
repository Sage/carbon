import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from ".";
import LinkPreview from "../link-preview";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Typography from "../typography";
import I18nProvider from "../i18n-provider";

test("should render with required props", () => {
  render(<Note createdDate="23 May 2020, 12:08 PM" noteContent="" />);

  expect(screen.getByText("23 May 2020, 12:08 PM")).toBeVisible();
  expect(screen.queryByTestId("note-previews")).not.toBeInTheDocument();
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

test("renders a semantic h3 when `title` is a string", () => {
  render(
    <Note createdDate="23 May 2020, 12:08 PM" noteContent="" title="Title" />,
  );

  const titleElement = screen.getByRole("heading", { level: 3 });

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

test("should render status and timestamp below the created details", () => {
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

  const createdLabel = screen.getByText("Created");
  const statusText = screen.getByText("Edited");

  expect(createdLabel).toBeVisible();
  expect(statusText).toBeVisible();
  expect(screen.getByText("23 May 2020, 12:10 PM")).toBeVisible();
});

test("uses the en-GB created-label fallback and preserves the supplied date", () => {
  render(
    <I18nProvider locale={{ locale: () => "de-DE" }}>
      <Note createdDate="20 Jan 16:49" noteContent="" />
    </I18nProvider>,
  );

  expect(screen.getByText("Created")).toBeVisible();
  const createdTime = screen.getByText("20 Jan 16:49", { selector: "time" });
  expect(createdTime).toBeVisible();
  expect(createdTime).not.toHaveAttribute("datetime");
});

test("adds machine-readable values for valid ISO timestamps", () => {
  render(
    <Note
      createdDate="2026-01-20T16:49:00Z"
      noteContent=""
      status={{
        text: "Updated",
        timeStamp: "2026-01-21T09:15:00+02:00",
      }}
    />,
  );

  expect(screen.getByText("2026-01-20T16:49:00Z")).toHaveAttribute(
    "datetime",
    "2026-01-20T16:49:00Z",
  );
  expect(screen.getByText("2026-01-21T09:15:00+02:00")).toHaveAttribute(
    "datetime",
    "2026-01-21T09:15:00+02:00",
  );
});

test("omits machine-readable values for invalid ISO dates", () => {
  render(<Note createdDate="2026-02-31" noteContent="" />);

  expect(screen.getByText("2026-02-31")).not.toHaveAttribute("datetime");
});

test("renders serialized mentions as readonly pills", () => {
  const noteContent = JSON.stringify({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "token",
              mention: "@Amanda Ball",
              style: "",
              text: "@Amanda Ball",
              type: "mention",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });

  render(<Note createdDate="20 Jan 16:49" noteContent={noteContent} />);

  const mention = screen.getByText("@Amanda Ball");
  expect(mention).toHaveClass("mention");
  const article = screen.getByRole("article");
  expect(article).toContainElement(mention);
  expect(article).toHaveAttribute("contenteditable", "false");
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

  const noteBody = screen.getByTestId("note-body");
  const inlineControlElement = screen.getByTestId("note-inline-control");

  expect(within(noteBody).getByRole("article")).toBeVisible();
  expect(within(noteBody).getByTestId("note-inline-control")).toBe(
    inlineControlElement,
  );
  expect(screen.queryByTestId("note-title-row")).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "actions" }));

  expect(screen.getByRole("button", { name: "Copy" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Edit" })).toBeVisible();
});

test("places the title and action in a top-aligned row", () => {
  render(
    <Note
      createdDate="23 May 2020, 12:08 PM"
      inlineControl={<ActionPopover />}
      noteContent="Note body"
      title="Title"
    />,
  );

  const noteBody = screen.getByTestId("note-body");
  const titleRow = screen.getByTestId("note-title-row");
  const inlineControlElement = screen.getByTestId("note-inline-control");

  expect(within(titleRow).getByRole("heading", { level: 3 })).toBeVisible();
  expect(within(titleRow).getByTestId("note-inline-control")).toBe(
    inlineControlElement,
  );
  expect(within(noteBody).getByRole("article")).toBeVisible();
  expect(screen.getByRole("button", { name: "actions" })).toHaveAttribute(
    "data-element",
    "action-popover-button",
  );
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

test.each([30, 75])("should render with width prop set to %i", (width) => {
  render(
    <Note
      createdDate="23 May 2020, 12:08 PM"
      noteContent=""
      data-role="note"
      width={width}
    />,
  );

  expect(screen.getByTestId("note")).toHaveAttribute("width", `${width}`);
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
