import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ text, children, ...props }) => (
  <div { ...props }>
    { children || text }
  </div>
);

Option.propTypes = {
  /** used to filter the item */
  text: PropTypes.string.isRequired,
  /** optional, if different to props.text */
  children: PropTypes.node,
  /** sent on select of an item */
  value: PropTypes.string.isRequired,
  /** optional additional params to be sent on select */
  options: PropTypes.object
};

export default Option;
