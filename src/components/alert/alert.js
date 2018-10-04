import React from 'react';
import classNames from 'classnames';
import Dialog from '../dialog';
import { withProps } from 'recompose';

/**
 * Alert component - used to display system messages, similar to a JavaScript `alert('message')`.
 */

const additionalAlertProps = props => ({
  className: classNames('carbon-alert', props.className),
  componentTag: 'alert'
})

const Alert = withProps(additionalAlertProps)(Dialog)

Alert.defaultProps = {
  'data-role': 'alertdialog',
  size: 'extra-small'
};

export default Alert;
