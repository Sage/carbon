import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import Card from './card.component';

storiesOf('Card', module)
  .add('default', () => {
    const description = text('description', 'this is a description');
    const header = text('header', 'this is a header');
    const footer = text('footer', 'this is a footer');
    const border = boolean('border', true);


    return (
      <Card
        border={ border }
        description={ description }
        header={ header }
        footer={ footer }
      />
    );
  });
