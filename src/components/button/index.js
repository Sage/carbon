import React from 'react';

class ButtonComponent extends React.Component {

  static defaultProps = {
    as: 'secondary',
    children: 'Save',
    disabled: false
  }

  static propTypes = {
    as: React.PropTypes.string,
    children: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    path: React.PropTypes.string
  }

  render() {
    var {className, ...props} = this.props;

    className = 'ui-button ui-button--' + this.props.as +
      (this.props.disabled ? ' ui-button--disabled' : '') + " " + className;

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
