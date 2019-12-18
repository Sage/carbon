import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import Message from './message.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Message.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /message\.component(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    const variant = select('type', OptionsHelper.messages, Message.defaultProps.variant);
    const open = boolean('open', Message.defaultProps.open);
    const title = text('title');
    const id = text('id', 'custom-id');
    const transparent = boolean('transparent', Message.defaultProps.transparent);
    const children = text('children', 'This is some information from the Message Component.');

    // Allows onDismiss knob to be a boolean, but pass a function to component
    const onDismiss = boolean('onDismiss', true);
    const testOnDismiss = onDismiss ? (evt) => { action('click')(evt); } : undefined;

    return (
      <Message
        variant={ variant } open={ open }
        title={ title } transparent={ transparent }
        onDismiss={ testOnDismiss }
        id={ id }
      >
        {children}
      </Message>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Message', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
