import React from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import OptionsHelper from "../../../utils/helpers/options-helper";
import { InputPresentation } from "../input";
import FormField from "../form-field";
import CharacterCount from "./character-count";
import Input from "../input/input.component";
import { InputBehaviour } from "../../../__internal__/input-behaviour";

import InputIconToggle from "../input-icon-toggle";

import guid from "../../../utils/helpers/guid/guid";
import StyledTextarea from "./textarea.style";

const i18nNumberOpts = { precision: 0 };

class Textarea extends React.Component {
  // Minimum height of the textarea
  minHeight = 0;

  id = this.props.id || guid();

  _input = React.createRef();

  /**
   * A lifecycle method that is called after initial render.
   * Allows access to refs and DOM to set expandable variables
   */
  componentDidMount() {
    if (this.props.expandable) {
      window.addEventListener("resize", this.expandTextarea);
      // Set the min height to the initially rendered height.
      // Without minHeight expandable textareas will only have
      // one line when no content is present.
      this.minHeight = this._input.current.clientHeight;

      this.expandTextarea();
    }
  }

  componentWillUnmount() {
    if (this.props.expandable) {
      window.removeEventListener("resize", this.expandTextarea);
    }
  }

  componentDidUpdate() {
    const { expandable } = this.props;

    if (expandable) {
      this.expandTextarea();
    }
  }

  expandTextarea = () => {
    const textarea = this._input.current;

    if (textarea.scrollHeight > this.minHeight) {
      // Reset height to zero - IE specific
      textarea.style.height = "0px";
      // Set the height so all content is shown
      textarea.style.height = `${Math.max(
        textarea.scrollHeight,
        this.minHeight
      )}px`;
    }
  };

  renderValidation() {
    const {
      disabled,
      readOnly,
      inputIcon,
      size,
      error,
      warning,
      info,
      validationOnLabel,
    } = this.props;
    return (
      <InputIconToggle
        disabled={disabled}
        readOnly={readOnly}
        inputIcon={inputIcon}
        size={size}
        error={error}
        warning={warning}
        info={info}
        useValidationIcon={!validationOnLabel}
      />
    );
  }

  get overLimit() {
    const value = this.props.value || "";
    return value.length > parseInt(this.props.characterLimit, 10);
  }

  get characterCount() {
    const value = this.props.value || "";
    const { characterLimit, warnOverLimit } = this.props;

    if (!characterLimit) {
      return null;
    }

    return (
      <CharacterCount
        isOverLimit={this.overLimit && warnOverLimit}
        value={I18n.toNumber(value.length, i18nNumberOpts)}
        limit={I18n.toNumber(characterLimit, i18nNumberOpts)}
        data-element="character-limit"
      />
    );
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
      labelInline,
      readOnly,
      placeholder,
      rows,
      cols,
      validationOnLabel,
      adaptiveLabelBreakpoint,
      ...props
    } = this.props;

    return (
      <InputBehaviour>
        <StyledTextarea labelInline={labelInline}>
          <FormField
            label={label}
            disabled={disabled}
            id={this.id}
            labelInline={labelInline}
            isRequired={props.required}
            {...props}
            useValidationIcon={validationOnLabel}
            adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
          >
            <InputPresentation
              type="text"
              size={size}
              disabled={disabled}
              readOnly={readOnly}
              {...props}
            >
              <Input
                ref={this._input}
                maxLength={
                  enforceCharacterLimit && characterLimit
                    ? characterLimit
                    : undefined
                }
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                labelInline={labelInline}
                placeholder={disabled ? "" : placeholder}
                rows={rows}
                cols={cols}
                id={this.id}
                as="textarea"
                {...props}
              />
              {children}
              {this.renderValidation()}
            </InputPresentation>
          </FormField>
          {this.characterCount}
        </StyledTextarea>
      </InputBehaviour>
    );
  }
}

Textarea.propTypes = {
  /** id of the input */
  id: PropTypes.string,
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
  /** The content of the label for the input */
  label: PropTypes.string,
  /** When true, label is placed in line with an input */
  labelInline: PropTypes.bool,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Name of the input */
  name: PropTypes.string,
  /** Callback fired when the user types in the Textarea */
  onChange: PropTypes.func,
  /** Placeholder text for the component */
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
  warnOverLimit: PropTypes.bool,
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel: PropTypes.bool,
  /** Icon to display inside of the Textarea */
  inputIcon: PropTypes.string,
  /** Message to be displayed in a Tooltip when the user hovers over the help icon */
  tooltipMessage: PropTypes.string,
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

Textarea.defaultProps = {
  disabled: false,
  expandable: false,
  enforceCharacterLimit: true,
  readOnly: false,
  warnOverLimit: false,
  validationOnLabel: false,
};

export { Textarea as OriginalTextarea };
export default Textarea;
