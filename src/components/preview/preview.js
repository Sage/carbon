import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Preview (props) {
  const isLoading = (() => {
    if (typeof props.loading !== 'undefined') {
      return props.loading;
    }
    return !props.children;
  })();

  const mainClasses = (() => {
    return classNames(
      'carbon-preview',
      { 'carbon-preview--placeholder': isLoading },
      props.className
    );
  })();

  return (
    <div className={ mainClasses }>
      { props.children }
    </div>
  );
}

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

Preview.defaultProps = {
  className: ''
};

Preview.componentTags = function(props) {
  return {
    'data-component': 'preview',
    'data-element': props['data-element'],
    'data-role': props['data-role']
  };
};

export default Preview;
