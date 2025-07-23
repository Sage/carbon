/**
 * Button state tests only. Functionality tests are in the ../toolbar.test.tsx file.
 * The Save button functionality is tested here to make use of Jest's function mocking.
 */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { BoldButton, ItalicButton, ListControls, SaveButton } from ".";

const mockedSerializeRespone = {
  htmlString: "<p><br></p>",
  json: {
    root: {
      children: [],
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  },
};

describe("Toolbar buttons", () => {
  describe("Bold button", () => {
    it("should render the bold button correctly if inactive", () => {
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
          <BoldButton isActive={false} namespace="test" />
        </LexicalComposer>,
      );
      const boldButton = screen.getByRole("button");
      expect(boldButton).toBeInTheDocument();
      expect(boldButton).toHaveStyleRule("background-color", "transparent");
    });

    it("should render the bold button correctly if active", () => {
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
          <BoldButton isActive namespace="test" />
        </LexicalComposer>,
      );
      const boldButton = screen.getByRole("button");
      expect(boldButton).toBeInTheDocument();
      expect(boldButton).toHaveStyleRule(
        "background-color",
        "var(--colorsActionMajor600)",
      );
    });
  });

  describe("Italic button", () => {
    it("should render the italic button correctly if inactive", () => {
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
          <ItalicButton isActive={false} namespace="test" />
        </LexicalComposer>,
      );
      const italicButton = screen.getByRole("button");
      expect(italicButton).toBeInTheDocument();
      expect(italicButton).toHaveStyleRule("background-color", "transparent");
    });

    it("should render the bold button correctly if active", () => {
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
          <ItalicButton isActive namespace="test" />
        </LexicalComposer>,
      );
      const italicButton = screen.getByRole("button");
      expect(italicButton).toBeInTheDocument();
      expect(italicButton).toHaveStyleRule(
        "background-color",
        "var(--colorsActionMajor600)",
      );
    });
  });

  describe("List controls", () => {
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
  });
});

describe("Command buttons", () => {
  describe("Save button", () => {
    it("invokes the onSave callback with the serialized editor value", async () => {
      const user = userEvent.setup();
      const mockSerialize = jest.fn(() => mockedSerializeRespone);
      jest.mock("../../../helpers", () => ({
        SerializeLexical: mockSerialize,
      }));
      const onSave = jest.fn();
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
          <SaveButton namespace="test" onSave={onSave} />
        </LexicalComposer>,
      );
      const saveButton = screen.getByRole("button");
      await user.click(saveButton);
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave.mock.calls[0][0].htmlString).toEqual("<p><br></p>");
    });
  });
});
