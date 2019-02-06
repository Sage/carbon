import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import notes from './notes.md';
import Button from './button';

storiesOf('Button', module)
  .addParameters({
    info: { inline: true, header: false }
  })
  .add('with text', () => (
    <Button disabled={ boolean('disabled', false) } onClick={ action('click') }>
      {text('Label', 'Hello Storybook')}
    </Button>
  ))
  .add('with some emoji', () => (
    <Button><span role='img' aria-label='so cool'>😀 😎 👍 💯</span></Button>
  ))
  .add('accessibility', () => (
    <Button style={ { background: 'black', color: 'black' } }>Bad</Button>
  ))
  .add('with notes', () => <Button>Button with notes</Button>, { notes });
