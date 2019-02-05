import I18n from 'i18n-js';
import React from 'react';
import tagComponent from '../../../utils/helpers/tags';
import Button from '../../button/button';

const cancelButtonProps = (props) => {
  return ({
    onClick: props.cancelClick,
    type: 'button',
    className: 'carbon-form-cancel__button',
    ...props.cancelButtonProps
  });
};

const cancelText = (props) => {
  return props.cancelText || I18n.t('actions.cancel', { defaultValue: 'Cancel' });
};

const CancelButton = props => (
  <div className='carbon-form-cancel' { ...tagComponent('cancel', props) }>
    <Button { ...cancelButtonProps(props) } data-element='cancel'>
      { cancelText(props) }
    </Button>
  </div>
);

export default CancelButton;
