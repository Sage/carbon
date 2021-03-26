import * as React from "react";

export interface EditorLinkProps {
  children: React.ReactNode;
  contentState: object;
  entityKey?: string;
}

declare function EditorLink(props: EditorLinkProps): JSX.Element;

export default EditorLink;
