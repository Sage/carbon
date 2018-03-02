import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';

const Preview = (props) => {
  if (isLoading(props.loading, props.children)) {
    return (
      <div
        className={ classNames('carbon-preview', props.className) }
        { ...tagComponent('preview', props) }
      />
    );
  }

  return props.children;
};

Preview.propTypes = {
  /**
  * Children elements
  *
  * @property children
  * @type {Node}
  */
  children: PropTypes.node,
  /**
  * Custom className
  *
  * @property className
  * @type {String}
  */
  className: PropTypes.string,
  /**
  * Custom loading
  *
  * @property loading
  * @type {Boolean}
  */
  loading: PropTypes.bool
};

function isLoading(loading, children) {
  if (typeof loading !== 'undefined') {
    return loading;
  }

  return !children;
}

export default Preview;
