import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import i18n from 'i18n-js';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import I18nComponent from './i18n';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

i18n.translations = {
  en: {
    my: {
      example: '# My __example__ translation.'
    }
  }
};

storiesOf('I18nComponent', module)
  .add('default', () => {
    const markdown = boolean('markdown', true);
    const inline = markdown ? boolean('inline', I18nComponent.defaultProps.inline) : undefined;
    const scope = text('scope', 'my.example');
    return (
      <I18nComponent
        markdown={ markdown }
        inline={ inline }
        scope={ scope }
      />
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
