import React from 'react';
import classNames from 'classnames';
import { assign } from 'lodash';
import PropTypes from 'prop-types';
import Browser from './../../utils/helpers/browser';
import Icon from './../icon';
import Modal from './../modal';
import Heading from './../heading';
import ElementResize from './../../utils/helpers/element-resize';

const DIALOG_OPEN_HTML_CLASS = 'carbon-dialog--open';

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
     * Allows developers to specify a specific height for the dialog.
     *
     * @property height
     * @type {String}
     */
    height: PropTypes.string,

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
     * If true then the dialog receives focus
     * when it opens
     *
     * @property autoFocus
     * @type {Boolean}
     * @default false
     */
    autoFocus: PropTypes.bool,

    stickyFormFooter: PropTypes.bool
  })

  static defaultProps = {
    autoFocus: true,
    size: 'medium',
    showCloseIcon: true,
    ariaRole: 'dialog'
  }

  constructor(args) {
    super(args);
    this.componentTags = this.componentTags.bind(this);
    this.onDialogBlur = this.onDialogBlur.bind(this);
    this.onCloseIconBlur = this.onCloseIconBlur.bind(this);
    this.document = Browser.getDocument();
    this.window = Browser.getWindow();
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
      if (this.props.autoFocus) {
        this.focusDialog();
      }
    }
  }

  /**
   * Event handler to handle keyboard
   * focus leaving the dialog element.
   */
  onDialogBlur(ev) { } // eslint-disable-line no-unused-vars

  /**
   * Event handler for when the close icon
   * loses keyboard focus.
   *
   * As the close icon is the last element in the dialog
   * source, when the keyboard focus leaves the close
   * icon return the focus to the dialog itself.
   *
   * @return {Void}
   */
  onCloseIconBlur(ev) {
    ev.preventDefault();
    this.focusDialog();
  }

  /**
   * Called by ComponentDidUpdate when
   * Dialog is opened
   * @override
   *
   * @method onOpening
   * @return {Void}
   */
  get onOpening() {
    this.document.documentElement.classList.add(DIALOG_OPEN_HTML_CLASS);
    this.centerDialog(true);
    ElementResize.addListener(this._innerContent, this.applyFixedBottom);
    this.window.addEventListener('resize', this.centerDialog);

    if (this.props.autoFocus) {
      this.focusDialog();
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
  get onClosing() {
    this.appliedFixedBottom = false;
    this.document.documentElement.classList.remove(DIALOG_OPEN_HTML_CLASS);
    this.window.removeEventListener('resize', this.centerDialog);
    ElementResize.removeListener(this._innerContent, this.applyFixedBottom);
  }

  /**
   * Centers dialog relative to window
   *
   * @method centerDialog
   * @param {Boolean} notRender - declares that the method was called not as part of the component lifecycle
   * @return {void}
   */
  centerDialog = (animating) => {
    if (!this._dialog) { return; }
    const height = this._dialog.offsetHeight / 2,
        width = this._dialog.offsetWidth / 2,
        win = this.window;

    let midPointY = win.innerHeight / 2,
        midPointX = win.innerWidth / 2;

    midPointY -= height;
    midPointX -= width;

    if (midPointY < 20) {
      midPointY = 20;
    }

    if (midPointX < 20) {
      midPointX = 20;
    }

    if (this._content) {
      // apply height to content based on height of title
      const titleHeight = this._title ? this._title.offsetHeight : '0';
      this._content.style.height = `calc(100% - ${titleHeight}px)`;
    }

    this._dialog.style.top = `${midPointY}px`;
    this._dialog.style.left = `${midPointX}px`;

    if (animating === true) {
      // cause timeout to accommodate dialog animating in
      setTimeout(() => {
        this.applyFixedBottom();
      }, 500);
    } else {
      this.applyFixedBottom();
    }
  }

  applyFixedBottom = () => {
    if (!this.appliedFixedBottom && this.shouldHaveFixedBottom()) {
      this.appliedFixedBottom = true;
      this.forceUpdate();
    } else if (this.appliedFixedBottom && !this.shouldHaveFixedBottom()) {
      this.appliedFixedBottom = false;
      this.forceUpdate();
    }
  }

  focusDialog() {
    if (!this._dialog) { return; }
    this._dialog.focus();
  }

  /**
   * Determines if the dialog should have a fixed bottom.
   *
   * @method shouldHaveFixedBottom
   * @return {Boolean}
   */
  shouldHaveFixedBottom = () => {
    if (!this._innerContent) { return false; }

    const contentHeight = this._innerContent.offsetHeight + this._innerContent.offsetTop,
        windowHeight = this.window.innerHeight - this._dialog.offsetTop - 1;

    return contentHeight > windowHeight;
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
    const classes = classNames(
          'carbon-dialog__title', {
            'carbon-dialog__title--has-subheader': this.props.subtitle
          }
        );

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
      <div className={ classes } ref={ (c) => { this._title = c; } }>{ title }</div>
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
        [`carbon-dialog__dialog--${this.props.size}`]: typeof this.props.size !== 'undefined',
        'carbon-dialog__dialog--fixed-bottom': this.appliedFixedBottom,
        'carbon-dialog__dialog--has-height': this.props.height,
        'carbon-dialog__dialog--sticky-form-footer': this.props.stickyFormFooter
      }
    );
  }

  get closeIcon() {
    if (this.props.showCloseIcon) {
      return (
        <Icon
          className='carbon-dialog__close'
          data-element='close'
          onClick={ this.props.onCancel }
          type='close'
          tabIndex='0'
          onBlur={ this.onCloseIconBlur }
        />
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

  additionalContent() {
    return null;
  }

  /**
   * Returns the computed HTML for the dialog.
   *
   * @method dialogHTML
   * @return {Object} JSX for dialog
   */
  get modalHTML() {
    let height = this.props.height;

    if (height && !height.match(/px$/)) {
      height = `${height}px`;
    }

    const dialogProps = {
      className: this.dialogClasses,
      tabIndex: 0,
      style: {
        minHeight: height
      }
    };

    const style = {};

    if (this.props.ariaRole) {
      dialogProps.role = this.props.ariaRole;
    }

    if (this.props.title) {
      dialogProps['aria-labelledby'] = 'carbon-dialog-title';
    }

    if (this.props.subtitle) {
      dialogProps['aria-describedby'] = 'carbon-dialog-subtitle';
    }

    if (this.props.height) {
      style.minHeight = `calc(${height} - 40px)`;
    }

    return (
      <div
        ref={ (d) => { this._dialog = d; } }
        { ...dialogProps }
        { ...this.componentTags(this.props) }
        onBlur={ this.onDialogBlur }
      >
        { this.dialogTitle }

        <div className='carbon-dialog__content' ref={ (c) => { this._content = c; } }>
          <div className='carbon-dialog__inner-content' ref={ (c) => { this._innerContent = c; } } style={ style }>
            { this.props.children }
            { this.additionalContent() }
          </div>
        </div>
        { this.closeIcon }
      </div>
    );
  }
}

export default Dialog;
