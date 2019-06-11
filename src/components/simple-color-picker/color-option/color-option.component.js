import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { trim, startsWith } from 'lodash';

import Input from '../../../utils/decorators/input';
import tagComponent from '../../../utils/helpers/tags';
import StyledColorOption from './color-option.style';
import StyledColorSampleBox from './color-sample-box.style';
import StyledTickIcon from './tick-icon.style';

/** A single square with a color, implemented as a radio button. */
const ColorOption = Input(
  class ColorOption extends React.Component {
    static propTypes = {
      /** the value of the color that is represented by this ColorOption */
      color: PropTypes.string,

      /** the input name */
      name: PropTypes.string,

      /** called when the user selects or deselects this color option */
      onChange: PropTypes.func,

      /** determines if this color option is selected or unselected */
      checked: PropTypes.bool,

      /** Custom className */
      className: PropTypes.string
    };

    static defaultProps = {
      checked: false,
      onChange: null
    };

    /** The props used by the Input decorator when creating the input element. */
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

    /** Uses the inputClasses method provided by the decorator to add additional classes. */
    get inputClasses() {
      return 'carbon-color-option__radio-button-input';
    }

    get mainClasses() {
      return classNames(
        // DONE
        // 'carbon-color-option',
        this.props.className
      );
    }

    get _colorSampleClasses() {
      const color = trim(this.props.color, '#'); // z loadasha - obcina ze stringa wskazany znak
      return classNames(
        // 'carbon-color-option__color-sample',
        `carbon-color-option__color-sample--${color}`
      );
    }

    get _tickedIcon() {
      return <StyledTickIcon type='tick' />;
    }

    get _colorSampleStyle() {
      return startsWith(this.props.color, '#') ? { backgroundColor: this.props.color } : {}; // sprawdza czy sie string zaczyna # i jak tak to ustawia kolor tła
    }

    get colorSampleBox() {
      return (
        <StyledColorSampleBox
          color={ this.props.color }
          className={ this._colorSampleClasses }
          style={ this._colorSampleStyle }
        >
          {this._tickedIcon}
        </StyledColorSampleBox>
      );
    }

    render() {
      return (
        <StyledColorOption className={ this.mainClasses } { ...tagComponent('color-option', this.props) }>
          {this.inputHTML}
        </StyledColorOption>
      );
    }
  }
);

export default ColorOption;
