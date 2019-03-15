import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';
import './preview.scss';

const Preview = (props) => {
  if (isLoading(props.loading, props.children)) {
    const previews = [];
    for (let i = 1; i <= props.lines; i++) {
      previews.push(createPreview(props, i));
    }
    return previews;
  }

  return props.children;
};

Preview.propTypes = {
  /**
   * Children elements
   *
   */
  children: PropTypes.node,
  /**
   * Custom className
   *
   */
  className: PropTypes.string,
  /**
   * Custom height
   *
   */
  height: PropTypes.string,
  /**
   * Number of lines to generate for preview
   *
   */
  lines: PropTypes.number,
  /**
   * Custom loading
   *
   */
  loading: PropTypes.bool,
  /**
   * Custom width
   *
   */
  width: PropTypes.string
};

Preview.defaultProps = {
  lines: 1
};

function isLoading(loading, children) {
  if (typeof loading !== 'undefined') {
    return loading;
  }

  return !children;
}

function createPreview(allProps, index) {
  const { className, height, lines } = allProps;
  let { width } = allProps;

  if (!width && lines > 1 && lines === index) {
    width = '80%';
  }

  return (
    <span
      key={ index }
      className={ classNames('carbon-preview', className) }
      style={ { height, width } }
      { ...tagComponent('preview', allProps) }
    />
  );
}

export default Preview;
