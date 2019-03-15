import classNames from 'classnames';
import { assign } from 'lodash';
import Dialog from '../dialog';

class Alert extends Dialog {
  static defaultProps = assign({}, Dialog.defaultProps, {
    role: 'alertdialog',
    size: 'extra-small'
  })

  constructor(props) {
    super(props);
    // focusDialog is called via setTimeout in onDialogBlur,
    // so it needs binding to this
    // From the React docs: "Generally, if you refer to a method without () after
    // it, such as onClick={this.handleClick}, you should bind that method."
    this.focusDialog = this.focusDialog.bind(this);
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
      setTimeout(this.focusDialog);
    }
  }
}

export default Alert;
