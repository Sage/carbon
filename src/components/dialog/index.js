import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../icon';

class Dialog extends React.Component {

  static propTypes = {
    cancelDialogHandler: React.PropTypes.func.isRequired
  }

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

  closeDialog = (ev) => {
    if (ev.keyCode === 27) {
      this.props.cancelDialogHandler();
    }
  }

  centerDialog = () => {
    var height = this.refs.dialog.offsetHeight / 2,
        width = this.refs.dialog.offsetWidth / 2,
        midPointY = window.innerHeight / 2,
        midPointX = window.innerWidth / 2;

    midPointY = midPointY - height;
    midPointX = midPointX - width;

    this.refs.dialog.style.top = midPointY + "px";
    this.refs.dialog.style.left = midPointX + "px";
  }

  get dialogTitle() {
    return (
        this.props.title ?
          <h2 className="ui-dialog__title">{ this.props.title }</h2> :
          null
    );
  }

  get backgroundHTML() {
    return <div className="ui-dialog__background"></div>;
  }

  get mainClasses() {
    return 'ui-dialog';
  }

  get dialogClasses() {
    return 'ui-dialog__dialog';
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let dialogClasses = this.dialogClasses,
        backgroundHTML,
        dialogHTML;

    if (this.props.open) {

      backgroundHTML = this.backgroundHTML;

      if (this.props.size) {
        dialogClasses += (" ui-dialog__dialog--" + this.props.size);
      }

      dialogHTML = (
        <div ref="dialog" className={ dialogClasses }>
          { this.dialogTitle }
          <Icon className="ui-dialog__close" type="close" onClick={ this.props.cancelDialogHandler } />
          { this.props.children }
        </div>
      );
    }

    return (
      <div className={ this.mainClasses }>
        <ReactCSSTransitionGroup
          transitionName="dialog"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
        >
          { dialogHTML }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="dialog-background"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
        >
          { backgroundHTML }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

export default Dialog;
