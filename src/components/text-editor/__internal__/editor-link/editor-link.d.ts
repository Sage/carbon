import * as React from "react";

export interface EditorLinkProps {
  children: React.ReactNode;
  contentState: object;
  entityKey?: string;
}

declare const EditorLink: React.FunctionComponent<EditorLinkProps>;

export default EditorLink;
