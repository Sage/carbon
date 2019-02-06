import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';
import notes from './notes.md';
import Button from './button';

const ThemedButton = styled.button`
  background: ${({ theme }) => theme.main};
  height: 50px;
  width: 150px;
`;

storiesOf('Button', module)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add('themed', () => <ThemedButton>Themed Button</ThemedButton>)
  .add('with text', () => (
    <Button
      disabled={ boolean('disabled', false) }
      onClick={ linkTo('Button', 'with some emoji') }
    >
      {text('Label', 'Hello Storybook')}
    </Button>
  ))
  .add('with some emoji', () => (
    <Button
      onClick={ () => {
        action('click')();
        linkTo('Button', 'with text')();
      } }
    ><span role='img' aria-label='so cool'>😀 😎 👍 💯</span>
    </Button>
  ))
  .add('accessibility', () => (
    <Button style={ { background: 'black', color: 'black' } }>Bad</Button>
  ))
  .add('with notes', () => <Button>Button with notes</Button>, {
    notes: { markdown: notes }
  });
