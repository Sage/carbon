import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../link';

const EditorLink = ({
  children, contentState, entityKey, ...rest
}) => {
  const url = !!contentState && !!entityKey ? contentState.getEntity(entityKey).getData() : children[0].props.text;

  return (
    <Link
      href={ url.url || url }
      title={ url.url || url }
      aria-label={ url.url || url }
      target='_blank'
      rel='noopener noreferrer'
      tabbable={ false } // set to true when in view mode
      { ...rest }
    >
      { children }
    </Link>
  );
};

EditorLink.propTypes = {
  children: PropTypes.node.isRequired,
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string
};

export default EditorLink;
