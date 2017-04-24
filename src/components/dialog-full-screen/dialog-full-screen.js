import React from 'react';
import Icon from './../icon';
import Modal from './../modal';
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
class DialogFullScreen extends Modal {

  static defaultProps = {
    open: false,
    enableBackgroundUI: true
  }

  /**
   * Returns classes for the dialog.
   *
   * @method dialogClasses
   * @return {String} dialog className
   */
  get dialogClasses() {
    return 'carbon-dialog-full-screen__dialog';
  }

  /**
   * Returns main classes for the component combined with
   * Dialog main classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      this.props.className,
      'carbon-dialog-full-screen'
    );
  }

  /**
   * Returns the computed HTML for the dialog.
   * @override
   *
   * @method modalHTML
   * @return {Object} JSX for dialog
   */
  get modalHTML() {
    return (
      <div ref={ (d) => this._dialog = d } className={ this.dialogClasses }>
        <div className="carbon-dialog-full-screen__header">
          <h2 className="carbon-dialog-full-screen__title">{ this.props.title }</h2>
          <Icon className="carbon-dialog-full-screen__close" type="close" onClick={ this.props.onCancel } />
        </div>

        <div className='carbon-dialog-full-screen__content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default DialogFullScreen;
