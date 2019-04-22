import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { InputPresentation } from '../input';
import FormField from '../form-field';
import CharacterCount from './character-count';
import TextareaInput from './textarea-input.component';

const i18nNumberOpts = { precision: 0 };

class Textarea extends React.Component {
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
      this.minHeight = this._input.clientHeight;

      this.expandTextarea();
    }
  }

  componentWillUnmount() {
    if (this.props.expandable) {
      window.removeEventListener('resize', this.expandTextarea);
    }
  }

  componentDidUpdate() {
    const { expandable } = this.props;

    if (expandable) {
      this.expandTextarea();
    }
  }

  expandTextarea = () => {
    const textarea = this._input;

    if (textarea.scrollHeight > this.minHeight) {
      // Reset height to zero - IE specific
      textarea.style.height = '0px';
      // Set the height so all content is shown
      textarea.style.height = `${Math.max(textarea.scrollHeight, this.minHeight)}px`;
    }
  }

  get overLimit() {
    const value = this.props.value || '';
    return value.length > parseInt(this.props.characterLimit, 10);
  }

  get characterCount() {
    const value = this.props.value || '';
    const { characterLimit, warnOverLimit } = this.props;

    if (!characterLimit) { return null; }

    return (
      <CharacterCount
        isOverLimit={ this.overLimit && warnOverLimit }
        value={ I18n.toNumber(value.length, i18nNumberOpts) }
        limit={ I18n.toNumber(characterLimit, i18nNumberOpts) }
        data-element='character-limit'
      />
    );
  }

  inputRefCallback = (inputRef) => {
    this._input = inputRef.current;
  }

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
      cols,
      ...props
    } = this.props;

    return (
      <>
        <FormField label={ label } { ...props }>
          <InputPresentation
            type='text'
            size={ size }
            { ...props }
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
              { ...props }
            />
            { children }
          </InputPresentation>
        </FormField>
        {this.characterCount}
      </>
    );
  }
}

Textarea.propTypes = {
  /** Character limit of the textarea */
  characterLimit: PropTypes.string,
  /** Type of the icon that will be rendered next to the input */
  children: PropTypes.node,
  /** The visible width of the text control, in average character widths */
  cols: PropTypes.number,
  /** Adds disabled property */
  disabled: PropTypes.bool,
  /** Stop the user typing over the characterLimit */
  enforceCharacterLimit: PropTypes.bool,
  /** Allows the Textareas Height to change based on user input */
  expandable: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  /** Adds readOnly property */
  readOnly: PropTypes.bool,
  /** The number of visible text lines for the control */
  rows: PropTypes.number,
  /** One of type of size to apply to the textarea */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** The value of the Textarea */
  value: PropTypes.string,
  /** Whether to display the character count message in red */
  warnOverLimit: PropTypes.bool
};

Textarea.defaultProps = {
  disabled: false,
  expandable: false,
  enforceCharacterLimit: true,
  readOnly: false,
  warnOverLimit: false
};

export default Textarea;
