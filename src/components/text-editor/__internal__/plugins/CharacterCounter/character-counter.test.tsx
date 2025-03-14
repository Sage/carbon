import React from "react";
import { act, screen } from "@testing-library/react";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { createHeadlessEditor } from "@lexical/headless";
import { render } from "../../../../../__spec_helper__/__internal__/test-utils";

import CharacterCounterPlugin from "./__test__/character-counter.component";

describe("CharacterCounterPlugin", () => {
  let editor: ReturnType<typeof createHeadlessEditor>;

  beforeEach(() => {
    const config = {
      namespace: "test",
      nodes: [],
      // eslint-disable-next-line no-console
      onError: console.error,
    };
    editor = createHeadlessEditor(config);
  });

  it("correctly updates character count when text is added", async () => {
    const { rerender } = render(
      <CharacterCounterPlugin maxChars={100} editor={editor} />,
    );

    const visibleCounter = screen.getByTestId("visible-counter");
    expect(visibleCounter).toHaveTextContent("100");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      editor.update(() => {
        const root = $getRoot();
        root.append(
          $createParagraphNode().append($createTextNode("Hello World!")),
        );
      });

      rerender(<CharacterCounterPlugin maxChars={100} editor={editor} />);
    });

    expect(visibleCounter).toHaveTextContent("88");
  });

  it("caps the character count at 0 when text is added and maxChars is exceeded", async () => {
    const { rerender } = render(
      <CharacterCounterPlugin maxChars={10} editor={editor} />,
    );

    const visibleCounter = screen.getByTestId("visible-counter");
    expect(visibleCounter).toHaveTextContent("10");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      editor.update(() => {
        const root = $getRoot();
        root.append(
          $createParagraphNode().append($createTextNode("Hello World!")),
        );
      });

      rerender(<CharacterCounterPlugin maxChars={10} editor={editor} />);
    });

    expect(visibleCounter).toHaveTextContent("0");
  });
});
