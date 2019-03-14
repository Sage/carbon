import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Help from './help';

storiesOf('Help', module)
  .add('default', () => {
    const children = text('children', 'This is help text');
    const tooltipPosition = children ? select(
      'tooltipPosition',
      OptionsHelper.positions,
      'right'
    ) : undefined;
    const tooltipAlign = children ? select(
      'tooltipAlign',
      OptionsHelper.alignAroundEdges,
      Help.defaultProps.tooltipAlign
    ) : undefined;
    const href = text('href', '');

    return (
      <Help
        tooltipPosition={ tooltipPosition }
        tooltipAlign={ tooltipAlign }
        href={ href }
      >
        {children}
      </Help>
    );
  }, {
    notes: { markdown: notes }
  });
