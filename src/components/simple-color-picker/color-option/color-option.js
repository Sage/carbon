import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { trim, startsWith } from 'lodash';

import Icon from '../../icon';
import Input from '../../../utils/decorators/input';
import tagComponent from '../../../utils/helpers/tags';
import './color-option.scss';

/**
 * A single square with a color, implemented as a radio button.
 */
const ColorOption = Input(
  class ColorOption extends React.Component {
    static propTypes = {
      /**
       * the value of the color that is represented by this ColorOption
       */
      color: PropTypes.string,

      /**
       * the input name
       */
      name: PropTypes.string,

      /**
       * called when the user selects or deselects this color option
       */
      onChange: PropTypes.func,

      /**
       * determines if this color option is selected or unselected
       */
      checked: PropTypes.bool,

      /**
       * Custom className
       */
      className: PropTypes.string
    };

    static defaultProps = {
      checked: false,
      onChange: null
    };

    /**
     * The props used by the Input decorator when creating the input element.
     */
    get inputProps() {
      return {
        className: this.inputClasses,
        onChange: this.props.onChange,
        checked: this.props.checked,
        name: this.props.name,
        type: 'radio',
        value: this.props.color
      };
    }

    get additionalInputContent() {
      return this.colorSampleBox;
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     * @return {String} input className
     */
    get inputClasses() {
      return 'carbon-color-option__radio-button-input';
    }

    get mainClasses() {
      return classNames('carbon-color-option', this.props.className);
    }

    get _colorSampleClasses() {
      const color = trim(this.props.color, '#');
      return classNames('carbon-color-option__color-sample', `carbon-color-option__color-sample--${color}`);
    }

    get _tickedIcon() {
      return <Icon type='tick' className='carbon-color-option__tick' />;
    }

    get _colorSampleStyle() {
      return startsWith(this.props.color, '#') ? { backgroundColor: this.props.color } : {};
    }

    get colorSampleBox() {
      return (
        <div className={ this._colorSampleClasses } style={ this._colorSampleStyle }>
          {this._tickedIcon}
        </div>
      );
    }

    render() {
      return (
        <li className={ this.mainClasses } { ...tagComponent('color-option', this.props) }>
          {this.inputHTML}
        </li>
      );
    }
  }
);

export default ColorOption;
