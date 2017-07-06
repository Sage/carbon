import React from 'react';
import Bowser from 'bowser';
import classNames from 'classnames';
import { assign } from 'lodash';
import PropTypes from 'prop-types';
import Browser from './../../utils/helpers/browser';
import Icon from './../icon';
import Modal from './../modal';
import Heading from './../heading';

/**
 * A Dialog widget.
 *
 * == How to use a Dialog in a component:
 *
 * In your file
 *
 *   import Dialog from 'carbon/lib/components/dialog';
 *
 * To render a Dialog:
 *
 *   <Dialog onCancel={ customEventHandler } />
 *
 * The component rendering the Dialog must pass down a prop of 'open' in order to open the dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Dialog
 * @constructor
 */
class Dialog extends Modal {

  static propTypes = assign({}, Modal.propTypes, {
    /**
     * Title displayed at top of dialog
     *
     * @property title
     * @type {Object}
     */
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    /**
     * Subtitle displayed at top of dialog
     *
     * @property subtitle
     * @type {String}
     */
    subtitle: PropTypes.string,

    /**
     * Size of dialog, default size is 750px
     *
     * @property size
     * @type {String}
     * @default med
     */
    size: PropTypes.string,

    /**
     * Determines if the close icon is shown
     *
     * @property showCloseIcon
     * @type {Boolean}
     * @default true
     */
    showCloseIcon: PropTypes.bool,

    /**
     * Callback for the keydown event on the
     * close icon
     *
     * @property onCloseKeyDown
     * @type {Function}
     */
    onCloseKeyDown: PropTypes.func,

    /**
     * Callback function for when the dialog
     * opens.
     *
     * @property onOpening
     * @type {Function}
     */
    onOpening: PropTypes.func,

    /**
     * Callback function for when the dialog
     * is closed.
     *
     * @property onClosing
     * @type {Function}
     */
    onClosing: PropTypes.func,

    /**
     * If true, then the close icon receives keyboard
     * focus when the dialog opens.
     *
     * @property autoFocusCloseIcon
     * @type {Boolean}
     * @default false
     */
    autoFocusCloseIcon: PropTypes.bool
  })

  static defaultProps = {
    size: 'medium',
    showCloseIcon: true,
    ariaRole: 'dialog',
    autoFocusCloseIcon: false
  }

  constructor(args) {
    super(args);
    this.componentTags = this.componentTags.bind(this);
  }

  /**
   * A lifecycle method to update the component on initialize
   *
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (this.props.open) {
      this.centerDialog();
    }
  }

  /**
   * Called by ComponentDidUpdate when
   * Dialog is opened
   * @override
   *
   * @method onOpening
   * @return {Void}
   */
  onOpening() {
    this.centerDialog();
    this.window().addEventListener('resize', this.centerDialog);

    if (this.props.showCloseIcon && this.props.autoFocusCloseIcon) {
      this._close.focus();
    }

    if (this.props.onOpening) {
      this.props.onOpening();
    }
  }

  /**
   * Called by ComponentDidUpdate when
   * Dialog is closed
   * @override
   *
   * @method onClosing
   * @return {Void}
   */
  onClosing() {
    this.window().removeEventListener('resize', this.centerDialog);

    if (this.props.onClosing) {
      this.props.onClosing();
    }
  }

  /**
   * Returns the current window
   *
   * @method window
   * @return {Object}
   */
  window = () => {
    return Browser.getWindow();
  }

  /**
   * Centers dialog relative to window
   *
   * @method centerDialog
   * @return {void}
   */
  centerDialog = () => {
    const height = this._dialog.offsetHeight / 2,
        width = this._dialog.offsetWidth / 2;

    const win = this.window();

    let midPointY = (win.innerHeight / 2) + win.pageYOffset,
        midPointX = (win.innerWidth / 2) + win.pageXOffset;

    midPointY -= height;
    midPointX -= width;

    if (midPointY < 20) {
      midPointY = 20;
    } else if (Bowser.ios) {
      midPointY -= win.pageYOffset;
    }

    if (midPointX < 20) {
      midPointX = 20;
    }

    this._dialog.style.top = `${midPointY}px`;
    this._dialog.style.left = `${midPointX}px`;
  }

  /**
   * Returns HTML and text for the dialog title.
   *
   * @method dialogTitle
   * @return {String} title to display
   */
  get dialogTitle() {
    if (!this.props.title) { return null; }

    let title = this.props.title;

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
      <div className='carbon-dialog__title'>{ title }</div>
    );
  }

  /**
   * Returns classes for the component.
   * @override
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-dialog',
      this.props.className
    );
  }

  /**
   * Returns classes for the dialog.
   * @override
   *
   * @method dialogClasses
   * @return {String} dialog className
   */
  get dialogClasses() {
    return classNames(
      'carbon-dialog__dialog',
      {
        [`carbon-dialog__dialog--${this.props.size}`]: typeof this.props.size !== 'undefined'
      }
    );
  }

  get closeIcon() {
    if (this.props.showCloseIcon) {
      const closeProps = {
        className: 'carbon-dialog__close',
        'data-element': 'close',
        onClick: this.props.onCancel,
        title: 'Close',
        onKeyDown: this.props.onCloseKeyDown
      };
      return (
        <a
          href='#close'
          ref={ (a) => { this._close = a; } }
          { ...closeProps }
        >
          <Icon
            type='close'
          />
        </a>
      );
    }
    return null;
  }

  componentTags(props) {
    return {
      'data-component': 'dialog',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  /**
   * Returns the computed HTML for the dialog.
   *
   * @method dialogHTML
   * @return {Object} JSX for dialog
   */
  get modalHTML() {
    const dialogProps = {
      className: this.dialogClasses
    };

    if (this.props.ariaRole) {
      dialogProps.role = this.props.ariaRole;
    }

    if (this.props.title) {
      dialogProps['aria-labelledby'] = 'carbon-dialog-title';
    }

    if (this.props.subtitle) {
      dialogProps['aria-describedby'] = 'carbon-dialog-subtitle';
    }

    return (
      <div
        ref={ (d) => { this._dialog = d; } }
        { ...dialogProps }
        { ...this.componentTags(this.props) }
      >
        { this.closeIcon }

        { this.dialogTitle }

        <div className='carbon-dialog__content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Dialog;
