import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

/**
 * A textbox widget.
 *
 * == How to use a Textbox in a component:
 *
 * In your file
 *
 *   import Textbox from 'carbon/lib/components/textbox';
 *
 * To render a Textbox:
 *
 *   <Textbox name="myTextbox" />
 *
 * @class Textbox
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Textbox = Input(InputLabel(InputValidation(
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
        { this.inputHTML }
        { this.validationHTML }

      </div>
    );
  }
}
)));

export default Textbox;
