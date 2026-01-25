import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

import TextEditor from "../../../text-editor.component";
import CharacterCounterPlugin from "./character-counter.component";

const EditorContent = ({ text }: { text: string }) => {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
      root.append($createParagraphNode().append($createTextNode(text)));
    });
  }, [editor, text]);

  return null;
};

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Sample text",
            type: "text",
            version: 1,
          },
        ],
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],

    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

describe("CharacterCounterPlugin", () => {
  it("correctly updates character count when editor state changes", async () => {
    const user = userEvent.setup();

    render(
      <TextEditor labelText="Test Editor" namespace="test" characterLimit={100} initialValue={JSON.stringify(initialValue)} />,
    );

    const visibleCounter = screen.getByTestId("test-character-limit");
    await waitFor(() => {
      expect(visibleCounter).toHaveTextContent("89 characters remaining");
    });

    const editor = screen.getByRole("textbox");
    await user.click(editor);
    await user.type(editor, "Hello world!");

    await waitFor(() => {
      expect(visibleCounter).toHaveTextContent("77 characters remaining");
    });
  });

  it("caps the character count at 0 when text is added and maxChars is exceeded", async () => {
    const user = userEvent.setup();

    render(
      <TextEditor labelText="Test Editor" namespace="test" characterLimit={10} />,
    );

    const visibleCounter = screen.getByTestId("test-character-limit");
    expect(visibleCounter).toHaveTextContent("10 characters remaining");

    const editor = screen.getByRole("textbox");
    await user.click(editor);
    await user.type(editor, "Hello World!");

    await waitFor(() => {
      expect(visibleCounter).toHaveTextContent("0 characters remaining");
    });
  });

  it("renders with the default margin top when no marginTop is specified", async () => {
    const initialConfig = {
      namespace: "test-headless",
      onError: () => {},
    };

    render(
      <LexicalComposer initialConfig={initialConfig}>
        <CharacterCounterPlugin
          isFocused
          maxChars={100}
          namespace="test-headless"
        />
        <EditorContent text="Sample text" />
      </LexicalComposer>,
    );

    const visibleCounter = screen.getByTestId("test-headless-character-limit");
    await waitFor(() => {
      expect(visibleCounter).toHaveTextContent("89 characters remaining");
    });
    expect(visibleCounter).toHaveStyleRule("margin-top", "var(--spacing050)");
  });
});
