import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Form from './form';
import Textbox from '../textbox';

storiesOf('Form', module)
  .addParameters({
    info: {
      propTablesExclude: [Textbox]
    }
  })
  .add('default', () => {
    const unsavedWarning = boolean('unsavedWarning', false);
    const save = boolean('save', true);
    const cancel = boolean('cancel', true);
    const buttonAlign = select('buttonAlign', OptionsHelper.alignBinary);
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
      >
        <Textbox
          label='Full Name'
          labelInline
          labelAlign='right'
        />
      </Form>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A Form widget.</p>
            
          <h2>How to use a Form in a component:</h2>
            
          <p>In your file</p>
    
          <code>{'import Form from "carbon-react/lib/components/form";'}</code>
    
          <p>To render a Form:</p>

          <code>
            {'<Form>'}
              {'<Textbox />'}
              {'<Textbox />'}
              {'<Date />'}
            {'</Form>'}
          </code>
    
          <p>Form provides the ability to hook into the form handle submission method.
          By passing afterFormValidation or beforeFormValidation you can add custom
          validation logic and prevent the form submission using <code>{'ev.preventDefault()'}</code></p>
        </div>
      )
    },
    notes: { markdown: notes }
  });
