import React from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import tagComponent from '../../../../utils/helpers/tags/tags';
import Button from '../../../../components/button';
import OptionsHelper from '../../../../utils/helpers/options-helper';
import Text from '../../../../utils/helpers/text';

const text = (props) => {
  const { formButtonName } = props;
  const defaultValue = Text.titleCase(formButtonName);
  return props[`${formButtonName}Text`] || I18n.t(`actions.${formButtonName}`, { defaultValue });
};

const propsForButton = (props) => {
  return ({
    save: {
      as: 'primary',
      type: 'submit',
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

  return {
    ...propsForButton(props)[formButtonName],
    'data-element': props.formButtonName,
    ...props
  };
};

const FormButton = (props) => {
  return (
    <div { ...tagComponent(props.formButtonName, props) }>
      <Button { ...addButtonProps(props) }>
        { text(props) }
      </Button>
    </div>
  );
};

FormButton.propTypes = {
  formButtonName: PropTypes.oneOf(OptionsHelper.formButtonOptions),
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
