import React from 'react';
import Dialog from '../dialog';
import Button from '../button';
import I18n from "i18n-js";
import classNames from 'classnames';

/**
 * A Confirm widget.
 *
 * == How to use a Confirm in a component:
 *
 * In your file
 *
 *   import Confirm from 'carbon/lib/components/confirm';
 *
 * To render a Confirm:
 *
 *   <Confirm
 *      title='Are you sure?"
 *      onConfirm={ customConfirmHandler }
 *      onCancel={ customCancelHandler }
 *      open={ false }
 *    This is the content message
 *   </Confirm>
 *
 * The component rendering the Confirm must pass down a prop of 'open={ true }' to open the confirm dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event via the 'no' button
 *
 * You need to provide a custom confirm event handler to handle a close event via the 'yes' button
 *
 * @class Confirm
 * @constructor
 */
class Confirm extends Dialog {

  static propTypes = {

    /**
     * A custom event handler when a confirmation takes place
     *
     * @property onConfirm
     * @type {Function}
     */
    onConfirm: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    size: 'xsmall'
  }

  constructor() {
    super();
  }

  /**
   * Returns main classes for the component combined with
   * dialog main classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      super.mainClasses,
      'ui-confirm'
    );
  }

  /**
   * Returns classes title for the confirm, combines with dialog class names.
   *
   * @method dialogTitleClasses
   */
  get dialogTitleClasses() {
    return classNames(
      super.dialogTitleClasses,
      'ui-confirm__title',
    );
  }

  /**
   * Returns classes for the confirm, combines with dialog class names.
   *
   * @method dialogClasses
   */
  get dialogClasses() {
    return classNames(
      super.dialogClasses,
      'ui-confirm__confirm'
    );
  }

  /**
   * Get the yes and no buttons for the confirm dialog
   *
   * @method confirmButtons
   * @return {Object} JSX yes and no buttons
   */
  get confirmButtons() {
    return (
      <div className='ui-confirm__buttons' >
        <div className='ui-confirm__button ui-confirm__no'>
          <Button as='secondary' onClick={ this.props.onCancel }>{ cancelText() }</Button>
        </div>

        <div className='ui-confirm__button ui-confirm__yes'>
          <Button as='primary' onClick={ this.props.onConfirm }>{ confirmText() }</Button>
        </div>
      </div>
    );
  }

  /**
   * Returns HTML and text for the confirm body. Appends the two
   * confirm buttons to super dialogHTML
   *
   * @method dialogTitle
   */
  get modalHTML() {
    let dialog = super.modalHTML;
    dialog.props.children.push(this.confirmButtons);
    return dialog;
  }
}

function confirmText() {
  return I18n.t('confirm.yes', { defaultValue: 'Yes' });
}

function cancelText() {
  return I18n.t('confirm.no', { defaultValue: 'No' });
}

export default Confirm;
