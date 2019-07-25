import React from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import StyledFormButtonWrapper from './form-button.style';
import tagComponent from '../../../../utils/helpers/tags';
import Button from '../../../../components/button';

const text = (props) => {
  const { formButtonName } = props;
  const defaultValue = formButtonName.charAt(0).toUpperCase() + formButtonName.slice(1);
  return props[`${formButtonName}Text`] || I18n.t(`actions.${formButtonName}`, { defaultValue });
};

const propsForButton = (props) => {
  return ({
    save: {
      as: 'primary',
      disabled: props.saving,
      ...props.saveButtonProps
    },
    cancel: {
      onClick: props.cancelClick,
      type: 'button',
      ...props.cancelButtonProps
    }
  });
};

const addButtonProps = (props) => {
  const { formButtonName } = props;
  const isDefaultAction = formButtonName === 'save' || formButtonName === 'cancel';

  if (!isDefaultAction) return props;

  return {
    ...propsForButton(props)[formButtonName],
    'data-element': props.formButtonName,
    ...props
  };
};

const FormButton = (props) => {
  return (
    <StyledFormButtonWrapper { ...tagComponent(props.formButtonName, props) }>
      <Button { ...addButtonProps(props) }>
        { text(props) }
      </Button>
    </StyledFormButtonWrapper>
  );
};

FormButton.propTypes = {
  formButtonName: PropTypes.string,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  warnings: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default FormButton;
