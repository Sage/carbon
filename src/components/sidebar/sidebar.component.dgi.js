import React from 'react';
import PropTypes from 'prop-types';

class Sidebar extends React.component {
static propTypes = {
  onCancel: PropTypes.func,
  /** A boolean to track the open state of the dialog */
  open: PropTypes.bool,
  /** Set this prop to false to hide the translucent background when the dialog is open. */
  enableBackgroundUI: PropTypes.bool,
  /** Sets the position of sidebar, either left or right. */
  position: PropTypes.string,
  /** Sets the size of the sidebar when open. */
  size: PropTypes.string
}

render() {
  return (<></>);
}
}
export default Sidebar;
