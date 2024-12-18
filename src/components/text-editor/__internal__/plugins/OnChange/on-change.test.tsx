/** The OnChangePlugin is a plugin for the LexicalComposer that calls a callback function when the content of the editor changes.
 * As this functionality is directly related to the LexicalComposer, it is not possible to test it in isolation. The unit tests
 * below are testing the OnChangePlugin in the context of the LexicalComposer to ensure that invoking the callback function when
 * the content of the editor changes behaves as expected. Actual content of the OnChangePlugin is not here.
 *
 * Content-based tests should/will be handled by the Playwright tests.
 */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import OnChangePlugin from "./on-change.plugin";

describe("OnChangePlugin", () => {
  it("should handle changes correctly", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

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
        <OnChangePlugin onChange={mockOnChange} />
      </LexicalComposer>,
    );
    expect(mockOnChange).not.toHaveBeenCalled();
    const tb = screen.getByRole("textbox");
    await user.click(tb);
    await user.keyboard("abcdefghijklmnopqrstuvwxyz0123456789");
    expect(mockOnChange).toHaveBeenCalled();
    expect(tb).toHaveTextContent("abcdefghijklmnopqrstuvwxyz0123456789");
  });
});
