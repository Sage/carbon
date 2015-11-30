import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../icon';

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
 *   <Dialog cancelDialogHandler={ customEvenHandler } />
 *
 * The component rendering the Dialog must pass down a prop of 'open' in order to open the dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Dialog
 * @constructor
 */
class Dialog extends React.Component {

  static propTypes = {
    /**
     * A custom close event handler
     *
     * @property cancelDialogHandler
     * @type {Function}
     */
    cancelDialogHandler: React.PropTypes.func.isRequired,

    /**
     * Sets the open state of the dialog
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: React.PropTypes.bool.isRequired
  }

  static defaultProps = {
    open: false
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of the dialog component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property dialog
     * @type {Object}
     */
    dialog: React.PropTypes.object
  }

  /**
   * Returns dialog object to child components. Used to override form cancel button functionality.
   *
   * @method getChildContext
   */
  getChildContext() {
    return {
      dialog: {
        cancelDialogHandler: this.props.cancelDialogHandler
      }
    };
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   *
   * @method componentDidUpdate
   */
  componentDidUpdate = () => {
    if (this.refs.dialog) {
      this.centerDialog();
      window.addEventListener('resize', this.centerDialog);
      window.addEventListener('keyup', this.closeDialog);
    } else {
      window.removeEventListener('resize', this.centerDialog);
      window.removeEventListener('keyup', this.closeDialog);
    }
  }

  /**
   * Triggers the custom close event handler on ESC
   *
   * @method closeDialog
   * @param {Object} ev event
   */
  closeDialog = (ev) => {
    if (ev.keyCode === 27) {
      this.props.cancelDialogHandler();
    }
  }

  /**
   * Centers dialog relative to window
   *
   * @method centerDialog
   */
  centerDialog = () => {
    let height = this.refs.dialog.offsetHeight / 2,
        width = this.refs.dialog.offsetWidth / 2,
        midPointY = window.innerHeight / 2,
        midPointX = window.innerWidth / 2;

    midPointY = midPointY - height;
    midPointX = midPointX - width;

    this.refs.dialog.style.top = midPointY + "px";
    this.refs.dialog.style.left = midPointX + "px";
  }

  /**
   * Returns HTML and text for the dialog title.
   *
   * @method dialogTitle
   */
  get dialogTitle() {
    return (
        this.props.title ?
          <h2 className="ui-dialog__title">{ this.props.title }</h2> :
          null
    );
  }

  /**
   * Returns HTML for the background.
   *
   * @method backgroundHTML
   */
  get backgroundHTML() {
    return <div className="ui-dialog__background"></div>;
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   */
  get mainClasses() {
    return 'ui-dialog';
  }

  /**
   * Returns classes for the dialog.
   *
   * @method dialogClasses
   */
  get dialogClasses() {
    return 'ui-dialog__dialog';
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
      <div ref="dialog" className={ dialogClasses }>
        { this.dialogTitle }
        <Icon className="ui-dialog__close" type="close" onClick={ this.props.cancelDialogHandler } />
        { this.props.children }
      </div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let backgroundHTML,
        dialogHTML;

    if (this.props.open) {
      backgroundHTML = this.backgroundHTML;
      dialogHTML = this.dialogHTML;
    }

    return (
      <div className={ this.mainClasses }>
        <ReactCSSTransitionGroup
          transitionName="dialog"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { dialogHTML }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="dialog-background"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { backgroundHTML }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Dialog;
