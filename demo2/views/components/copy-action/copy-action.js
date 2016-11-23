import React from 'react';

import classNames from 'classnames';

class CopyAction extends React.Component {
  componentWillMount() {
    this.setState({ copyTriggered: false });
  }

  classes = (classes) => {
    return classNames(
      classes,
      { 'copied': this.state.copyTriggered }
    );
  }

  copy = () => {
    this.setState({ copyTriggered: true });
    console.log(this.props.valueToCopy);
  }

  render() {
    return (
      <div
        className={ this.classes(this.props.className) }
        onClick={ this.copy }
        style={ this.props.style }
      >
        { this.props.children }
      </div>
    );
  }
}

export default CopyAction;
