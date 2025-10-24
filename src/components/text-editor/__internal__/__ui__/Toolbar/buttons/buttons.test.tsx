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

import { SaveButton } from ".";

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

describe("Command buttons", () => {
  describe("Save button", () => {
    it("invokes the onSave callback with the serialized editor value", async () => {
      const user = userEvent.setup();
      const mockSerialize = jest.fn(() => mockedSerializeRespone);
      jest.mock("../../../__utils__/helpers", () => ({
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
