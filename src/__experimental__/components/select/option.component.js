import React from 'react';
import PropTypes from 'prop-types'

const Option = ({ text, children, ...props }) => (
  <div { ...props }>
    { children || text }
  </div>
);

Option.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  value: PropTypes.string.isRequired
}

export default Option;
