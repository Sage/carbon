import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../../utils/helpers/options-helper';
import PresenceValidation from '../../../utils/validations/presence';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import Form, { FormWithoutValidations } from '.';
import Textbox from '../textbox';

storiesOf('Experimental/Form', module)
  .addParameters({
    info: {
      propTablesExclude: [Textbox],
      includePropTables: [FormWithoutValidations]
    }
  })
  .add('default', () => {
    const unsavedWarning = boolean('unsavedWarning', false);
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
    const additionalActions = text('additionalActions', '');
    const leftAlignedActions = text('leftAlignedActions', '');
    const rightAlignedActions = text('rightAlignedActions', '');
    const showSummary = boolean('showSummary', false);

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
        additionalActions={ additionalActions }
        leftAlignedActions={ leftAlignedActions }
        rightAlignedActions={ rightAlignedActions }
        showSummary={ showSummary }
        onSubmit={ () => {
          window.location.href = window.location.href;
        } }
      >
        <Textbox
          key='0'
          label='Full Name'
          labelInline
          labelAlign='right'
          validations={ [new PresenceValidation()] }
        />
        <Textbox
          key='1'
          label='Role'
          labelInline
          labelAlign='right'
          validations={ [new PresenceValidation()] }
        />
      </Form>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
