/* eslint-disable multiline-ternary */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Pill from './pill.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import classic from '../../style/themes/classic';
import { THEMES } from '../../style/themes';
import { notes, Info } from './documentation';

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
    children: text('children', 'Pill'),
    fill: boolean('fill', Pill.defaultProps.fill),
    onDelete: boolean('onDelete', false),
    theme
  };
  if (theme === THEMES.classic) {
    knobs.as = select('as', [...OptionsHelper.colors, 'disabled'], Pill.defaultProps.as);
  } else {
    Object.assign(knobs, getStatusKnobs());
  }
  return knobs;
};

storiesOf('Pill', module)
  .add(THEMES.classic, () => {
    const {
      children,
      as,
      fill,
      onDelete
    } = getKnobs(THEMES.classic);

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
    info: { Pill, text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  }).add('default', () => {
    const {
      children,
      colorVariant,
      fill,
      onDelete,
      pillRole
    } = getKnobs();
    return (
      <Pill
        colorVariant={ colorVariant }
        fill={ fill }
        onDelete={ onDelete ? action('delete') : null }
        pillRole={ pillRole }
      >
        { children }
      </Pill>
    );
  }, {
    info: { Pill, text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
