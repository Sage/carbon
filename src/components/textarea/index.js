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
    expandable: React.PropTypes.bool
  }

  static defaultProps = {
    expandable: false
  }

  /**
   * A lifecycle method that is called after initial render.
   * Allows access to refs and DOM to set expandable variables
   *
   * @method componentDidMount
   */
  componentDidMount = () => {
    if (this.props.expandable) {
      window.addEventListener('resize', this.expandTextarea);
      // Set the min height to the initially rendered height.
      // Without minHeight expandable textareas will only have
      // one line when no content is present.
      this.minHeight = this.refs.textarea.clientHeight;

      this.expandTextarea();
    }
  }

  /**
   * A lifecycle method that is called before the component is
   * unmounted from the DOM
   *
   * @method componentWillUnmount
   */
  componentWillUnmount = () => {
    if (this.props.expandable) {
      window.removeEventListener('resize', this.expandTextarea);
    }
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   * Resizes the textarea based on update if it can expand
   *
   * @method componentDidUpdate
   */
  componentDidUpdate = () => {
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
   */
  expandTextarea = () => {
    let textarea = this.refs.textarea;

    if (textarea.scrollHeight > this.minHeight) {
      // Reset height to zero - IE specific
      textarea.style.height = "0px";
      // Set the height so all content is shown
      textarea.style.height = Math.max(textarea.scrollHeight, this.minHeight) + "px";
    }
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-textarea';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
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
    props.ref = 'textarea';
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
        <textarea { ...this.inputProps } />
        { this.validationHTML }

      </div>
    );
  }
}
)));

export default Textarea;
