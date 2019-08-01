import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.component {
static propTypes = {
  /** Set the value of the checkbox */
  checked: PropTypes.bool,
  /** When provided will replace the checkbox sprite. */
  children: PropTypes.node,
  /** Displays fieldHelp inline with the checkbox */
  fieldHelpInline: PropTypes.bool,
  /** Reverses label and checkbox display */
  reverse: PropTypes.bool,
  /** Set the value of the checkbox */
  value: PropTypes.bool
}

render() {
  return (<></>);
}
}
export default Checkbox;
