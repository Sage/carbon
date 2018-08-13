import React from 'react';
import classNames from 'classnames';
import Dialog from '../dialog';

/**
 * Alert component - used to display system messages, similar to a JavaScript `alert('message')`.
 */
const Alert = props => (
  <Dialog
    { ...props }
    className={ classNames('carbon-alert', props.className) }
    componentTag='alert'
  />
);

Alert.defaultProps = {
  'data-role': 'alertdialog',
  size: 'extra-small'
};

export default Alert;
