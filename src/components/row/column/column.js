import React from 'react';
import PropTypes from 'prop-types';

const Column = (props) => {
  return (
    <div className={ `carbon-column ${props.className}` }>
      { props.children }
    </div>
  );
};

Column.isColumn = true;

Column.propTypes = {
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
  className: PropTypes.string
};

export default Column;
