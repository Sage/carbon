import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import ShowEditPod, { BaseShowEditPod } from './show-edit-pod';
import Content from '../content';

import Textbox from '../../__experimental__/components/textbox';
import Fieldset from '../../__experimental__/components/fieldset';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

ShowEditPod.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /show-edit-pod\.js(?!spec)/
);

const store = new Store({
  editing: false,
  edit_first_name: 'Alan',
  edit_second_name: 'Smith',
  edit_telephone: '000 000 0000'
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

const afterFormValidation = () => {
  action('afterFormValidation')();
};

const setField = fieldName => (e) => {
  store.set({ [fieldName]: e.target.value });
};

function makeStory(name, themeSelector) {
  const fieldProps = [{
    key: 'edit_first_name',
    label: 'First Name'
  },
  {
    key: 'edit_second_name',
    label: 'Second Name'
  },
  {
    key: 'edit_telephone',
    label: 'Telephone'
  }
  ];

  const fields = (state, props) => fieldProps.map(({ key, label }) => (
    <Textbox
      label={ label }
      key={ key }
      onChange={ setField(key) }
      value={ state[key] }
      { ...props }
    />
  ));

  const component = () => {
    const border = boolean('border', BaseShowEditPod.defaultProps.border);
    const buttonAlign = select('buttonAlign', OptionsHelper.alignBinary, BaseShowEditPod.defaultProps.buttonAlign);
    const cancel = boolean('cancel', BaseShowEditPod.defaultProps.cancel);
    const cancelText = cancel ? text('cancelText', 'Cancel') : undefined;
    const deleteText = text('deleteText', 'Delete');
    const saveText = text('saveText', 'Save');
    const saving = boolean('saving', BaseShowEditPod.defaultProps.saving);
    const title = text('title', 'Person');
    const transitionName = text('transitionName', BaseShowEditPod.defaultProps.transitionName);
    const validateOnMount = boolean('validateOnMount', BaseShowEditPod.defaultProps.validateOnMount);

    let editFields;
    const themeProp = {};

    if (name === 'classic') {
      editFields = state => fields(state);
      themeProp.as = select('as', OptionsHelper.themesFull, BaseShowEditPod.defaultProps.as);
    } else {
      editFields = state => <Fieldset>{fields(state, { labelInline: true, labelAlign: 'right' })}</Fieldset>;
      themeProp.podType = select('podType', OptionsHelper.themesFull, BaseShowEditPod.defaultProps.as);
    }

    return (
      <State store={ store }>
        {state => (
          <ShowEditPod
            border={ border }
            buttonAlign={ buttonAlign }
            cancel={ cancel }
            cancelText={ cancelText }
            deleteText={ deleteText }
            onDelete={ onDelete }
            onCancel={ onCancel }
            onEdit={ onEdit }
            saveText={ saveText }
            saving={ saving }
            title={ title }
            transitionName={ transitionName }
            validateOnMount={ validateOnMount }
            editFields={ editFields(state) }
            afterFormValidation={ afterFormValidation }
            { ...themeProp }
          >
            <Content key='first_name' title='First Name'>
            Alan
            </Content>
            <Content key='second_name' title='Last Name'>
            Smith
            </Content>
            <Content key='telephone' title='Telephone'>
            000 000 0000
            </Content>
          </ShowEditPod>
        )}

      </State>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('ShowEditPod', module)
  .addParameters({
    info: {
      propTablesExclude: [Content, State],
      text: info
    },
    knobs: { escapeHTML: false },
    notes: { markdown: notes }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
