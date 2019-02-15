import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ text, children, ...props }) => (
  <div { ...props }>
    { children || text }
  </div>
);

Option.propTypes = {
  text: PropTypes.string.isRequired, // used to filter the item
  children: PropTypes.node, // optional, if different to props.text
  value: PropTypes.string.isRequired, // sent on select of an item
  options: PropTypes.object // optional additional params to be sent on select
};

export default Option;
