import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import NavigationBar from './navigation-bar';
import Link from '../link/link';
import notes from './notes.md';

const handleClick = (ev) => {
  ev.target.preventDefault();
  action('click');
};

storiesOf('Navigation Bar', module)
  .addParameters({
    info: {
      propTablesExclude: [Link]
    }
  })
  .add('default', () => {
    const as = select(
      'as',
      ['primary', 'secondary', 'transparent'],
      NavigationBar.defaultProps.as
    );

    return (
      <NavigationBar
        as={ as }
      >
        <Link href='/components/navigation-bar' onClick={ handleClick }>Link 1</Link>
        <Link href='/components/navigation-bar' onClick={ handleClick }>Link 2</Link>
        <Link href='/components/navigation-bar' onClick={ handleClick }>Link 3</Link>
      </NavigationBar>
    );
  }, {
    info: {
      text: `
        Renders a full width application bar.
      `
    },
    notes: { markdown: notes }
  });
