import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Form from './form';
import Textbox from '../textbox';

storiesOf('Form', module)
  .add('default', () => {
    const unsavedWarning = boolean('unsavedWarning', false);
    const save = boolean('save', true);
    const cancel = boolean('cancel', true);
    const buttonAlign = text('buttonAlign', '');
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
        unsavedWarning={unsavedWarning}
        cancel={cancel}
        buttonAlign={buttonAlign}
        saving={saving}
        stickyFooter={stickyFooter}
        stickyFooterPadding={stickyFooterPadding}
        autoDisable={autoDisable}
        cancelText={cancelText}
        saveText={saveText}
        save={save}
        additionalActions={additionalActions}
        leftAlignedActions={leftAlignedActions}
        rightAlignedActions={rightAlignedActions}
        showSummary={showSummary}
      >
        <Textbox
          value=""
          label="Full Name"
          labelInline={ true }
          labelAlign="right"
        />
      </Form>
    );
  }, {
    notes: { markdown: notes }
  });
