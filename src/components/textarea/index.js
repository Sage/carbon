import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

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
 *   <Textarea name="myTextarea" />
 *
 * @class Textarea
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Textarea = Input(InputLabel(InputValidation(
class Textarea extends React.Component {

  valLength = 0;
  minHeight = 0;

  componentDidMount = () => {
    this.valLength = this.props.value ? this.props.value.length : 0;
    this.minHeight = this.refs.textarea.clientHeight;

    if (this.props.expandable) {
      this.expandTextarea();
    }
  }

  componentDidUpdate = () => {
    if (this.props.expandable) {
      if (this.refs.textarea.value.length !== this.valLength) {
        this.expandTextarea();
      }
    }
  }

  expandTextarea = () => {
    let textarea = this.refs.textarea,
      boxWidth = textarea.boxWidth,
      offWidth = textarea.offsetWidth,
      newLen = textarea.value.length,
      oldLen = this.valLength;

    if (textarea.scrollHeight > this.minHeight) {
      if (newLen < oldLen || offWidth !== boxWidth) {
        textarea.style.height = "0px";
      }

      textarea.style.overflow = "hidden";
      textarea.style.height = Math.max(textarea.scrollHeight, this.minHeight) + "px";
      textarea.boxWidth = offWidth;
      this.valLength = newLen;
    }
  }

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-textarea';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-textarea__input';
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.rows = this.props.rows;
    props.cols = this.props.cols;
    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>

        { this.labelHTML }
        <textarea ref='textarea' { ...this.inputProps } />
        { this.validationHTML }

      </div>
    );
  }
}
)));

export default Textarea;
