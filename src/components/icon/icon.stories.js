import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import Icon from '.';
import classicTheme from '../../style/themes/classic';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Icon.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /icon(?!spec)/
);

function commonKnobs() {
  const tooltipMessage = text('tooltipMessage', '');
  return {
    tooltipMessage,
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
  const fontSize = select('fontSize', OptionsHelper.sizesBinary, Icon.defaultProps.fontSize);
  const canSizeBg = bgTheme !== 'none' && fontSize !== ' large';
  return {
    bgTheme,
    fontSize,
    bgSize: canSizeBg ? select('bgSize', OptionsHelper.sizesRestricted, Icon.defaultProps.bgSize) : undefined,
    bgShape: bgTheme !== 'none' ? select('bgShape', OptionsHelper.shapes, OptionsHelper.shapes[0]) : undefined,
    iconColor:
      bgTheme === 'none' ? select('iconColor', [...OptionsHelper.iconColors], OptionsHelper.iconColors[0]) : undefined,
    disabled: boolean('disabled', Icon.defaultProps.disabled)
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
      themeSelector: classicThemeSelector,
      info: { text: Info },
      notes: { markdown: notes },
      knobs: { escapeHTML: false }
    }
  )
  .add('default', () => {
    const props = dlsKnobs();

    if (props.iconColor === 'on-dark-background') props.bgTheme = 'info';

    return <Icon { ...commonKnobs() } { ...props } />;
  }, {
    themeSelector: dlsThemeSelector,
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
