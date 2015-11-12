import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

// Decorators
@Input
@InputLabel
@InputValidation
/**
 * A textarea widget.
 *
 * == How to use a Textarea in a component:
 *
 * In your file
 *
 *  import Textarea from 'carbon/lib/components/textarea';
 *
 *  In the render method:
 *
 *    <Textarea/>
 *
 * This component receives its props from the decorators listed above.
 * Refer to the Input decorator for more information on required and optional props.
 *
 * @class Textarea
 * @constructor
 **/
class Textarea extends React.Component {

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-textarea';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-textarea__input';
  }

  /***
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   ***/
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.ref = "ref";
    props.value = props.value || '';
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

export default Textarea;
