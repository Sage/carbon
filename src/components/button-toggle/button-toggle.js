import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import css from './../../utils/css';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

const ButtonToggle = Input(InputLabel(InputValidation(
class ButtonToggle extends React.Component {

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {void}
   */
  get mainClasses() {
    return 'ui-button-toggle';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return classNames('ui-button-toggle__input', css.hidden);
  }

  get icon() {
    if (!this.props.icon) { return null; }

    let classes = classNames("ui-button-toggle__icon", {
      ["ui-button-toggle__icon--large"]: this.props.iconSize === "large"
    });

    return (
      <div className={ classes }>
        <Icon type={ this.props.icon } />
      </div>
    );
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   * @return {Object} props for the input
   */
  get inputProps() {
    let { children, ...props } = this.props;
    props.className = this.inputClasses;
    props.type = "radio";
    return props;
  }

  get additionalInputContent() {
    let classes = classNames("ui-button-toggle__label", {
      ["ui-button-toggle__label--disabled"]: this.props.disabled
    });

    return (
      <label htmlFor={ this.inputProps.id } className={ classes }>
        { this.icon }
        { this.props.children }
      </label>
    );
  }

  render() {
    return (
      <div className={ this.mainClasses }>
        { this.inputHTML }
      </div>
    );
  }
}
)));

export default ButtonToggle;
