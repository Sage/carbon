import React, { useState } from 'react';
import {
  array,
  boolean,
  withKnobs,
  select,
  text
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import NumeralDate from '.';
import Textbox from '../textbox';

export default {
  title: 'Test/Numeral Date',
  component: NumeralDate,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true
    },
    knobs: { escapeHTML: false }
  }
};

export const Basic = () => {
  const [dateValue, setDateValue] = useState({});
  const dateFormat = array('dateFormat', NumeralDate.defaultProps.dateFormat);
  /* iconOption is only here for testing purposes whilst props for
  textbox Formik integration are being put through review and QA */
  const iconOptions = {
    noIcon: '',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };

  const handleChange = (ev, itemId) => {
    setDateValue({ ...dateValue, [itemId]: ev.target.value });
    action('change')(ev);
  };

  const handleBlur = (ev) => {
    action('blur')(ev);
  };

  return (
    <NumeralDate
      onChange={ handleChange }
      /* hasWarning, hasError, hasInfo are only here until the
      validation prop is properly introduced */
      hasWarning={ boolean('hasWarning') }
      hasError={ boolean('hasError', true) }
      hasInfo={ boolean('hasInfo') }
      inputIcon={ select('icon', iconOptions, 'error') }
      tooltipMessage={ text('tooltipMessage', 'This is the tooltip Message') }
      onBlur={ handleBlur }
      dateFormat={ dateFormat }
      value={ dateValue }
      name='numeralDate_name'
      id='numeralDate_id'
    >
      <Textbox />
    </NumeralDate>
  );
};
