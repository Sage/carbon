import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Portrait from './portrait';
import notes from './notes.md';

storiesOf('Portait', module)
  .add('default', () => {
    const alt = text('alt');
    const className = text('className', '');
    const darkBackground = boolean('darkBackground', false);
    const gravatar = text('gravatar');
    const initials = text('initials');
    const shape = select('shape', OptionsHelper.shapesVaried, OptionsHelper.shapesVaried[0]);
    const size = select('size', OptionsHelper.sizesFull, OptionsHelper.sizesFull[3]);
    const src = text('src');


    return (
      <Portrait
        alt={ alt }
        className={ className }
        darkBackground={ darkBackground }
        gravatar={ gravatar }
        initials={ initials }
        shape={ shape }
        size={ size }
        src={ src }
      />
    );
  }, {
    notes: { markdown: notes }
  });
