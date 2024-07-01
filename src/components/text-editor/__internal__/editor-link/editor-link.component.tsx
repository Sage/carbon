import React, { useContext, useEffect } from "react";
import { ContentState } from "draft-js";
import StyledLink from "./editor-link.style";
import EditorContext from "../../__internal__/editor.context";

export interface EditorLinkProps {
  children: React.ReactElement[];
  contentState?: ContentState;
  entityKey?: string;
}

const EditorLink = ({
  children,
  contentState,
  entityKey,
  ...rest
}: EditorLinkProps) => {
  const url =
    !!contentState && !!entityKey
      ? contentState.getEntity(entityKey).getData()
      : children[0].props.text;

  const buildValidUrl = () => {
    const candidateUrl = url.url || url;
    const regex = /(http:\/\/|https:\/\/)+/g;

    return regex.test(candidateUrl) ? candidateUrl : `https://${candidateUrl}`;
  };

  const validUrl = buildValidUrl();

  const { onLinkAdded, editMode } = useContext(EditorContext);

  useEffect(() => {
    if (onLinkAdded) {
      onLinkAdded(validUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validUrl]);

  return (
    <StyledLink
      href={!editMode ? validUrl : undefined}
      aria-label={!editMode ? validUrl : undefined}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </StyledLink>
  );
};

export default EditorLink;
