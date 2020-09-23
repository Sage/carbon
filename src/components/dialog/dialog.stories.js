import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Dialog from './dialog.component';
import Form from '../form';
import Textbox from '../../__experimental__/components/textbox';
import Button from '../button';
import DateInput from '../../__experimental__/components/date';
import { Checkbox } from '../../__experimental__/components/checkbox';
import { Select, Option } from '../../__experimental__/components/select';
import { RadioButton, RadioButtonGroup } from '../../__experimental__/components/radio-button';
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

function makeStory(name, themeSelector, stickyFooter, disableChromatic = true) {
  const Component = () => {
    const [date, setDate] = useState('2020-06-01');
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesFull, Dialog.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Dialog.defaultProps.showCloseIcon);
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Dialog.defaultProps.ariaRole);
    const open = boolean('open', false);

    const selectOptions = [{
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
    }];

    return (
      <div>
        <Dialog
          onCancel={ handleCancel }
          height={ height }
          title={ title }
          subtitle={ subtitle }
          size={ size }
          showCloseIcon={ showCloseIcon }
          enableBackgroundUI={ enableBackgroundUI }
          disableEscKey={ disableEscKey }
          ariaRole={ ariaRole }
          onClick={ handleClick }
          open={ open }
        >
          <Form
            stickyFooter={ stickyFooter }
            leftSideButtons={ <Button onClick={ handleCancel }>Cancel</Button> }
            saveButton={ <Button buttonType='primary' type='submit'>Save</Button> }
          >
            <Textbox label='First Name' />
            <Textbox label='Middle Name' />
            <Textbox label='Surname' />
            <Textbox label='Birth Place' />
            <Textbox label='Favourite Colour' />
            <Textbox label='Address' />
            <DateInput
              name='date' label='Birthday'
              value={ date }
              onChange={ e => setDate(e.target.value.rawValue) }
            />
            <Select label='Color'>
              {selectOptions.map(option => (
                <Option
                  key={ option.name }
                  value={ option }
                  text={ option.name }
                />
              ))}
            </Select>
            <Textbox label='Pet Name' />
            <DateInput
              name='date' label="Pet's birthday"
              value={ date }
              onChange={ e => setDate(e.target.value.rawValue) }
            />
            <Checkbox name='checkbox' label='Do you like my Dog' />
            <div>This is an example of a dialog with a Form as content</div>
          </Form>
        </Dialog>
      </div>
    );
  };

  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, Component, metadata];
}

function makeButtonStory(name, themeSelector, stickyFooter, disableChromatic = false) {
  const Component = () => {
    const [date, setDate] = useState('2020-06-01');
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesFull, Dialog.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Dialog.defaultProps.showCloseIcon);
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Dialog.defaultProps.ariaRole);

    const selectOptions = [{
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
    }];

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
            enableBackgroundUI={ enableBackgroundUI }
            disableEscKey={ disableEscKey }
            ariaRole={ ariaRole }
            onClick={ handleClick }
          >
            <Form
              stickyFooter={ stickyFooter }
              leftSideButtons={ <Button onClick={ handleCancel }>Cancel</Button> }
              saveButton={ <Button buttonType='primary' type='submit'>Save</Button> }
            >
              <Textbox label='First Name' required />
              <Textbox label='Middle Name' aria-required />
              <Textbox label='Surname' />
              <Textbox label='Birth Place' />
              <Textbox label='Favourite Colour' />
              <Textbox label='Address' />
              <DateInput
                name='date' label='Birthday'
                value={ date }
                onChange={ e => setDate(e.target.value.rawValue) }
                aria-required
              />
              <Select label='Color' aria-required>
                {selectOptions.map(option => (
                  <Option
                    key={ option.name }
                    value={ option }
                    text={ option.name }
                  />
                ))}
              </Select>
              <Textbox label='Pet Name' />
              <DateInput
                name='date' label="Pet's birthday"
                value={ date }
                onChange={ e => setDate(e.target.value.rawValue) }
              />
              <Checkbox
                name='checkbox'
                label='Do you like my Dog'
                required
              />
              <RadioButtonGroup
                name='mybuttongroup'
                onChange={ () => console.log('change') }
                legend='Do you like animals?'
                required
                aria-required
              >
                <RadioButton
                  id='radio1'
                  value='radio1'
                  label='Dog'
                  required
                />
                <RadioButton
                  id='radio2'
                  value='radio2'
                  label='Cat'
                />
                <RadioButton
                  id='radio3'
                  value='radio3'
                  label='Other'
                />
              </RadioButtonGroup>
              <div>This is an example of a dialog with a Form as content</div>
            </Form>
          </Dialog>
        </State>
      </div>
    );
  };

  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, Component, metadata];
}

storiesOf('Dialog', module)
  .addParameters({
    info: {
      propTables: [Dialog]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('with sticky footer', dlsThemeSelector, true))
  .add(...makeButtonStory('with button', dlsThemeSelector))
  .add(...makeButtonStory('with button with sticky footer', dlsThemeSelector, true));
