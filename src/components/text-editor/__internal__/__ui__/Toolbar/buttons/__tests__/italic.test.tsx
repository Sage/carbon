import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen } from "@testing-library/react";

import React from "react";

import { ItalicButton } from "./..";

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

  it("should render the italic button correctly if active", () => {
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
