import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Modal from '../modal';
import Heading from '../heading';
import AppWrapper from '../app-wrapper';
import FullScreenHeading from './full-screen-heading';
import Browser from '../../utils/helpers/browser';

const DIALOG_OPEN_HTML_CLASS = 'carbon-dialog-full-screen--open';

/**
 * A DialogFullScreen widget.
 *
 * == How to use a DialogFullScreen in a component:
 *
 * In your file
 *
 *   import DialogFullScreen from 'carbon-react/lib/components/dialog-full-screen';
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
  constructor(props) {
    super(props);

    /**
     * Caches a reference to the document.
     */
    this.document = Browser.getDocument();
  }

  static defaultProps = {
    open: false,
    enableBackgroundUI: true
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
        { this.dialogTitle() }

        <div className='carbon-dialog-full-screen__content' data-element='content'>
          <AppWrapper>
            { this.props.children }
          </AppWrapper>
        </div>
      </div>
    );
  }

  /**
   * Overrides the original function to disable the document's scroll.
   */
  get onOpening() {
    return this.document.documentElement.classList.add(DIALOG_OPEN_HTML_CLASS);
  }

  /**
   * Overrides the original function to enable the document's scroll.
   */
  get onClosing() {
    return this.document.documentElement.classList.remove(DIALOG_OPEN_HTML_CLASS);
  }

  /**
   * Returns HTML and text for the dialog title.
   *
   * @method dialogTitle
   * @return {Object} title to display
   */
  dialogTitle = () => {
    let { title } = this.props;

    if (typeof title === 'string') {
      title = (
        <Heading
          title={ title }
          titleId='carbon-dialog-title'
          subheader={ this.props.subtitle }
          subtitleId='carbon-dialog-subtitle'
        />
      );
    }

    return (
      <FullScreenHeading>
        <Icon
          className='carbon-dialog-full-screen__close'
          data-element='close'
          onClick={ this.props.onCancel }
          type='close'
        />

        { title }
      </FullScreenHeading>
    );
  }
}

export default DialogFullScreen;
