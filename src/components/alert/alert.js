import classNames from 'classnames';
import { assign } from 'lodash';
import Dialog from '../dialog';

/**
 * A Alert widget.
 *
 * == How to use a Alert in a component:
 *
 * In your file
 *
 *   import Alert from 'carbon/lib/components/alert';
 *
 * To render a Alert:
 *
 *   <Alert onCancel={ customEventHandler } open={ false }/>
 *
 * The component rendering the Alert must pass down a prop of 'open' in order to open the alert.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Alert
 * @constructor
 */
class Alert extends Dialog {

  constructor(props) {
    super(props);
  }

  static defaultProps = assign({}, Dialog.defaultProps, {
    role: 'alertdialog',
    size: 'extra-small'
  })

  /**
   * Returns classes title for the confirm, combines with dialog class names.
   *
   * @method dialogTitleClasses
   */
  get dialogTitleClasses() {
    return classNames(
      super.dialogTitleClasses,
      'carbon-alert__title'
    );
  }

  /**
   * Returns classes for the alert, combines with dialog class names..
   *
   * @method dialogClasses
   */
  get dialogClasses() {
    return classNames(
      super.dialogClasses,
      'carbon-alert__alert'
    );
  }

  componentTags(props) {
    return {
      'data-component': 'alert',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  /**
   * Handles keyboard focus leaving the dialog
   * element.
   *
   * Assumes that, if no close icon is displayed,
   * no other element can receive keyboard focus.
   * Therefore focus should remain on the dialog
   * element while it is open.
   *
   * @override
   * @return {Void}
   */
  onDialogBlur(ev) {
    if (!this.props.showCloseIcon) {
      ev.preventDefault();
      // Firefox loses focus unless we wrap the call to
      // this.focusDialog in setTimeout
      setTimeout(this.focusDialog, 0);
    }
  }
}

export default Alert;
