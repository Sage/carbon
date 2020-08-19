import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import { notes, info } from './documentation';
import DialogFullScreen from '.';
import Button from '../button';
import Form from '../form';
import getDocGenInfo from '../../utils/helpers/docgen-info';

DialogFullScreen.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /dialog-full-screen(?!spec)/
);

const store = new Store({
  open: false
});

const handleCancel = () => {
  store.set({ open: false });
  action('cancel')();
};

const handleOpen = () => {
  store.set({ open: true });
  action('open')();
};

const handleClick = (evt) => {
  action('click')(evt);
};

function makeStory(name, themeSelector, stickyFooter, disableChromatic = false) {
  const component = () => {
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const children = text('children', 'Text Content');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const showCloseIcon = boolean('showCloseIcon', true);
    const ariaRole = text('ariaRole', 'dialog');
    const open = boolean('open', false);
    const formHeight = text('form height', '2000px');

    return (
      <div>
        <DialogFullScreen
          onCancel={ handleCancel }
          title={ title }
          subtitle={ subtitle }
          enableBackgroundUI={ enableBackgroundUI }
          disableEscKey={ disableEscKey }
          ariaRole={ ariaRole }
          onClick={ handleClick }
          showCloseIcon={ showCloseIcon }
          open={ open }
        >
          <Form
            stickyFooter={ stickyFooter }
            leftSideButtons={ <Button onClick={ handleCancel }>Cancel</Button> }
            saveButton={ <Button buttonType='primary' type='submit'>Save</Button> }
          >
            { children }
            <div style={ { height: formHeight } } />
          </Form>
        </DialogFullScreen>
      </div>
    );
  };

  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

function makeButtonStory(name, themeSelector, stickyFooter, disableChromatic = false) {
  const component = () => {
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const children = text('children', 'Text Content');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const showCloseIcon = boolean('showCloseIcon', true);
    const ariaRole = text('ariaRole', 'dialog');
    const formHeight = text('form height', '2000px');

    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <State store={ store }>
          <DialogFullScreen
            open={ store.get('open') }
            onCancel={ handleCancel }
            title={ title }
            subtitle={ subtitle }
            enableBackgroundUI={ enableBackgroundUI }
            disableEscKey={ disableEscKey }
            ariaRole={ ariaRole }
            onClick={ handleClick }
            showCloseIcon={ showCloseIcon }
          >
            <Form
              stickyFooter={ stickyFooter }
              leftSideButtons={ <Button onClick={ handleCancel }>Cancel</Button> }
              saveButton={ <Button buttonType='primary' type='submit'>Save</Button> }
            >
              { children }
              <div style={ { height: formHeight } } />
            </Form>
          </DialogFullScreen>
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

  return [name, component, metadata];
}

storiesOf('Dialog Full Screen', module)
  .addParameters({
    info: {
      propTablesExclude: [Button, State],
      text: info
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add(...makeStory('default', dlsThemeSelector, false))
  .add(...makeButtonStory('with button', dlsThemeSelector, false, true))
  .add(...makeStory('with sticky footer', dlsThemeSelector, true, true))
  .add(...makeButtonStory('with button with sticky footer', dlsThemeSelector, true, true));
