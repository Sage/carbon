import React from 'react';
import _ from 'lodash';

class InputClass extends React.Component {

  /**
   * Define property types
   */
  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

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

    return this.customInputProps(inputProps);
  }

  /**
   * Overridable method to supply further customisation.
   *
   * @method customInputProps
   */
  customInputProps = (inputProps) => {
    return inputProps;
  }

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

};

export default InputClass;
