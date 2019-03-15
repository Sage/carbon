import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import i18n from 'i18n-js';
import notes from './notes.md';
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
    info: {
      text: (
        <div>
          <p>A widget for internationalisation of text.</p>

          <StoryHeader>How to use an I18n component:</StoryHeader>

          <p>In your file:</p>

          <StoryCode padded>
            {'import I18n from "carbon-react/lib/components/i18n";'}
          </StoryCode>

          <p>To render the message:</p>

          <StoryCode padded>
            {'<I18n scope="foo" />'}
          </StoryCode>

          <p>For additional properties specific to this component, see propTypes.</p>
        </div>
      )
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
