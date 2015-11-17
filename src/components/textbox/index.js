import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

/**
 * Decorators
 *
 * The component's decorators may define additional props.
 * Refer to the decorators for more information on required and optional props.
 */
@Input
@InputLabel
@InputValidation
/**
 * A textbox widget.
 *
 * == How to use a Textbox in a component:
 *
 * In your file
 *
 *  import Textbox from 'carbon/lib/components/textbox';
 *
 * In the render method:
 *
 *  <Textbox/>
 *
 * @class Textbox
 * @constructor
 */
class Textbox extends React.Component {

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-textbox';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-textbox__input';
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
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
        { this.validationHTML }

      </div>
    );
  }
}

export default Textbox;
