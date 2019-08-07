import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../../utils/helpers/options-helper';
import PresenceValidation from '../../../utils/validations/presence';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import Form, { FormWithoutValidations } from '.';
import Textbox from '../textbox';
import Button from '../../../components/button';
import Link from '../../../components/link';

const additionalFormActions = (innerText) => {
  return {
    Button: <Button>{ innerText }</Button>,
    Link: <Link href='./?path=/story/experimental-form--default'>{ innerText }</Link>
  };
};

storiesOf('Experimental/Form', module)
  .addParameters({
    info: {
      text: Info,
      propTablesExclude: [Textbox],
      includePropTables: [FormWithoutValidations]
    }
  })
  .add('default', () => {
    const formActionOptions = ['', ...OptionsHelper.actionOptions];
    const unsavedWarning = boolean('unsavedWarning', true);
    const save = boolean('save', true);
    const cancel = boolean('cancel', true);
    const buttonAlign = select(
      'buttonAlign',
      OptionsHelper.alignBinary,
      FormWithoutValidations.defaultProps.buttonAlign
    );
    const saving = boolean('saving', false);
    const cancelText = text('cancelText', '');
    const stickyFooter = boolean('stickyFooter', false);
    const stickyFooterPadding = text('stickyFooterPadding', '');
    const autoDisable = boolean('autoDisable', false);
    const saveText = text('saveText', '');
    const additionalActions = select('additionalActions', formActionOptions, formActionOptions[0]);
    const leftAlignedActions = select('leftAlignedActions', formActionOptions, formActionOptions[0]);
    const rightAlignedActions = select('rightAlignedActions', formActionOptions, formActionOptions[0]);
    const showSummary = boolean('showSummary', FormWithoutValidations.defaultProps.showSummary);
    const isLabelRightAligned = boolean('isLabelRightAligned', false);
    const inLineLabels = boolean('inLineLabels', false);

    return (
      <Form
        unsavedWarning={ unsavedWarning }
        cancel={ cancel }
        buttonAlign={ buttonAlign }
        saving={ saving }
        stickyFooter={ stickyFooter }
        stickyFooterPadding={ stickyFooterPadding }
        autoDisable={ autoDisable }
        cancelText={ cancelText }
        saveText={ saveText }
        save={ save }
        additionalActions={ additionalFormActions('Additional Action')[additionalActions] }
        leftAlignedActions={ additionalFormActions('Left Action')[leftAlignedActions] }
        rightAlignedActions={ additionalFormActions('Right Action')[rightAlignedActions] }
        showSummary={ showSummary }
        onSubmit={ () => {
          window.location.href = window.location.href;
        } }
        isLabelRightAligned={ isLabelRightAligned }
      >
        <Textbox
          key='0'
          label='Full Name'
          labelInline={ inLineLabels }
          labelAlign='right'
          validations={ [new PresenceValidation()] }
        />
        <Textbox
          key='1'
          label='Role'
          labelInline={ inLineLabels }
          labelAlign='right'
          isOptional
        />
      </Form>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
