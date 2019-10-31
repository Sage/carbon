import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ text, children, ...props }) => (
  <div { ...props }>
    { children || text }
  </div>
);

Option.propTypes = {
  /** The option's invisible internal value */
  value: PropTypes.string.isRequired,
  /** The option's visible text, displayed within <Textbox> of <Select>, and used for filtering */
  text: PropTypes.string.isRequired,
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children: PropTypes.node,
  /** Optional: additional params to be sent on select */
  options: PropTypes.object
};

export default Option;
