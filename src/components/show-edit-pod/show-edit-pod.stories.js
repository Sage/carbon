import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../utils/helpers/options-helper';
import ShowEditPod from './show-edit-pod';
import Content from '../content';
import Textbox from '../textbox';
import { notes, info } from './documentation';

const store = new Store({
  editing: ShowEditPod.defaultProps.editing
});

const onEdit = () => {
  store.set({ editing: true });
  action('edit')();
};

const onCancel = () => {
  store.set({ editing: false });
  action('cancel')();
};

const onDelete = () => {
  store.set({ editing: false });
  action('delete')();
};

storiesOf('ShowEditPod', module)
  .addParameters({
    info: {
      propTablesExclude: [Content, State]
    }
  })
  .add(
    'default',
    () => {
      const asTheme = select('as', OptionsHelper.themesFull, ShowEditPod.defaultProps.as);
      const border = boolean('border', ShowEditPod.defaultProps.border);
      const buttonAlign = select('buttonAlign', OptionsHelper.alignBinary, ShowEditPod.defaultProps.buttonAlign);
      const cancel = boolean('cancel', ShowEditPod.defaultProps.cancel);
      const cancelText = cancel ? text('cancelText', ShowEditPod.defaultProps.cancelText) : undefined;
      const deleteText = text('deleteText', ShowEditPod.defaultProps.deleteText);
      const editing = boolean('editing', store.get('editing'));
      const saveText = text('saveText', ShowEditPod.defaultProps.saveText);
      const saving = boolean('saving', ShowEditPod.defaultProps.saving);
      const title = text('title', 'Person');
      const transitionName = text('transitionName', ShowEditPod.defaultProps.transitionName);
      const validateOnMount = boolean('validateOnMount', ShowEditPod.defaultProps.validateOnMount);
      const editFields = [
        <Textbox
          key='first_name' label='First Name'
          value='Alan'
        />,
        <Textbox
          key='second_name' label='Second Name'
          value='Smith'
        />,
        <Textbox
          key='telephone' label='Telephone'
          value='000 000 0000'
        />
      ];

      return (
        <State store={ store }>
          <ShowEditPod
            as={ asTheme }
            border={ border }
            buttonAlign={ buttonAlign }
            cancel={ cancel }
            cancelText={ cancelText }
            deleteText={ deleteText }
            editing={ editing }
            onDelete={ onDelete }
            onCancel={ onCancel }
            onEdit={ onEdit }
            saveText={ saveText }
            saving={ saving }
            title={ title }
            transitionName={ transitionName }
            validateOnMount={ validateOnMount }
            editFields={ editFields }
          >
            <Content title='First Name'>Alan</Content>
            <Content title='Last Name'>Smith</Content>
            <Content title='Telephone'>000 000 0000</Content>
          </ShowEditPod>
        </State>
      );
    },
    {
      notes: { markdown: notes },
      info: { text: info }
    }
  );
