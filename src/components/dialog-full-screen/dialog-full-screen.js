import React from 'react';
import Icon from './../icon';
import Dialog from './../dialog';
import classNames from 'classnames';

/**
 * A DialogFullScreen widget.
 *
 * == How to use a DialogFullScreen in a component:
 *
 * In your file
 *
 *   import DialogFullScreen from 'carbon/lib/components/dialog-full-screen';
 *
 * To render a DialogFullScreen:
 *
 *   <DialogFullScreen onCancel={ customEventHandler } />
 *
 * The component rendering the DialogFullScreen must pass down a prop of 'open' in order to open the dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class DialogFullScreen
 * @constructor
 */
class DialogFullScreen extends Dialog {

  /**
   * A lifecycle method to update the component on initialize
   * @override
   *
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   * @override
   *
   * @method componentDidUpdate
   * @return {void}
   */
  componentDidUpdate() {
    if (this.props.open && !this.listening) {
      this.listening = true;
      window.addEventListener('keyup', this.closeDialog);
    } else if (!this.props.open) {
      this.listening = false;
      window.removeEventListener('keyup', this.closeDialog);
    }
  }

  /**
   * Returns main classes for the component combined with
   * Dialog main classes.
   * @override
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      super.mainClasses,
      'ui-dialog-full-screen'
    );
  }

  /**
   * Returns the computed HTML for the dialog.
   * @override
   *
   * @method dialogHTML
   * @return {Object} JSX for dialog
   */
  get dialogHTML() {
    return (
      <div ref={ (dialog) => this._dialog = dialog } className={ this.dialogClasses }>
        <div className="ui-dialog__header">
          { this.dialogTitle }
          <Icon className="ui-dialog__close" type="close" onClick={ this.props.onCancel } />
        </div>

        <div className='ui-dialog__content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default DialogFullScreen;
