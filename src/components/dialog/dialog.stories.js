import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { fromJS } from 'immutable';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Dialog from './dialog.component';
import Form from '../../__deprecated__/components/form';
import Textbox from '../../__deprecated__/components/textbox';
import Button from '../button';
import Modal from '../modal';
import DateInput from '../../__deprecated__/components/date';
import Checkbox from '../../__deprecated__/components/checkbox';
import Dropdown from '../../__deprecated__/components/dropdown';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Dialog.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /dialog(?!spec)/
);

const store = new Store({
  open: false
});

const handleCancel = (evt) => {
  store.set({ open: false });
  action('cancel')(evt);
};

const handleOpen = (evt) => {
  store.set({ open: true });
  action('open')(evt);
};

const handleClick = (evt) => {
  action('click')(evt);
};

function makeStory(name, themeSelector) {
  const component = () => {
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesFull, Dialog.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Dialog.defaultProps.showCloseIcon);
    const stickyFormFooter = boolean('stickyFormFooter', false);
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Dialog.defaultProps.ariaRole);

    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <State store={ store }>
          <Dialog
            open={ store.get('open') }
            onCancel={ handleCancel }
            height={ height }
            title={ title }
            subtitle={ subtitle }
            size={ size }
            showCloseIcon={ showCloseIcon }
            stickyFormFooter={ stickyFormFooter }
            enableBackgroundUI={ enableBackgroundUI }
            disableEscKey={ disableEscKey }
            ariaRole={ ariaRole }
            onClick={ handleClick }
          >
            <Form>
              <Textbox label='First Name' />
              <Textbox label='Middle Name' />
              <Textbox label='Surname' />
              <Textbox label='Birth Place' />
              <Textbox label='Favourite Colour' />
              <Textbox label='Address' />
              <DateInput name='date' label='Birthday' />
              <Dropdown
                name='foo' options={ fromJS([{
                  id: '1', name: 'Orange'
                }, {
                  id: '2', name: 'Blue'
                }, {
                  id: '3', name: 'Green'
                }, {
                  id: '4', name: 'Black'
                }, {
                  id: '5', name: 'Yellow'
                }, {
                  id: '6', name: 'White'
                }, {
                  id: '7', name: 'Magenta'
                }, {
                  id: '8', name: 'Cyan'
                }, {
                  id: '9', name: 'Red'
                }, {
                  id: '10', name: 'Grey'
                }, {
                  id: '11', name: 'Purple'
                }]) }
                value='1'
              />
              <Textbox label='Pet Name' />
              <DateInput name='date' label="Pet's birthday" />
              <Checkbox name='checkbox' label='Do you like my Dog' />
              <div>This is an example of a dialog with a Form as content</div>
            </Form>
          </Dialog>
        </State>
      </div>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      propTablesExclude: [
        Button,
        State,
        Form,
        Textbox,
        Checkbox,
        DateInput,
        Dropdown,
        Modal
      ]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Dialog', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
