import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ text, children, ...props }) => (
  <div { ...props }>
    { children || text }
  </div>
);

Option.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node
}

export default Option;
