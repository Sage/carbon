import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';

class Textbox extends React.Component {

  hello() {
    return "hello";
  }

  test() {
    return this.hello();
  }

  get mainClasses() {
    return 'ui-textbox';
  }

  get inputClasses() {
    return 'ui-textbox__input';
  }

  get inputProps() {
    return {};
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>

        <input
          ref="visible"
          className={ this.inputClasses }
          { ...this.inputProps }
        />

      </div>
    );
  }
}

export default Input(Textbox);
