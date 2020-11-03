import React from "react";
import PropTypes from "prop-types";
import StyledLink from "./editor-link.style";

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

  return (
    <StyledLink
      href={validUrl}
      title={validUrl}
      aria-label={validUrl}
      target="_blank"
      rel="noopener noreferrer"
      tabbable={false}
      {...rest}
    >
      {children}
    </StyledLink>
  );
};

EditorLink.propTypes = {
  children: PropTypes.node.isRequired,
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string,
};

export default EditorLink;
