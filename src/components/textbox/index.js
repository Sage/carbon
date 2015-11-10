import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

@Input
@InputLabel
@InputValidation
class Textbox extends React.Component {
  get mainClasses() {
    return 'ui-textbox';
  }

  get inputClasses() {
    return 'ui-textbox__input';
  }

  get inputProps() {
    var { ...props } = this.props;
    props.className = this.inputClasses;
    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>

        { this.labelHTML }
        <input { ...this.inputProps } />
        { this.errorMessageHTML }

      </div>
    );
  }
}

export default Textbox;
