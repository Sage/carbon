import React from 'react';
import Dialog from '../dialog';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../icon';
import Bowser from 'bowser';

/**
 * A Alert widget.
 *
 * == How to use a Alert in a component:
 *
 * In your file
 *
 *   import Alert from 'carbon/lib/components/alert';
 *
 * To render a Alert:
 *
 *   <Alert cancelDialogHandler={ customEvenHandler } />
 *
 * The component rendering the Alert must pass down a prop of 'open' in order to open the alert.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Alert
 * @constructor
 */
class Alert extends Dialog {

  constructor(...args) {
    super(...args);
  }

  /**
   * Returns HTML and text for the dialog title.
   *
   * @method dialogTitle
   */
  get alertTitle() {
    return (
        this.props.title ?
          <h2 className="ui-alert__title">{ this.props.title }</h2> :
          null
    );
  }

  /**
   * Returns classes for the dialog.
   *
   * @method dialogClasses
   */
  get dialogClasses() {
    let classes = super.dialogClasses;
    classes += ' ui-alert'
    return classes;
  }
}

export default Alert;
