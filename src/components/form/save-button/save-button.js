import classNames from 'classnames';
import I18n from 'i18n-js';
import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import Button from './../../button';

const SaveButton = props =>
  <div className={ saveClasses(props) } { ...tagComponent('save', props) }>
    <Button { ...saveButtonProps(props) } data-element='save'>
      { saveText(props) }
    </Button>
  </div>
;

const saveClasses = (props) => {
  return classNames(
    'carbon-form-save', {
      'carbon-form-save--invalid': props.errors || props.warnings
    }
  );
};

const saveButtonProps = (props) => {
  return ({
    as: 'primary',
    disabled: props.saving,
    className: 'carbon-form-save__button',
    ...props.saveButtonProps
  });
};

const saveText = (props) => {
  return props.saveText || I18n.t('actions.save', { defaultValue: 'Save' });
};

SaveButton.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  warnings: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default SaveButton;
