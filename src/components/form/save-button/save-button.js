import classNames from 'classnames';
import I18n from "i18n-js";
import React from 'react';
import { tagComponent } from '../../../utils/helpers/tags';
import Button from './../../button';
import FormSummary from './../form-summary';

const SaveButton = (props) =>
  <div className={ saveClasses(props) } { ...tagComponent('save', props) }>
    <FormSummary
      className='carbon-form-save__summary'
      errors={ props.errors }
      warnings={ props.warnings }
    />
    <Button { ...saveButtonProps(props) } data-element='save'>
      { saveText(props) }
    </Button>
  </div>
;

const saveButtonProps = (props) => {
  return({
    as: 'primary',
    disabled: props.saving,
    className: 'carbon-form-save__button',
    ...props.saveButtonProps
  });
};

const saveText = (props) => {
  return props.saveText || I18n.t('actions.save', { defaultValue: 'Save' });
};

const saveClasses = (props) => {
  return classNames(
    "carbon-form-save", {
      "carbon-form-save--invalid": props.errors || props.warnings
    }
  );
};

export default SaveButton;
