import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import I18n from 'i18n-js';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';

/**
 * A textarea widget.
 *
 * == How to use a Textarea in a component:
 *
 * In your file:
 *
 *   import Textarea from 'carbon/lib/components/textarea';
 *
 * To render a Textarea:
 *
 *   <Textarea name='myTextarea' />
 *
 * @class Textarea
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Textarea = Input(InputLabel(InputValidation(
class Textarea extends React.Component {


  // Minimum height of the textarea
  minHeight = 0;

  static propTypes = {
    /**
     * Character limit of the textarea
     *
     * @property characterLimit
     * @type {String}
     */
    characterLimit: PropTypes.string,

    /**
     * The visible width of the text control, in average character widths.
     *
     * @property cols
     * @type {Integer}
     */
    cols: PropTypes.integer,

    /**
     * Stop the user typing over the characterLimit
     *
     * @property enforceCharacterLimit
     * @type {Boolean}
     * @default true
     */
    enforceCharacterLimit: PropTypes.bool,

    /**
     * Allows the Textareas Height to change based on user input
     * Width of the textarea will remain static
     *
     * @property expandable
     * @type {Boolean}
     * @default false
     */
    expandable: PropTypes.bool,

    /**
     * The number of visible text lines for the control.
     *
     * @property rows
     * @type {Integer}
     */
    rows: PropTypes.integer,

    /**
     * The value of the Textarea
     *
     * @property value
     * @type {String}
     */
    value: PropTypes.string,

    /**
     * Whether to display the character count message in red
     *
     * @property warnOverLimit
     * @type {Boolean}
     * @default false
     */
    warnOverLimit: PropTypes.bool
  }

  static defaultProps = {
    expandable: false,
    enforceCharacterLimit: true,
    warnOverLimit: false
  }

  /**
   * A lifecycle method that is called after initial render.
   * Allows access to refs and DOM to set expandable variables
   *
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (this.props.expandable) {
      window.addEventListener('resize', this.expandTextarea);
      // Set the min height to the initially rendered height.
      // Without minHeight expandable textareas will only have
      // one line when no content is present.
      this.minHeight = this._input.clientHeight;

      this.expandTextarea();
    }
  }

  /**
   * A lifecycle method that is called before the component is
   * unmounted from the DOM
   *
   * @method componentWillUnmount
   * @return {void}
   */
  componentWillUnmount() {
    if (this.props.expandable) {
      window.removeEventListener('resize', this.expandTextarea);
    }
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   * Resizes the textarea based on update if it can expand
   *
   * @method componentDidUpdate
   * @return {void}
   */
  componentDidUpdate() {
    if (this.props.expandable) {
      this.expandTextarea();
    }
  }

  /**
   * Expands the textarea based on the current input
   * so that width is fixed but height changes to show
   * all content.
   *
   * @method expandTextarea
   * @return {void}
   */
  expandTextarea = () => {
    const textarea = this._input;

    if (textarea.scrollHeight > this.minHeight) {
      // Reset height to zero - IE specific
      textarea.style.height = '0px';
      // Set the height so all content is shown
      textarea.style.height = `${Math.max(textarea.scrollHeight, this.minHeight)}px`;
    }
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes
   *
   * @method mainClasses
   * @return {String} main className
   */
  get mainClasses() {
    return 'carbon-textarea';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return classNames(
      'carbon-textarea__input',
      { 'carbon-textarea__input--disable-scroll': this.props.expandable }
    );
  }

  /**
   * Uses the textAreaClasses method to add additional classes.
   *
   * @method textAreaClasses
   * @return {String} textarea className
   */
  get textAreaClasses() {
    return classNames(
      'carbon-textarea__character-limit',
      { 'over-limit': this.props.warnOverLimit && this.overLimit }
    );
  }

  /**
   * Returns if the character count exceeds the max
   *
   * @method overLimit
   * @return {Boolean}
   */
  get overLimit() {
    const value = this.props.value || '';
    return value.length > parseInt(this.props.characterLimit, 10);
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
    props.className = this.inputClasses;
    props.rows = this.props.rows;
    props.cols = this.props.cols;

    if (this.props.characterLimit && this.props.enforceCharacterLimit) {
      props.maxLength = this.props.characterLimit;
    }

    return props;
  }

  /**
   * I18n options for character count number
   *
   * @method i18nNumberOpts
   * @return {Object}
   */
  get i18nNumberOpts() {
    return { precision: 0 };
  }

  /**
   * Defines a custom input type for this component.
   *
   * @method inputType
   * @return {String} the input type
   */
  get inputType() {
    return 'textarea';
  }

  /**
   * Returns character count jsx if limit is set
   *
   * @method characterCount
   * @return {JSX}
   */
  get characterCount() {
    const value = this.props.value || '';

    if (!this.props.characterLimit) { return null; }
    return (
      <div className={ this.textAreaClasses } data-element='character-limit'>
        { I18n.t('textarea.limit.prefix', { defaultValue: 'You have used ' }) }
        <span className='carbon-textarea__limit-used'>
          { I18n.toNumber(value.length, this.i18nNumberOpts) }
        </span>
        { I18n.t('textarea.limit.middle', { defaultValue: ' of ' }) }
        <span className='carbon-textarea__limit-max'>
          { I18n.toNumber(this.props.characterLimit, this.i18nNumberOpts) }
        </span>
        { I18n.t('textarea.limit.suffix', { defaultValue: ' characters' }) }
      </div>
    );
  }


  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('textarea', this.props) }>

        { this.labelHTML }
        { this.inputHTML }
        { this.validationHTML }
        { this.fieldHelpHTML }
        { this.characterCount }

      </div>
    );
  }
}
)));

export default Textarea;
