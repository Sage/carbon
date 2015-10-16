import React from 'react';

class ButtonComponent extends React.Component {

  static defaultProps = {
    type: 'secondary',
    children: 'Save',
    disabled: false
  }

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool.isRequired
  }

  render() {
    var {className, ...props} = this.props;

    className = this.props.type + "-button " + 
      (this.props.disabled ? 'disabled-button' : '');

    return(
      <button
        className={ className }
        { ...props }
      >
      { this.props.children }
      </button>

    );
  }
};

export default ButtonComponent
