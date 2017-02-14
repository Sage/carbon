import React from 'react';
import Icon from './../icon';
import Modal from './../modal';
import Bowser from 'bowser';
import classNames from 'classnames';
import { assign } from 'lodash';

const propTypes = assign({}, Modal.propTypes, {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  size: React.PropTypes.string,
  showCloseIcon: React.PropTypes.bool
});

const defaultProps = {
  size: 'medium',
  showCloseIcon: true
};

/**
 * @class Dialog
 * @constructor
 */
class Dialog extends React.Component {
  componentDidMount() {
    if (this.props.open) {
      this.centerDialog();
    }
  }

  onOpening = () => {
    this.centerDialog();
    window.addEventListener('resize', this.centerDialog);
  }

  onClosing = () => {
    window.removeEventListener('resize', this.centerDialog);
  }

  centerDialog = () => {
    center(this._dialog);
  }

  render() {
    return (
      <Modal
        onOpening={ this.onOpening }
        onClosing={ this.onClosing }
        className={ mainClasses(this.props.className) }
        { ...this.props }
      >
        <div ref={ (d) => this._dialog = d } className={ dialogClasses(this.props.size) }>
          { renderDialogTitle(this.props.title) }
          { renderCloseIcon(this.props.showCloseIcon, this.props.onCancel) }

          <div className='carbon-dialog__content'>
            { this.props.children }
          </div>
        </div>
      </Modal>
    );
  }
}

/**
 * Centers the given element in the window.
 *
 * @method center
 * @param {Node} dialog
 * @return {Void}
 */
function center(dialog) {
  let height = dialog.offsetHeight / 2,
      width = dialog.offsetWidth / 2,
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

  dialog.style.top = midPointY + "px";
  dialog.style.left = midPointX + "px";
}

/**
 * Returns classes for the component.
 *
 * @method mainClasses
 * @return {String} Main className
 */
function mainClasses(className) {
  return classNames('carbon-dialog', className);
}

/**
 * Returns classes for the dialog.
 *
 * @method dialogClasses
 * @return {String} dialog className
 */
function dialogClasses(size) {
  return classNames(
    'carbon-dialog__dialog', {
      [`carbon-dialog__dialog--${size}`]: typeof size !== 'undefined'
    }
  );
}

/**
 * Returns HTML and text for the dialog title.
 *
 * @method dialogTitle
 * @return {String} title to display
 */
function renderDialogTitle(title) {
  if (!title) { return null; }
  return <h2 className='carbon-dialog__title'>{ title }</h2>;
}

/**
 * Renders the close icon unless it is disabled.
 *
 * @method renderCloseIcon
 * @param {Boolean} showCloseIcon
 * @param {Function} onCancel
 * @return {Node}
 */
function renderCloseIcon(showCloseIcon, onCancel) {
  if (!showCloseIcon) { return null; }
  return <Icon className="carbon-dialog__close" type="close" onClick={ onCancel } />;
}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;
