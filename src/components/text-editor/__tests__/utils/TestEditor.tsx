/* istanbul ignore file */
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  $getRoot,
  $createParagraphNode,
  $createTextNode,
  LexicalEditor,
} from "lexical";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";

import {
  AutoLinkerPlugin,
  LinkMonitorPlugin,
} from "../../__internal__/__plugins__/";
import { validateUrl } from "../../__internal__/__utils__/helpers";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { StyledSpanNode } from "../../__internal__/__nodes__/styled-span.node";
import { MentionNode } from "../../__internal__/__nodes__/mention.node";

export type TestEditorHelpers = {
  /**  Function to set the entire content of the editor, unit-style. */
  setEditorContent: (editor: LexicalEditor, text: string) => void;
  /** Function to append content to the existing content of the editor. */
  appendEditorContent: (editor: LexicalEditor, text: string) => void;
  /** Function to simulate typing into the editor, integration-style. */
  typeIntoEditor: (text: string) => Promise<void>;
};

type TestEditorProps = {
  children?: React.ReactNode;
  namespace?: string;
  /*
   ** Provides access to the LexicalEditor instance and helper functions
   ** for manipulating the editor content in tests.
   ** @param editor - The LexicalEditor instance.
   ** @param helpers - An object containing helper functions for interacting with the editor.)
   **/
  onEditorReady?: (editor: LexicalEditor, helpers: TestEditorHelpers) => void;
};

export const TestEditor = ({
  children,
  namespace = "test",
  onEditorReady,
}: TestEditorProps) => {
  return (
    <LexicalComposer
      initialConfig={{
        namespace,
        nodes: [
          AutoLinkNode,
          LinkNode,
          ListItemNode,
          ListNode,
          MentionNode,
          StyledSpanNode,
        ],
        onError: () => {},
        editorState: (editor) => {
          const helpers: TestEditorHelpers = {
            setEditorContent: (editor, text) => {
              editor.update(() => {
                const root = $getRoot();
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode(text));
                root.clear().append(paragraph);
              });
            },
            appendEditorContent: (editor, text) => {
              editor.update(() => {
                const root = $getRoot();
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode(text));
                root.append(paragraph);
              });
            },
            typeIntoEditor: async (text) => {
              const editorBox = screen.getByRole("textbox");
              await userEvent.type(editorBox, text);
            },
          };
          onEditorReady?.(editor, helpers);
        },
      }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable aria-label="test" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
      <LinkPlugin validateUrl={validateUrl} />
      <ClickableLinkPlugin newTab />
      <AutoLinkerPlugin />
      <LinkMonitorPlugin />

      {children}
    </LexicalComposer>
  );
};
export default TestEditor;
