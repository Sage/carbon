import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen } from "@testing-library/react";
import React from "react";

import { BoldButton } from "./..";

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
