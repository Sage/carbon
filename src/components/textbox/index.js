import React from 'react';
import InputClass from './../../utils/input-class';
import ValidationClass from './../../utils/validation-class';

class Textbox extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div>
        { this.props.labelHTML() }

        <input
          onBlur={ this.props.handleBlur }
          onFocus={ this.props.handleFocus }
          { ...this.props.inputProps() }
        />

        { this.props.errorMessage }
      </div>
    );
  }

};

export default ValidationClass(InputClass(Textbox));
