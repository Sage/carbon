import React from 'react';
import classNames from 'classnames';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import { tagComponent } from '../../utils/helpers/tags';

/**
 * A radiobutton widget.
 *
 * == How to use a RadioButton in a component:
 *
 * In your file:
 *
 *   import RadioButton from 'carbon/lib/components/radio-button';
 *
 * To render the radiobutton:
 *
 *  <RadioButton name='frequency' value='weekly' label='Weekly'/>
 *  <RadioButton name='frequency' value='2weekly' label='2 Weekly' />
 *  <RadioButton name='frequency' value='4weekly' label='4 Weekly'/>
 *  <RadioButton name='frequency' value='monthly' label='Monthly' />
 *
 * For additional properties specific to this component, see propTypes.
 *
 * If you wish to control the checked value of the radio buttons externally to the component
 * you can use the prop of `checked` e.g.
 *
 * <RadioButton name='frequency' value='weekly' checked={ myCheckValue === 'weekly' } label='Weekly' />
 *
 * @class RadioButton
 * @constructor
 * @decorators {Input, InputLabel, InputValidation}
 */
const RadioButton = Input(InputLabel(InputValidation(
class RadioButton extends React.Component {

  static propTypes = {
    reverse: React.PropTypes.bool,
    checked: React.PropTypes.bool
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames (
      'carbon-radio-button',
      this.props.className
    );
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'carbon-radio-button__input';
  }

  /**
   * Returns classes for field help.
   *
   * @method fieldHelpClasses
   * @return {String}
   */
  get fieldHelpClasses() {
    return classNames(
      'carbon-radio-button__help-text', {
        'carbon-radio-button__help-text--reverse': this.props.reverse,
        'carbon-radio-button__help-text--inline': this.props.fieldHelpInline
      }
    );
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * radiobutton specific props.
   *
   * @method inputProps
   * @return {Object} Props to be applied to the input
   */
  get inputProps() {
    let { ...props } = validProps(this);
    props.className = this.inputClasses;
    props.type = "radio";
    return props;
  }

  /**
   * Return the svg image for the radiobutton
   * Amended the svg contsruction to account for an issue in React
   * @return {Object} JSX svg
   */
  get radiobuttonSprite() {
    let svg = '';

    svg += '<svg width="15" height="15" viewBox="0 0 15 15">';
    svg += '  <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">';
    svg += '    <g transform="translate(-69.000000, -293.000000)">';
    svg += '      <g transform="translate(69.000000, 268.000000)">';
    svg += '        <g transform="translate(0.000000, 25.000000)">';
    svg += '          <circle class="radio-button-fill" fill="#FFFFFF" cx="7.5" cy="7.5" r="7.5"></circle>';
    svg += '          <path class="radio-button-outline" d="M7.5,15 C11.6421356,15 15,11.6421356 15,';
    svg += '            7.5 C15,3.35786438 11.6421356,0 7.5,0 C3.35786438,0 0,3.35786438 0,7.5 C0,';
    svg += '            11.6421356 3.35786438,15 7.5,15 Z M7.5,14 C11.0898509,14 14,11.0898509 14,';
    svg += '            7.5 C14,3.91014913 11.0898509,1 7.5,1 C3.91014913,1 1,3.91014913 1,7.5 C1,';
    svg += '            11.0898509 3.91014913,14 7.5,14 Z" fill="#AFAFAF"></path>';
    svg += '          <circle fill="#FFFFFF" cx="7.5" cy="7.5" r="3.5" class="radio-button-check"></circle>';
    svg += '        </g>';
    svg += '      </g>';
    svg += '    </g>';
    svg += '  </g>';
    svg += '</svg>';

    return svg;
  }

  /**
   * Extends the input content to include the radiobutton sprite
   *
   * @method additionalInputContent
   * @return {Object} JSX additional content inline with input
   */
  get additionalInputContent() {
    return <div className="carbon-radio-button__sprite" dangerouslySetInnerHTML={{ __html: this.radiobuttonSprite }}></div>;
  }

  /**
   * Renders the component with props.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let labelLeft, fieldHelpLeft,
        labelRight = this.labelHTML,
        fieldHelpRight = this.fieldHelpHTML;

    if (this.props.reverse) {
      labelLeft = this.labelHTML;
      labelRight = null;

      if (this.props.fieldHelpInline) {
        fieldHelpLeft = this.fieldHelpHTML;
        fieldHelpRight = null;
      }
    }

    return(
      <div className={ this.mainClasses } { ...tagComponent('radio-button', this.props) }>
        { labelLeft }
        { fieldHelpLeft }
        { this.inputHTML }
        { labelRight }
        { fieldHelpRight }
        { this.validationHTML }
      </div>
    );
  }
}
)));

export default RadioButton;
