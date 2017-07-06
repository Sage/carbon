import React from 'react';
import PropTypes from 'prop-types';
import { assign } from 'lodash';
import Dialog from '../dialog';

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
 *   <Alert onCancel={ customEventHandler } open={ false }/>
 *
 * The component rendering the Alert must pass down a prop of 'open' in order to open the alert.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Alert
 * @constructor
 */
class Alert extends React.Component {

  static defaultProps = assign({}, Dialog.defaultProps, {
    ariaRole: 'alertdialog',
    size: 'extra-small'
  })

  static propTypes = {
    size: PropTypes.string,

    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    open: PropTypes.bool,

    subtitle: PropTypes.string,

    showCloseIcon: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.onCloseKeyDown = this.onCloseKeyDown.bind(this);
  }

  onCloseKeyDown(ev) {
    if (ev.key === 'Tab') {
      ev.preventDefault();
    }
  }

  componentTags(props) {
    return {
      'data-component': 'alert',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  render() {
    return (
      <Dialog
        className='carbon-dialog--alert'
        { ...this.props }
        autoFocusCloseIcon={ this.props.showCloseIcon }
        onCloseKeyDown={ this.onCloseKeyDown }
        { ...this.componentTags(this.props) }
      />
    );
  }
}

export default Alert;
