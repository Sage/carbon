import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';

class Textbox extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    var mainClasses = 'ui-textbox' +
        this.props.input.mainClasses() +
        this.props.validation.mainClasses();

    var inputClasses = "ui-textbox__input" +
        this.props.input.inputClasses() +
        this.props.validation.inputClasses();

    return (
      <div className={ mainClasses }>
        { this.props.input.labelHTML() }

        <input
          ref="visible"
          className={ inputClasses }
          onBlur={ this.props.validation.handleBlur }
          onFocus={ this.props.validation.handleFocus }
          { ...this.props.input.inputProps() }
        />

        { this.props.validation.errorIconHTML() }

        { this.props.validation.errorMessageHTML() }
      </div>
    );
  }
};

export default InputValidation(Input(Textbox));
