import React from "react";
import { render, screen } from "@testing-library/react";
import { ContentState } from "draft-js";
import EditorLink from "./editor-link.component";
import EditorContext from "../editor.context";

test("derives the url from the`contentState` and `entityKey`", () => {
  render(
    <EditorContext.Provider value={{ editMode: false }}>
      <EditorLink
        entityKey="baz"
        contentState={
          {
            getEntity: (entityKey) => ({ getData: () => entityKey }),
          } as ContentState
        }
      >
        <div>foo</div>
        <div>bar</div>
      </EditorLink>
    </EditorContext.Provider>,
  );

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://baz");
  expect(link).toHaveTextContent("foobar");
});

test("derives the url from the first child element when no `contentState` is provided", () => {
  const ChildComponent = ({ text }: { text: string }) => <div>{text}</div>;
  render(
    <EditorContext.Provider value={{ editMode: false }}>
      <EditorLink entityKey="baz">
        <ChildComponent text="foo" />
        <ChildComponent text="bar" />
      </EditorLink>
    </EditorContext.Provider>,
  );

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://foo");
  expect(link).toHaveTextContent("foobar");
});

test("derives the url from the first child element when no `entityKey` is provided", () => {
  const ChildComponent = ({ text }: { text: string }) => <div>{text}</div>;
  render(
    <EditorContext.Provider value={{ editMode: false }}>
      <EditorLink
        contentState={
          {
            getEntity: (entityKey) => ({ getData: () => entityKey }),
          } as ContentState
        }
      >
        <ChildComponent text="foo" />
        <ChildComponent text="bar" />
      </EditorLink>
    </EditorContext.Provider>,
  );

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://foo");
  expect(link).toHaveTextContent("foobar");
});

test("does not append `https://` to the url when it contains `http://`", () => {
  const ChildComponent = ({ text }: { text: string }) => <div>{text}</div>;
  render(
    <EditorContext.Provider value={{ editMode: false }}>
      <EditorLink>
        <ChildComponent text="http://foo" />
        <ChildComponent text="bar" />
      </EditorLink>
    </EditorContext.Provider>,
  );

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "http://foo");
  expect(link).toHaveTextContent("http://foobar");
});

test("the `onLinkAdded` callback prop is called with the computed url when the component mounts", () => {
  const onLinkAdded = jest.fn();
  const ChildComponent = ({ text }: { text: string }) => <div>{text}</div>;
  render(
    <EditorContext.Provider value={{ editMode: false, onLinkAdded }}>
      <EditorLink>
        <ChildComponent text="foo" />
        <ChildComponent text="bar" />
      </EditorLink>
    </EditorContext.Provider>,
  );

  expect(onLinkAdded).toHaveBeenCalledWith("https://foo");
  expect(onLinkAdded).toHaveBeenCalledTimes(1);
});

test("when the `editMode` prop is `true`, the anchor element should not have a `href` prop", () => {
  const ChildComponent = ({ text }: { text: string }) => <div>{text}</div>;
  render(
    <EditorContext.Provider value={{ editMode: true }}>
      <EditorLink>
        <ChildComponent text="foo" />
        <ChildComponent text="bar" />
      </EditorLink>
    </EditorContext.Provider>,
  );

  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});
