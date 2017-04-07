import React from 'react';
import classNames from 'classnames';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import I18n from 'i18n-js';
import { validProps } from '../../utils/ether';
import { tagComponent } from 'utils/helpers/tags';

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
     * Allows the Textareas Height to change based on user input
     * Width of the textarea will remain static
     *
     * @property expandable
     * @type {Boolean}
     * @default false
     */
    expandable: React.PropTypes.bool,

    /**
     * Character limit of the textarea
     *
     * @property characterLimit
     * @type {String}
     */
    characterLimit: React.PropTypes.string,

    /**
     * Stop the user typing over the characterLimit
     *
     * @property enforceCharacterLimit
     * @type {Boolean}
     * @default true
     */
    enforceCharacterLimit: React.PropTypes.bool
  }

  static defaultProps = {
    expandable: false,
    enforceCharacterLimit: true
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
    let textarea = this._input;

    if (textarea.scrollHeight > this.minHeight) {
      // Reset height to zero - IE specific
      textarea.style.height = '0px';
      // Set the height so all content is shown
      textarea.style.height = Math.max(textarea.scrollHeight, this.minHeight) + 'px';
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
    return classNames (
      'carbon-textarea__input',
      { 'carbon-textarea__input--disable-scroll': this.props.expandable }
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
    if (this.props.characterLimit) {
      return (
        <div className='carbon-textarea__character-limit' data-element='character-limit'>
          { I18n.t('textarea.limit.prefix', { defaultValue: 'You have used ' } ) }
          <span className='carbon-textarea__limit-used'>
            { I18n.toNumber(calculateCharacterCount(this.props.value), this.i18nNumberOpts) }
          </span>
          { I18n.t('textarea.limit.middle', { defaultValue: ' of ' } ) }
          <span className='carbon-textarea__limit-max'>
            { I18n.toNumber(this.props.characterLimit, this.i18nNumberOpts) }
          </span>
          { I18n.t('textarea.limit.suffix', { defaultValue: ' characters' } ) }
        </div>
      );
    }
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

let calculateCharacterCount = (value) => {
  if (!value) { return 0; }

  let limitUsed = value.length.toString(),
      numberOfLineBreaks = (value.match(/\n/g) || []).length;
  return parseInt(limitUsed) + numberOfLineBreaks;
};

export default Textarea;
