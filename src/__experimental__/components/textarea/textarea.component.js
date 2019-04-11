import React from 'react';
import PropTypes from 'prop-types';
import { validProps } from '../../../utils/ether';
import { InputPresentation } from '../input';
import FormField from '../form-field';
import TextareaStyle from './textarea.style';
import StyledTextareaWrapper from './textarea-wrapper.style';
import CharacterCount from './character-count';
import TextareaInput from './textarea-input.component';


class Textarea extends React.Component {
  static propTypes = {
    /**
     * Character limit of the textarea
     */
    characterLimit: PropTypes.string,

    /**
     * Type of the icon that will be rendered next to the input
     * */
    children: PropTypes.node,

    /**
     * The visible width of the text control, in average character widths
     */
    cols: PropTypes.number,

    disabled: PropTypes.bool,

    /**
     * Stop the user typing over the characterLimit
     */
    enforceCharacterLimit: PropTypes.bool,

    /**
     * Allows the Textareas Height to change based on user input
     * Width of the textarea will remain static
     */
    expandable: PropTypes.bool,

    /**
     * Label
     * */
    label: PropTypes.string,

    onChange: PropTypes.func,

    placeholder: PropTypes.string,

    readOnly: PropTypes.bool,

    /**
     * The number of visible text lines for the control
     */
    rows: PropTypes.number,

    /**
     * One of type of size to apply to the textarea
     * */
    size: PropTypes.oneOf(['small', 'medium', 'large']),

    /**
     * The value of the Textarea
     */
    value: PropTypes.string,

    /**
     * Whether to display the character count message in red
     */
    warnOverLimit: PropTypes.bool
  }

  static defaultProps = {
    disabled: false,
    expandable: false,
    enforceCharacterLimit: true,
    readOnly: false,
    warnOverLimit: false
  }

   static state = {
     _input: undefined
   }

  // Minimum height of the textarea
  minHeight = 0;

  /**
   * A lifecycle method that is called after initial render.
   * Allows access to refs and DOM to set expandable variables
   */
  componentDidMount() {
    if (this.props.expandable) {
      window.addEventListener('resize', this.expandTextarea);
      // Set the min height to the initially rendered height.
      // Without minHeight expandable textareas will only have
      // one line when no content is present.
      this.minHeight = this.state._input.clientHeight;

      this.expandTextarea();
    }
  }

  /**
   * A lifecycle method that is called before the component is
   * unmounted from the DOM
   */
  componentWillUnmount() {
    if (this.props.expandable) {
      window.removeEventListener('resize', this.expandTextarea);
    }
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   * Resizes the textarea based on update if it can expand
   */
  componentDidUpdate() {
    const { expandable } = this.props;

    if (expandable) {
      this.expandTextarea();
    }
  }

  /**
   * Expands the textarea based on the current input
   * so that width is fixed but height changes to show
   * all content.
   */
  expandTextarea = () => {
    const textarea = this.state._input;

    if (textarea.scrollHeight > this.minHeight) {
      // Reset height to zero - IE specific
      textarea.style.height = '0px';
      // Set the height so all content is shown
      textarea.style.height = `${Math.max(textarea.scrollHeight, this.minHeight)}px`;
    }
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes
   */
  get mainClasses() {
    return 'carbon-textarea';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   */
  get inputClasses() {
    // return classNames(
    //   'carbon-textarea__input',
    //   { 'carbon-textarea__input--disable-scroll': this.props.expandable }
    // );
    return '';
  }

  /**
   * Uses the textAreaClasses method to add additional classes.
   */
  get textAreaClasses() {
    // return classNames(
    //   'carbon-textarea__character-limit',
    //   { 'over-limit': this.props.warnOverLimit && this.overLimit }
    // );
    return '';
  }

  /**
   * Returns if the character count exceeds the max
   */
  get overLimit() {
    const value = this.props.value || '';
    return value.length > parseInt(this.props.characterLimit, 10);
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
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
   */
  get i18nNumberOpts() {
    return { precision: 0 };
  }

  /**
   * Defines a custom input type for this component.
   */
  get inputType() {
    return 'textarea';
  }

  /**
   * Returns character count jsx if limit is set
   */
  get characterCount() {
    const value = this.props.value || '';
    const { characterLimit, warnOverLimit } = this.props;

    if (!characterLimit) { return null; }
    return (
      <CharacterCount
        isOverLimit={ this.overLimit && warnOverLimit }
        value={ value.length }
        limit={ characterLimit }
      />
    );
  }

  inputRefCallback = (inputRef) => {
    this.setState({ _input: inputRef.current });
  }


  /**
   * Renders the component.
   */
  render() {
    const {
      label,
      size,
      children,
      characterLimit,
      enforceCharacterLimit,
      onChange,
      disabled,
      readOnly,
      placeholder,
      rows,
      cols
    } = this.props;

    return (
      <FormField label={ label } { ...this.props }>
        <StyledTextareaWrapper>
          <InputPresentation
            type='text'
            size={ size }
            { ...this.props }
          >
            <TextareaInput
              inputRef={ this.inputRefCallback }
              maxLength={ enforceCharacterLimit && characterLimit ? characterLimit : undefined }
              onChange={ onChange }
              disabled={ disabled }
              readOnly={ readOnly }
              placeholder={ placeholder }
              rows={ rows }
              cols={ cols }
            />
            { children }
          </InputPresentation>
          {this.characterCount}
        </StyledTextareaWrapper>
      </FormField>
    );
  }
}

export default Textarea;
