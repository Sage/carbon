import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import { notes, info } from './documentation';
import DialogFullScreen from '.';
import Button from '../button';
import Form from '../../__deprecated__/components/form';
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

function makeStory(name, themeSelector) {
  const component = () => {
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const children = text('children', 'Text Content');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const showCloseIcon = boolean('showCloseIcon', true);
    const ariaRole = text('ariaRole', 'dialog');

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
            { children }
          </DialogFullScreen>
        </State>
      </div>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

function makeStickyFooterStory(name, themeSelector) {
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
            <Form stickyFooter>
              { children }
              <div style={ { height: formHeight } } />
            </Form>
          </DialogFullScreen>
        </State>
      </div>
    );
  };

  const metadata = {
    themeSelector
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
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector))
  .add(...makeStickyFooterStory('with sticky footer', dlsThemeSelector))
  .add(...makeStickyFooterStory('with sticky footer classic', classicThemeSelector));
