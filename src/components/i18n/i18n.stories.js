import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import i18n from 'i18n-js';
import notes from './notes.md';
import I18nComponent from './i18n';

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
          
          <h2>How to use an I18n component:</h2>
          
          <p>In your file:</p>
          
          <code>{'import I18n from "carbon-react/lib/components/i18n";'}</code>
  
          <p>To render the message:</p>
          
          <code>{'<I18n scope="foo" />'}</code>
          
          <p>For additional properties specific to this component, see propTypes.</p>
        </div>
      )
    },
    notes: { markdown: notes }
  });
