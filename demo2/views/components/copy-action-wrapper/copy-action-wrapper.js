import React from 'react';

import classNames from 'classnames';

class CopyActionWrapper extends React.Component {
  state = {
    copyTriggered: false
  }

  classes = () => {
    return classNames(
      this.props.className,
      { 'copied': this.state.copyTriggered }
    );
  }

  copy = () => {
    this.setState({ copyTriggered: true });
  }

  render() {
    return (
      <div
        className={ this.classes() }
        onClick={ this.copy }
        style={ this.props.style }
      >
        { this.props.children }
      </div>
    );
  }
}

export default CopyActionWrapper;
