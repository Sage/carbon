import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, boolean, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../utils/helpers/options-helper';
import ShowEditPod from './show-edit-pod';
import Content from '../content';
import Textbox from '../textbox';
import notes from './notes.md';

const store = new Store({
  editing: false
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
  alert('onDelete function is running now.');
};

const onClick = action('click');
const beforeFormValidation = action('beforeFormValidation');
const afterFormValidation = action('afterFormValidation');


storiesOf('ShowEditPod', module)
  .add('default', () => {
    const asTheme = select('as', OptionsHelper.themesFull[4]);
    const border = boolean('border', false);
    const buttonAlign = select('buttonAlign', OptionsHelper.alignBinary[1]);
    const cancel = boolean('cancel', true);
    const cancelText = text('cancelText', 'Cancel');
    const className = text('className', '');
    const deleteText = text('deleteText', 'Delete');
    const editing = boolean('editing', store.get('editing'));
    const saveText = text('saveText', 'Save');
    const saving = boolean('saving', false);
    const title = text('title', 'Person');
    const transitionName = text('transitionName', 'carbon-show-edit-pod__transition');
    const validateOnMount = boolean('validateOnMount', false);
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
          onClick={ onClick }
          afterFormValidation={ afterFormValidation }
          as={ asTheme }
          beforeFormValidation={ beforeFormValidation }
          border={ border }
          buttonAlign={ buttonAlign }
          cancel={ cancel }
          cancelText={ cancelText }
          className={ className }
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
  }, {
    notes: { markdown: notes }
  });
