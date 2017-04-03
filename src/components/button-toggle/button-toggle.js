import React from 'react';
import classNames from 'classnames';
import Icon from 'components/icon';
import css from 'utils/css';
import Input from 'utils/decorators/input';
import { validProps } from 'utils/ether';
import { tagComponent } from '../../utils/helpers/tags';


const ButtonToggle = Input(
class ButtonToggle extends React.Component {
  static propTypes = {
    /**
     * Which buttonIcon the button should render.
     *
     * @property buttonIcon
     * @type {String}
     */
    buttonIcon: React.PropTypes.string,

    /**
     * Sets the size of the buttonIcon (eg. large)
     *
     * @property buttonIconSize
     * @type {String}
     */
    buttonIconSize: React.PropTypes.string,

    /**
     * Defines the name for the input
     *
     * @property name
     * @type {String}
     */
    name: React.PropTypes.string,

    /**
     * The value for the given button.
     *
     * @property value
     * @type {String}
     */
    value: React.PropTypes.string,

    /**
     * A required prop. This is what the button will display.
     *
     * @property children
     * @type {Multiple}
     */
    children: React.PropTypes.node.isRequired
  }

  static safeProps = ['name']

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {void}
   */
  get mainClasses() {
    return 'carbon-button-toggle';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return classNames('carbon-button-toggle__input', css.hidden);
  }

  /**
   * Returns the markup for the buttonIcon.
   *
   * @method buttonIcon
   * @return {Object} JSX
   */
  get buttonIcon() {
    if (!this.props.buttonIcon) { return null; }

    let classes = classNames('carbon-button-toggle__button-icon', {
      ['carbon-button-toggle__button-icon--large']: this.props.buttonIconSize === 'large'
    });

    return (
      <div className={ classes } data-element='icon'>
        <Icon type={ this.props.buttonIcon } />
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
    let { ...props } = validProps(this);
    delete props.children;
    props.className = this.inputClasses;
    props.type = 'radio';
    if (!props.id) {
      props.id = this._guid;
    }
    return props;
  }

  /**
   * Returns additional content to sit inline with the input.
   *
   * @method additionalInputContent
   * @return {Object} JSX
   */
  get additionalInputContent() {
    let classes = classNames('carbon-button-toggle__label', {
      ['carbon-button-toggle__label--disabled']: this.props.disabled
    });

    return (
      <label htmlFor={ this.inputProps.id } className={ classes } data-element='label'>
        { this.buttonIcon }
        { this.props.children }
      </label>
    );
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('button-toggle', this.props) }>
        { this.inputHTML }
      </div>
    );
  }
}
);

export default ButtonToggle;
