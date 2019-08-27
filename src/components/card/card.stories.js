import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Card from './card.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Card.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /card.component(?!spec)/
);

const getKnobs = () => {
  const knobs = {
    headerPrimary: text('header primary', 'Header Primary'),
    headerSecondary: text('header secondary', 'Header Secondary'),
    headerAlign: select('header align', OptionsHelper.alignFull),
    middlePrimary: text('middle primary', 'Middle Primary'),
    middleSecondary: text('middle secondary', 'Middle Secondary'),
    middleTertiary: text('middle tertiary', 'Middle Tertiary'),
    middleAlign: select('middle align', OptionsHelper.alignFull),
    footerPrimary: text('footer primary', 'Footer Primary'),
    footerAlign: select('footer align', OptionsHelper.alignFull),
    border: boolean('border', false),
    cardWidth: text('width', '500px')
  };
  return knobs;
};

storiesOf('Card', module)
  .add('default', () => {
    const {
      border,
      headerPrimary,
      headerSecondary,
      headerAlign,
      middlePrimary,
      middleSecondary,
      middleTertiary,
      middleAlign,
      footerPrimary,
      footerAlign,
      cardWidth
    } = getKnobs();

    const headerProps = {
      primary: headerPrimary,
      secondary: headerSecondary,
      align: headerAlign
    };

    const middleProps = {
      primary: middlePrimary,
      secondary: middleSecondary,
      tertiary: middleTertiary,
      align: middleAlign
    };

    const footerProps = {
      primary: footerPrimary,
      align: footerAlign
    };

    return (
      <Card
        border={ border }
        headerProps={ headerProps }
        middleProps={ middleProps }
        footerProps={ footerProps }
        cardWidth={ cardWidth }
      />
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
