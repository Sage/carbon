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
      text: `
        A Form widget.
          
        ## How to use a Form in a component:
          
        In your file
  
        ~~~js
        import Form from 'carbon-react/lib/components/form';
        ~~~
  
        To render a Form:
        
        ~~~js
        <Form>
          <Textbox />
          <Textbox />
          <Date />
        </Form>
        ~~~
  
        Form provides the ability to hook into the form handle submission method.
        By passing afterFormValidation or beforeFormValidation you can add custom
        validation logic and prevent the form submission using ev.preventDefault()
      `
    },
    notes: { markdown: notes }
  });
