import React from 'react';
import PropTypes from 'prop-types';
import Button from './../../button';

class ActionToolbarButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  }

  static contextTypes = {
    selected: PropTypes.object
  }

  isDisabled = () => {
    return Object.keys(this.context.selected).length === 0;
  }

  handleOnClick = (...args) => {
    this.props.onClick(this.context.selected, ...args);
  }

  render() {
    return (
      <Button
        disabled={ this.isDisabled() }
        { ...this.props }
        onClick={ this.handleOnClick }
      />
    );
  }
}

export default ActionToolbarButton;
