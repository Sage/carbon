import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input-validation';

class TextareaComponent extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {

    var mainClasses = 'ui-textarea ' +
        this.props.input.mainClasses() +
        this.props.validation.mainClasses();

    var inputClasses = "ui-textarea__input" +
        this.props.input.inputClasses() +
        this.props.validation.inputClasses();

    return (
      <div className={ mainClasses }>
        { this.props.input.labelHTML() }

        <textarea
          ref="visible"
          className={ inputClasses }
          onBlur={ this.props.validation.handleBlur }
          onFocus={ this.props.validation.handleFocus }
          rows={ this.props.rows }
          cols={ this.props.cols }
          { ...this.props.input.inputProps() }
        />

        { this.props.validation.errorIconHTML() }

        { this.props.validation.errorMessageHTML() }
      </div>
    );
  }
}

export default InputValidation(Input(TextareaComponent));
