import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import PresenceValidation from '../../../utils/validations/presence';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import Form, { BaseForm } from '.';
import Textbox from '../textbox';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Form.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /form\.js(?!spec)/
);

storiesOf('__deprecated__/Form', module)
  .addParameters({
    info: {
      text: Info,
      propTablesExclude: [Textbox]
    }
  })
  .add('classic', () => {
    const unsavedWarning = boolean('unsavedWarning', true);
    const save = boolean('save', true);
    const cancel = boolean('cancel', true);
    const buttonAlign = select(
      'buttonAlign',
      OptionsHelper.alignBinary,
      BaseForm.defaultProps.buttonAlign
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
    const showSummary = boolean('showSummary', BaseForm.defaultProps.showSummary);

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
        onSubmit={ ev => action('submit')(ev) }
      >
        <Textbox
          label='Full Name'
          labelInline
          labelAlign='right'
          validations={ [new PresenceValidation()] }
        />
      </Form>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    themeSelector: classicThemeSelector
  });
