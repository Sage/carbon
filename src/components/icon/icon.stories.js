import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Icon from './icon';

storiesOf('Icon', module)
  .add('default', () => {
    const type = select('type', OptionsHelper.icons, 'add');
    const bgTheme = select('bgTheme', OptionsHelper.colors, 'default');
    const bgSize = select(
      'bgSize',
      OptionsHelper.sizesRestricted,
      Icon.defaultProps.bgSize
    );
    const bgShape = select('bgShape', OptionsHelper.shapes);
    const tooltipMessage = text('tooltipMessage', '');
    const tooltipPosition = tooltipMessage ? select(
      'tooltipPosition',
      OptionsHelper.positions,
      'top'
    ) : undefined;
    const tooltipAlign = tooltipMessage ? select(
      'tooltipAlign',
      OptionsHelper.alignAroundEdges,
      'top'
    ) : undefined;

    return (
      <Icon
        type={ type }
        bgSize={ bgSize }
        bgShape={ bgShape }
        bgTheme={ bgTheme }
        tooltipMessage={ tooltipMessage }
        tooltipPosition={ tooltipPosition }
        tooltipAlign={ tooltipAlign }
      />
    );
  }, {
    notes: { markdown: notes }
  });
