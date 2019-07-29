import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import Icon from '.';
import classicTheme from '../../style/themes/classic';

function commonKnobs() {
  const tooltipMessage = text('tooltipMessage', '');
  return {
    type: select('type', OptionsHelper.icons, 'add'),
    tooltipPosition: tooltipMessage ? select('tooltipPosition', OptionsHelper.positions, 'top') : undefined,
    tooltipAlign: tooltipMessage ? select('tooltipAlign', OptionsHelper.alignAroundEdges, 'top') : undefined
  };
}

function classicKnobs() {
  const bgTheme = select('bgTheme', [...OptionsHelper.colors, ''], '');
  return {
    bgTheme,
    bgSize: bgTheme !== '' ? select('bgSize', OptionsHelper.sizesRestricted, Icon.defaultProps.bgSize) : undefined,
    bgShape: bgTheme !== '' ? select('bgShape', OptionsHelper.shapes, OptionsHelper.shapes[0]) : undefined
  };
}

function dlsKnobs() {
  const bgTheme = select('bgTheme', [...OptionsHelper.iconBackgrounds], 'none');
  return {
    bgTheme,
    bgSize: bgTheme !== 'none' ? select('bgSize', OptionsHelper.sizesRestricted, Icon.defaultProps.bgSize) : undefined,
    bgShape: bgTheme !== 'none' ? select('bgShape', OptionsHelper.shapes, OptionsHelper.shapes[0]) : undefined,
    fontSize: select('fontSize', OptionsHelper.sizesBinary, Icon.defaultProps.fontSize),
    iconColor:
      bgTheme === 'none' ? select('iconColor', [...OptionsHelper.iconColors], OptionsHelper.iconColors[0]) : undefined
  };
}

storiesOf('Icon', module)
  .add(
    'classic',
    () => (
      <ThemeProvider theme={ classicTheme }>
        <Icon { ...commonKnobs() } { ...classicKnobs() } />
      </ThemeProvider>
    ),
    {
      info: { text: Info },
      notes: { markdown: notes },
      knobs: { escapeHTML: false }
    }
  )
  .add('default', () => <Icon { ...commonKnobs() } { ...dlsKnobs() } />, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
