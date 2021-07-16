import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import StyledLink from "./editor-link.style";
import { EditorContext } from "../../text-editor.component";

const EditorLink = ({ children, contentState, entityKey, ...rest }) => {
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
      href={validUrl}
      title={validUrl}
      aria-label={validUrl}
      target="_blank"
      rel="noopener noreferrer"
      tabbable={!editMode}
      {...rest}
    >
      {children}
    </StyledLink>
  );
};

EditorLink.propTypes = {
  children: PropTypes.node.isRequired,
  contentState: PropTypes.object,
  entityKey: PropTypes.string,
};

export default EditorLink;
