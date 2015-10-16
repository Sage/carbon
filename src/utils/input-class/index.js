import React from 'react';
import _ from 'lodash';

var InputClass = (ComposedComponent) => class extends React.Component {

  /**
   * Define property types
   */
  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  /**
   * Determines if the component should re-render
   */
  shouldComponentUpdate = (nextProps, nextState) => {
    if (!_.isEqual(this.props, nextProps) ||
        !_.isEqual(this.state, nextState)) {
      return true;
    }

    return false;
  }

  /**
   * Returns modified properties for the input element.
   *
   * @method inputProps
   */
  inputProps = () => {
    var { ...inputProps } = this.props;

    // set id so label will work correctly
    inputProps.id = inputProps.name;

    if (inputProps.onChange) {
      inputProps.onChange = this.handleOnChange;
    }

    return inputProps;
  }

  /**
   * Calls the onChange method with relevant data.
   */
  handleOnChange = (ev) => {
    this.props.onChange(ev, this.props);
  }

  /**
   * Returns HTML for the label.
   *
   * @method labelHTML
   */
  labelHTML = () => {
    if (this.props.label === false) {
      return;
    }

    var labelText = this.props.label || this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    return (
      <label htmlFor={ this.props.name }>{ labelText }:</label>
    );
  }

  state = {
    labelHTML: this.labelHTML,
    inputProps: this.inputProps
  }

  render() {
    return (
      <ComposedComponent {...this.props} {...this.state} />
    );
  }

};

export default InputClass;
