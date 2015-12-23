import React from 'react';
import Dialog from '../dialog';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../icon';
import Bowser from 'bowser';

class Alert extends Dialog {

  constructor(...args) {
    super(...args);
  }

  static propTypes = {
    /**
     * A custom close event handler
     *
     * @property cancelDialogHandler
     * @type {Function}
     */
    cancelAlertHandler: React.PropTypes.func.isRequired,
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   *
   * @method componentDidUpdate
   */
  componentDidUpdate = () => {
    if (this.props.open && !this.listening) {
      this.centerAlert();
      this.listening = true;
      window.addEventListener('resize', this.centerAlert);
      window.addEventListener('keyup', this.closeAlert);
    } else if (!this.props.open) {
      this.listening = false;
      window.removeEventListener('resize', this.centerAlert);
      window.removeEventListener('keyup', this.closeAlert);
    }
  }

    /**
   * Centers dialog relative to window
   *
   * @method centerDialog
   */
  centerAlert = () => {
    let height = this.refs.alert.offsetHeight / 2,
        width = this.refs.alert.offsetWidth / 2,
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

    this.refs.alert.style.top = midPointY + "px";
    this.refs.alert.style.left = midPointX + "px";
  }

  /**
   * Returns the computed HTML for the dialog.
   *
   * @method dialogClasses
   */
  get dialogHTML() {
    let dialogClasses = this.dialogClasses;

    if (typeof this.props.size !== 'undefined') {
      dialogClasses += (" ui-dialog__dialog--" + this.props.size);
    }

    return (
      <div ref="alert" className={ dialogClasses }>
        { this.dialogTitle }
        <Icon className="ui-dialog__close" type="close" onClick={ this.props.cancelAlertHandler } />
        { this.props.children }
      </div>
    );
  }

  get dialogClasses() {
    let classes = super.dialogClasses;
    classes += ' ui-alert'
    return classes;
  }

  /**
   * Triggers the custom close event handler on ESC
   *
   * @method closeDialog
   * @param {Object} ev event
   */
  closeAlert= (ev) => {
    if (ev.keyCode === 27) {
      this.props.cancelAlertHandler();
    }
  }
}

export default Alert;
