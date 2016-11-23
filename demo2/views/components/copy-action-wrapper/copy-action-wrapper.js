import React from 'react';

import ClipboardCopy from 'clipboard-js';

class CopyActionWrapper extends React.Component {
  state = {
    copyTriggered: false
  }

  copy = () => {
    this.setState({ copyTriggered: true });
    ClipboardCopy.copy(this.props.valueToCopy);
  }

  render() {
    return (
      <div className='copy-action-wrapper' onClick={ this.copy }>
        { this.props.children }
      </div>
    );
  }
}

export default CopyActionWrapper;
