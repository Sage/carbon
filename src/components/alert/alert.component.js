import Dialog from '../dialog';

class Alert extends Dialog {
  constructor(props) {
    super(props);
    // focusDialog is called via setTimeout in onDialogBlur,
    // so it needs binding to this
    // From the React docs: "Generally, if you refer to a method without () after
    // it, such as onClick={this.handleClick}, you should bind that method."
    this.focusDialog = this.focusDialog.bind(this);
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

Alert.defaultProps = {
  ...Dialog.defaultProps,
  role: 'alertdialog',
  size: 'extra-small'
};

export default Alert;
