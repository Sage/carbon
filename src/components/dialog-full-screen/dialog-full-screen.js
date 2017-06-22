import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import Modal from './../modal';
import Heading from './../heading';
import Browser from './../../utils/helpers/browser';

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
   * A lifecycle method that is called after render.
   *
   * @method componentDidMount
   */
  componentDidMount() {
    if (this.props.open) {
      Browser.setBodyScroll(false);
    }
  }

  /**
   * A lifecycle method that is called after re-render.
   *
   * @method componentDidUpdate
   */
  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      Browser.setBodyScroll(!this.props.open);
    }
  }

  /**
   * Returns classes for the dialog.
   *
   * @return {String} dialog className
   */
  get dialogClasses() {
    return 'carbon-dialog-full-screen__dialog';
  }

  /**
   * Returns main classes for the component combined with
   * Dialog main classes.
   *
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      this.props.className,
      'carbon-dialog-full-screen'
    );
  }

  componentTags(props) {
    return {
      'data-component': 'dialog-full-screen',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  /**
   * Returns HTML and text for the dialog title.
   *
   * @method dialogTitle
   * @return {String} title to display
   */
  get dialogTitle() {
    if (this.props.title) {
      return (<Heading title={ this.props.title } />);
    }

    return null;
  }

  /**
   * Returns the computed HTML for the dialog.
   * @override
   *
   * @return {Object} JSX for dialog
   */
  get modalHTML() {
    return (
      <div
        ref={ (d) => { this._dialog = d; } }
        className={ this.dialogClasses }
        { ...this.componentTags(this.props) }
      >
        <Icon
          className='carbon-dialog-full-screen__close'
          data-element='close'
          onClick={ this.props.onCancel }
          type='close'
        />

        <div className='carbon-dialog-full-screen__content' data-element='content'>
          { this.dialogTitle }
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default DialogFullScreen;
