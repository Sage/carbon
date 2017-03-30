import React from 'react';
import Icon from './../icon';
import Modal from './../modal';
import Bowser from 'bowser';
import classNames from 'classnames';
import { assign } from 'lodash';

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
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),

    /**
     * Subtitle displayed at top of dialog
     *
     * @property subtitle
     * @type {String}
     */
    subtitle: React.PropTypes.string,

    /**
     * Size of dialog, default size is 750px
     *
     * @property size
     * @type {String}
     * @default med
     */
    size: React.PropTypes.string,

    /**
     * Determins if the close icon is shown
     *
     * @property showCloseIcon
     * @type {Boolean}
     * @default true
     */
    showCloseIcon: React.PropTypes.bool
  })

  static defaultProps = {
    size: 'medium',
    showCloseIcon: true
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
  get onOpening() {
    this.centerDialog();
    window.addEventListener('resize', this.centerDialog);
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
    window.removeEventListener('resize', this.centerDialog);
  }

  /**
   * Centers dialog relative to window
   *
   * @method centerDialog
   * @return {void}
   */
  centerDialog = () => {
    let height = this._dialog.offsetHeight / 2,
        width = this._dialog.offsetWidth / 2,
        midPointY = window.innerHeight / 2 + window.pageYOffset,
        midPointX = window.innerWidth / 2 + window.pageXOffset;

    midPointY = midPointY - height;
    midPointX = midPointX - width;

    if (midPointY < 20) {
      midPointY = 20;
    } else if (Bowser.ios) {
      midPointY -= window.pageYOffset;
    }

    if (midPointX < 20) {
      midPointX = 20;
    }

    this._dialog.style.top = midPointY + "px";
    this._dialog.style.left = midPointX + "px";
  }

  /**
   * Returns HTML and text for the dialog title.
   *
   * @method dialogTitle
   * @return {String} title to display
   */
  get dialogTitle() {
    if (this.props.title) {
      return <h2 className={ this.dialogTitleClasses }>{ this.props.title }</h2>;
    }

    return null;
  }

  /**
   * Returns HTML and text for the dialog subtitle.
   *
   * @method dialogSubtitle
   * @return {String} subtitle to display
   */
  get dialogSubtitle() {
    if (this.props.subtitle) {
      return <p className={ this.dialogSubtitleClasses }>{ this.props.subtitle }</p>;
    }

    return null;
  }

  /**
   * Returns classes for the dialog title.
   *
   * @method dialogTitleClasses
   */
  get dialogTitleClasses() {
    return 'carbon-dialog__title';
  }

  /**
   * Returns classes for the dialog title.
   *
   * @method dialogTitleClasses
   */
  get dialogSubtitleClasses() {
    return 'carbon-dialog__subtitle';
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
      return <Icon className="carbon-dialog__close" type="close" onClick={ this.props.onCancel } />;
    }
  }

  /**
   * Returns the computed HTML for the dialog.
   *
   * @method dialogHTML
   * @return {Object} JSX for dialog
   */
  get modalHTML() {
    return (
      <div ref={ (d) => this._dialog = d } className={ this.dialogClasses }>
        { this.dialogTitle }
        { this.dialogSubtitle }
        { this.closeIcon }

        <div className='carbon-dialog__content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Dialog;
