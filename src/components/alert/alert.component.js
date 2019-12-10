import Dialog from '../dialog';

class Alert extends Dialog {
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
}

Alert.defaultProps = {
  ...Dialog.defaultProps,
  role: 'alertdialog',
  size: 'extra-small'
};

export default Alert;
