import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import Icon from '.';

storiesOf('Icon', module)
  .add('default', () => {
    const type = select('type', OptionsHelper.icons, 'add');
    const bgTheme = select('bgTheme', [...OptionsHelper.colors, ''], '');
    const bgSize = bgTheme ? select(
      'bgSize',
      OptionsHelper.sizesRestricted,
      Icon.defaultProps.bgSize
    ) : undefined;
    const bgShape = bgTheme ? select('bgShape', OptionsHelper.shapes, OptionsHelper.shapes[0]) : undefined;
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
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
