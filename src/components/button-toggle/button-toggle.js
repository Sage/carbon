import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './../icon';
import Input from './../../utils/decorators/input';
import { validProps } from './../../utils/ether';
import tagComponent from '../../utils/helpers/tags';


const ButtonToggle = Input(class ButtonToggle extends React.Component {
  static propTypes = {
    /**
     * Which buttonIcon the button should render.
     *
     * @property buttonIcon
     * @type {String}
     */
    buttonIcon: PropTypes.string,

    /**
     * Sets the size of the buttonIcon (eg. large)
     *
     * @property buttonIconSize
     * @type {String}
     */
    buttonIconSize: PropTypes.string,

    /**
     * Sets the size of the button (eg. large)
     *
     * @property size
     * @type {String}
     */
    size: PropTypes.string,

    /**
     * remove spacing from inbetween buttons
     *
     * @property grouped
     * @type {boolean}
     */
    grouped: PropTypes.bool,

    /**
     * Disable all user interaction.
     *
     * @property disabled
     * @type {boolean}
     */
    disabled: PropTypes.bool,

    /**
     * A required prop. This is what the button will display.
     *
     * @property children
     * @type {Multiple}
     */
    children: PropTypes.node.isRequired
  }

  static safeProps = ['name']

  static defaultProps = {
    size: 'large'
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {void}
   */
  get mainClasses() {
    return classNames(
      'carbon-button-toggle',
      `carbon-button-toggle--${this.props.size}`,
      { 'carbon-button-toggle--grouped': this.props.grouped }
    );
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return classNames('carbon-button-toggle__input');
  }

  /**
   * Returns the markup for the buttonIcon.
   *
   * @method buttonIcon
   * @return {Object} JSX
   */
  get buttonIcon() {
    if (!this.props.buttonIcon) { return null; }

    const classes = classNames('carbon-button-toggle__button-icon', {
      'carbon-button-toggle__button-icon--large': this.props.buttonIconSize === 'large'
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
    const { ...props } = validProps(this);
    delete props.children;
    props.className = 'carbon-button-toggle__input';
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
    const classes = classNames('carbon-button-toggle__label', {
      'carbon-button-toggle__label--disabled': this.props.disabled
    });

    return (
      <label
        htmlFor={ this.inputProps.id } className={ classes }
        data-element='label'
      >
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
});

export default ButtonToggle;
