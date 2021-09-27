import * as React from "react";

export interface EditorLinkProps {
  children: React.ReactNode;
  contentState: Record<string, unknown>;
  entityKey?: string;
}

declare function EditorLink(props: EditorLinkProps): JSX.Element;

export default EditorLink;
