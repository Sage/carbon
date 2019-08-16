import React from 'react';
import { storiesOf } from '@storybook/react';
import { array, boolean, text } from '@storybook/addon-knobs';
import Card from './card.component';

storiesOf('Card', module)
  .add('default', () => {
    const middle = array('middle',
      [{
        primary: 'primary description text',
        secondary: 'secondary description text',
        tertiary: 'tertiary description text'
      }]);
    const header = array('header',
      [{
        title: 'this is a title',
        subtitle: 'this is a subtitle',
        icon: '/path/to/icon.svg'
      }]);
    const footer = text('footer', 'this is a footer');
    const border = boolean('border', false);
    const cardWidth = text('width', '500px');


    return (
      <Card
        border={ border }
        middle={ middle }
        header={ header }
        footer={ footer }
        cardWidth={ cardWidth }
      />
    );
  });
