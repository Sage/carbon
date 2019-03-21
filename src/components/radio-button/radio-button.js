import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../../utils/decorators/input';
import InputLabel from '../../utils/decorators/input-label';
import InputValidation from '../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './radio-button.scss';

/**
 *
 * @class RadioButton
 * @constructor
 * @decorators {Input, InputLabel, InputValidation}
 */
const RadioButton = Input(InputLabel(InputValidation(
  class RadioButton extends React.Component {
    static propTypes = {
      /**
       * Classes to apply to the component.
       */
      className: PropTypes.string,

      /**
       * Displays fieldHelp inline with the checkbox/radio button.
       *
       */
      fieldHelpInline: PropTypes.bool
    };

    static defaultProps = {
      fieldHelpInline: false
    };

    /**
     * Uses the mainClasses method provided by the decorator to add additional classes.
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get mainClasses() {
      return classNames(
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
      return classNames('carbon-radio-button__help-text', {
        'carbon-radio-button__help-text--inline': this.props.fieldHelpInline
      });
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * radiobutton specific props.
     *
     * @method inputProps
     * @return {Object} Props to be applied to the input
     */
    get inputProps() {
      const { ...props } = validProps(this);
      props.className = this.inputClasses;
      props.type = 'radio';
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
      return (
        <div
          className='carbon-radio-button__sprite'
          dangerouslySetInnerHTML={ { __html: this.radiobuttonSprite } } // eslint-disable-line react/no-danger
        />
      );
    }

    /**
     * Renders the component with props.
     *
     * @method render
     * @return {Object} JSX
     */
    render() {
      return (
        <div className={ this.mainClasses } { ...tagComponent('radio-button', this.props) }>
          { this.inputHTML }
          { this.labelHTML }
          { this.fieldHelpHTML }
          { this.validationHTML }
        </div>
      );
    }
  }
)));

export default RadioButton;
