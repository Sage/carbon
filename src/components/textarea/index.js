import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

@Input
@InputLabel
@InputValidation
class TextareaComponent extends React.Component {

  get mainClasses() {
    return 'ui-textarea';
  }

  get inputClasses() {
    return 'ui-textarea__input';
  }

  get inputProps() {
    var { onChange, ...props } = this.props;
    props.className = this.inputClasses;
    props.ref = "ref";
    props.rows = this.props.rows;
    props.cols = this.props.cols;
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
        <textarea { ...this.inputProps } />
        { this.validationHTML }

      </div>
    );
  }
}

export default TextareaComponent;
