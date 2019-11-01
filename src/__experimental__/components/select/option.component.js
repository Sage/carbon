import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ text, children, ...props }) => (
  <div { ...props }>
    { children || text }
  </div>
);

Option.propTypes = {
  /** if children is undefined, text will be rendered as the Option content */
  text: PropTypes.string.isRequired,
  /** if defined, children will be rendered as the Option content */
  children: PropTypes.node,
  /** the value of the Option */
  value: PropTypes.string.isRequired,
  /** if defined, this object can be used to provide optional extra properties */
  options: PropTypes.object
};

export default Option;
