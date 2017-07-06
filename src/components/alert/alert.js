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
    /*
     * The following props are the same as
     * the props defined on the Dialog component -
     * they are defined here then passed through
     * to the Dialog that the Alert renders.
     *
     * Therefore the ESLint react/no-unused-prop=types
     * rule is disabled for these prop types
     */
    /* eslint-disable react/no-unused-prop-types */
    disableEscKey: PropTypes.bool,

    enableBackgroundUI: PropTypes.bool,

    open: PropTypes.bool,

    showCloseIcon: PropTypes.bool,

    size: PropTypes.string,

    subtitle: PropTypes.string,

    title: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
    /* eslint-enable react/no-unused-prop-types */
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
