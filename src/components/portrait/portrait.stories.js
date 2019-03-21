import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Portrait from './portrait';
import { notes, info } from './documentation';

storiesOf('Portait', module).add(
  'default',
  () => {
    const alt = text('alt', Portrait.defaultProps.alt);
    const darkBackground = boolean('darkBackground', Portrait.defaultProps.darkBackground);
    const source = select('source', ['src', 'gravatar'], 'src');
    const gravatar = source === 'gravatar' ? text('gravatar') : undefined;
    const src = source === 'src' ? text('src') : undefined;
    const initials = text('initials', 'AZ');
    const shape = select('shape', OptionsHelper.shapesVaried, Portrait.defaultProps.shape);
    const size = select('size', OptionsHelper.sizesFull, Portrait.defaultProps.size);

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
  }
);
