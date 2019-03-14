import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Portrait from './portrait';
import { notes, info } from './documentation';

storiesOf('Portait', module)
  .add('default', () => {
    const alt = text('alt', Portrait.alt);
    const darkBackground = boolean('darkBackground', Portrait.darkBackground);
    const gravatar = text('gravatar');
    const initials = text('initials');
    const shape = select('shape', OptionsHelper.shapesVaried, Portrait.shape);
    const size = select('size', OptionsHelper.sizesFull, OptionsHelper.size);
    const src = text('src');


    return (
      <Portrait
        alt={ alt }
        darkBackground={ darkBackground }
        gravatar={ gravatar }
        initials={ initials }
        shape={ shape }
        size={ size }
        src={ src }
      />
    );
  },
  {
    info: { text: info },
    notes: { markdown: notes }
  });
