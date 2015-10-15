import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input-validation';

class Textbox extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className='ui-textbox'>
        { this.props.labelHTML() }

        <input
          ref="visible"
          onBlur={ this.props.handleBlur }
          onFocus={ this.props.handleFocus }
          { ...this.props.inputProps() }
        />

        { this.props.errorMessage }
      </div>
    );
  }
};

export default InputValidation(Input(Textbox));
