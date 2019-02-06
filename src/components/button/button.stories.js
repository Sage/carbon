import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';
import notes from './notes.md';
import Button from './button';

const SmallBusiness = styled.button`background: ${({ theme }) => theme.main};`;
const MediumBusiness = styled.button`background: ${({ theme }) => theme.secondary};`;
const smallBusiness = <SmallBusiness>small business</SmallBusiness>;
const mediumBusiness = <MediumBusiness>medium business</MediumBusiness>;
const options = {
  smallBusiness: 'smallBsuiness',
  mediumBusiness: 'mediumBusiness'
};

storiesOf('Button', module)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add('themed', () => {
    const selectedTheme = select('theme', options, options.mediumBusiness);

    switch (selectedTheme) {
      case options.smallBusiness:
        return smallBusiness;
      case options.mediumBusiness:
      default:
        return mediumBusiness;
    }
  })
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
