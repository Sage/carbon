import React from 'react';
import Input from '../../utils/decorators/input';
import InputLabel from '../../utils/decorators/input-label';
import InputValidation from '../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './textbox.scss';
import warnOfDeprecation from '../../utils/helpers/warn-as-deprecated';

const Textbox = Input(InputLabel(InputValidation(class Textbox extends React.Component {
  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {void}
   */
  get mainClasses() {
    return 'carbon-textbox';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'carbon-textbox__input';
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   * @return {Object} props for the input
   */
  get inputProps() {
    const { childOfForm, ...props } = validProps(this);
    props.className = this.inputClasses;
    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    warnOfDeprecation('Textbox', '__exprimental__/components/textbox', process.env.NODE_ENV);
    return (
      <div
        className={ this.mainClasses }
        ref={ (comp) => { this._target = comp; } }
        { ...tagComponent('textbox', this.props) }
      >
        { this.labelHTML }
        { this.inputHTML }
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
})));


export default Textbox;
