import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { fromJS } from 'immutable';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Dialog from './dialog.component';
import Form from '../form';
import Textbox from '../textbox';
import Button from '../button/button';
import Modal from '../modal/modal';
import DateInput from '../date';
import Dropdown from '../dropdown/dropdown';
import Checkbox from '../checkbox/checkbox';

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

storiesOf('Dialog', module)
  .add('default', () => {
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesFull, Dialog.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Dialog.defaultProps.showCloseIcon);
    const autoFocus = boolean('autoFocus', Dialog.defaultProps.autoFocus);
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
            autoFocus={ autoFocus }
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
  }, {
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
  });
