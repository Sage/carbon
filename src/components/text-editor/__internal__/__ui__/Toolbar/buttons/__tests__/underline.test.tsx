import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen } from "@testing-library/react";

import React from "react";

import { UnderlineButton } from "./..";

describe("Underline button", () => {
  it("should render the underline button correctly if inactive", () => {
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
        <UnderlineButton isActive={false} namespace="test" />
      </LexicalComposer>,
    );
    const underlineButton = screen.getByRole("button");
    expect(underlineButton).toBeInTheDocument();
    expect(underlineButton).toHaveStyleRule("background-color", "transparent");
  });

  it("should render the underline button correctly if active", () => {
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
        <UnderlineButton isActive namespace="test" />
      </LexicalComposer>,
    );
    const underlineButton = screen.getByRole("button");
    expect(underlineButton).toBeInTheDocument();
    expect(underlineButton).toHaveStyleRule(
      "background-color",
      "var(--colorsActionMajor600)",
    );
  });
});
