import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../../utils/icon';

/**
 * A Dialog widget.
 *
 * == How to use a Dialog in a component:
 *
 * In your file
 *
 *  import Dialog from 'carbon/lib/components/dialog';
 *
 *  In the render method:
 *
 *    <Dialog cancelDialogHandler={ customEvenHandler } />
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Dialog
 * @constructor
 **/
class Dialog extends React.Component {

  static propTypes = {
    /**
     * A custom close event handler
     *
     * @property cancelDialogHandler
     * @type { Function }
     */
    cancelDialogHandler: React.PropTypes.func.isRequired
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   *
   * @method componentDidUpdate
   */
  componentDidUpdate = () => {
    if (typeof this.refs.dialog !== 'undefined') {
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
   * Renders the component.
   *
   * @method render
   */
  render() {
    let mainClasses = "ui-dialog",
        dialogClasses = "ui-dialog__dialog",
        backgroundHTML,
        dialogHTML;

    if (typeof this.props.open !== 'undefined') {
      let dialogTitleHTML = this.props.title ?
        <h2 className="ui-dialog__title">{ this.props.title }</h2> :
        null;

      backgroundHTML = <div className="ui-dialog__background"></div>;

      if (typeof this.props.size !== 'undefined') {
        dialogClasses += (" ui-dialog__dialog--" + this.props.size);
      }

      dialogHTML = (
        <div ref="dialog" className={ dialogClasses }>
          { dialogTitleHTML }
          <Icon className="ui-dialog__close" type="close" onClick={ this.props.cancelDialogHandler } />
          { this.props.children }
        </div>
      );
    }

    return (
      <div className={ mainClasses }>
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
