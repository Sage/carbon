import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { ListControls } from "./..";
import TextEditor from "../../../../../text-editor.component";
import { createFromHTML } from "../../../../__utils__/helpers";

it("should render the ordered list control correctly", async () => {
  const user = userEvent.setup();
  render(
    <LexicalComposer
      initialConfig={{
        nodes: [],
        onError: () => {},
        namespace: "test",
      }}
    >
      <RichTextPlugin
        contentEditable={
          <div role="textbox" contentEditable aria-label="test" />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      §
      <ListControls namespace="test" />
    </LexicalComposer>,
  );
  const olButton = screen.getByTestId(`test-ordered-list-button`);
  expect(olButton).toBeInTheDocument();
  expect(olButton).toHaveStyleRule("background-color", "transparent");

  await user.click(olButton);
  expect(olButton).toHaveStyleRule(
    "background-color",
    "var(--colorsActionMajor600)",
  );
});

it("should render the unordered list control correctly", async () => {
  const user = userEvent.setup();
  render(
    <LexicalComposer
      initialConfig={{
        nodes: [],
        onError: () => {},
        namespace: "test",
      }}
    >
      <RichTextPlugin
        contentEditable={
          <div role="textbox" contentEditable aria-label="test" />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListControls namespace="test" />
    </LexicalComposer>,
  );
  const ulButton = screen.getByTestId(`test-unordered-list-button`);
  expect(ulButton).toBeInTheDocument();
  expect(ulButton).toHaveStyleRule("background-color", "transparent");

  await user.click(ulButton);
  expect(ulButton).toHaveStyleRule(
    "background-color",
    "var(--colorsActionMajor600)",
  );
});

test("should toggle the list type when a list is active and the alternate list type is clicked", async () => {
  const user = userEvent.setup();
  const value = createFromHTML(
    `<ul><li value="1"><span style="white-space: pre-wrap;">Example List</span></li></ul>`,
  );
  // render the TextEditor component
  render(
    <TextEditor labelText="Example" namespace="test" initialValue={value} />,
  );
  const olButton = screen.getByTestId(`test-ordered-list-button`);
  const ulButton = screen.getByTestId(`test-unordered-list-button`);
  expect(olButton).toBeVisible();
  expect(ulButton).toBeVisible();
  expect(screen.getByRole("list")).toBeVisible();
  expect(screen.getByRole("list").tagName).toBe("UL");
  const listText = screen.getByText("Example List");
  await user.click(listText);
  await user.click(olButton);
  expect(screen.getByRole("list").tagName).toBe("OL");
  await user.click(listText);
  await user.click(ulButton);
  expect(screen.getByRole("list").tagName).toBe("UL");
});

test("should toggle the an individual list item's type when a list is active and the alternate list type is clicked", async () => {
  const user = userEvent.setup();
  const value = createFromHTML(
    `<ul><li value="1"><span style="white-space: pre-wrap;">Example List</span></li><li value="2"><span style="white-space: pre-wrap;">Change Me</span></li><li value="3"><span style="white-space: pre-wrap;">Example List</span></li></ul>`,
  );
  // render the TextEditor component
  render(
    <TextEditor labelText="Example" namespace="test" initialValue={value} />,
  );
  const olButton = screen.getByTestId(`test-ordered-list-button`);
  const ulButton = screen.getByTestId(`test-unordered-list-button`);
  expect(olButton).toBeVisible();
  expect(ulButton).toBeVisible();
  expect(screen.getByRole("list")).toBeVisible();
  expect(screen.getByRole("list").tagName).toBe("UL");
  const listText = screen.getByText("Change Me");
  await user.click(listText);
  await user.click(olButton);
  expect(screen.queryAllByRole("list").length).toBe(3);
  await user.click(listText);
  await user.click(ulButton);
  expect(screen.queryAllByRole("list").length).toBe(1);
});

test("should remove the list when a list is active and the alternate list type is clicked", async () => {
  const user = userEvent.setup();
  const value = createFromHTML(
    `<ul><li value="1"><span style="white-space: pre-wrap;">Example List</span></li></ul>`,
  );
  // render the TextEditor component
  render(
    <TextEditor labelText="Example" namespace="test" initialValue={value} />,
  );
  const ulButton = screen.getByTestId(`test-unordered-list-button`);
  expect(ulButton).toBeVisible();

  expect(screen.getByRole("list")).toBeVisible();
  expect(screen.getByRole("list").tagName).toBe("UL");

  const listText = screen.getByText("Example List");
  await user.click(listText);
  await user.click(ulButton);

  expect(screen.getByText("Example List")).toBeVisible();
  expect(screen.getByText("Example List").tagName).toBe("P");
});
