import React from 'react';
import I18n from 'i18n-js';
import classNames from 'classnames';
import { assign } from 'lodash';
import PropTypes from 'prop-types';
import Dialog from '../dialog';
import Button from '../button';
import CSS from '../../utils/css';

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
  static propTypes = assign({}, Dialog.propTypes, {

    /**
     * A custom event handler when a confirmation takes place
     *
     * @property onConfirm
     * @type {Function}
     */
    onConfirm: PropTypes.func.isRequired,

    /**
     * Customise the confirm button label
     *
     * @property onConfirm
     * @type {String}
     */
    confirmLabel: PropTypes.string,

    /**
     * Customise the cancel button label
     *
     * @property onConfirm
     * @type {String}
     */
    cancelLabel: PropTypes.string
  })

  static defaultProps = assign({}, Dialog.defaultProps, {
    size: 'extra-small',
    showCloseIcon: false
  })

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
      'carbon-confirm'
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
      'carbon-confirm__confirm'
    );
  }

  /**
   * Get the yes and no buttons for the confirm dialog
   *
   * @method confirmButtons
   * @return {Object} JSX yes and no buttons
   */
  additionalContent() {
    const classes = `carbon-confirm__buttons ${CSS.clearfix}`;

    return (
      <div key='confirm-buttons' className={ classes }>
        <div className='carbon-confirm__button carbon-confirm__no'>
          <Button
            as='secondary' onClick={ this.props.onCancel }
            data-element='cancel'
          >
            { this.props.cancelLabel || I18n.t('confirm.no', { defaultValue: 'No' }) }
          </Button>
        </div>

        <div className='carbon-confirm__button carbon-confirm__yes'>
          <Button
            as='primary' onClick={ this.props.onConfirm }
            data-element='confirm'
          >
            { this.props.confirmLabel || I18n.t('confirm.yes', { defaultValue: 'Yes' }) }
          </Button>
        </div>
      </div>
    );
  }

  componentTags(props) {
    return {
      'data-component': 'confirm',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }
}

export default Confirm;
