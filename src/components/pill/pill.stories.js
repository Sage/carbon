/* eslint-disable multiline-ternary */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  text, number, select, boolean
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import Pill from './pill.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import { isClassic } from '../../utils/helpers/style-helper';
import classic from '../../style/themes/classic';
import { notes, Info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Pill.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /pill\.component(?!spec)/
);

const getStatusKnobs = () => {
  const pillRole = select('pillRole', [...OptionsHelper.pillRoles], 'tag');

  return {
    pillRole,
    colorVariant: (pillRole === 'status') ? select('colorVariant',
      [...OptionsHelper.pillColors, OptionsHelper.colors[7]], OptionsHelper.pillColors[0]) : null
  };
};

const getKnobs = (theme) => {
  const knobs = {
    ml: number('ml', 0),
    mr: number('mr', 0),
    children: text('children', 'Pill'),
    fill: boolean('fill', Pill.defaultProps.fill),
    onDelete: boolean('onDelete', false),
    theme
  };

  if (theme && isClassic(theme)) {
    knobs.as = select('as', [...OptionsHelper.colors, 'disabled'], Pill.defaultProps.as);
  } else {
    knobs.size = select('size', OptionsHelper.pillSizesRestricted, Pill.defaultProps.size);
    Object.assign(knobs, getStatusKnobs());
  }
  return knobs;
};

storiesOf('Pill', module)
  .add('classic', () => {
    const {
      children,
      as,
      fill,
      onDelete
    } = getKnobs(classic);

    return (
      <ThemeProvider theme={ classic }>
        <Pill
          as={ as }
          fill={ fill }
          onDelete={ onDelete ? action('delete') : null }
        >
          {children}
        </Pill>
      </ThemeProvider>
    );
  }, {
    themeSelector: classicThemeSelector,
    info: {
      Pill,
      text: Info,
      propTablesExclude: [ThemeProvider]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true
    }
  }).add('default', () => {
    const {
      children,
      colorVariant,
      fill,
      onDelete,
      pillRole,
      size,
      ml,
      mr
    } = getKnobs();
    return (
      <Pill
        colorVariant={ colorVariant }
        fill={ fill }
        onDelete={ onDelete ? action('delete') : null }
        pillRole={ pillRole }
        size={ size }
        ml={ ml }
        mr={ mr }
      >
        { children }
      </Pill>
    );
  }, {
    themeSelector: dlsThemeSelector,
    info: { Pill, text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
