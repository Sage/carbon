import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Card from './card.component';
import OptionsHelper from '../../utils/helpers/options-helper';

const getKnobs = () => {
  const knobs = {
    header: boolean('include header', true),
    headerPrimary: text('header primary', 'Header Primary'),
    headerSecondary: text('header secondary', 'Header Secondary'),
    headerAlign: select('header align', OptionsHelper.alignFull),
    middle: boolean('include middle', true),
    middlePrimary: text('middle primary', 'Middle Primary'),
    middleSecondary: text('middle secondary', 'Middle Secondary'),
    middleTertiary: text('middle tertiary', 'Middle Tertiary'),
    middleAlign: select('middle align', OptionsHelper.alignFull),
    footer: boolean('include footer', true),
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
      header,
      middle,
      footer,
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
    return (
      <Card
        header={ header }
        middle={ middle }
        footer={ footer }
        border={ border }
        headerPrimary={ headerPrimary }
        headerSecondary={ headerSecondary }
        headerAlign={ headerAlign }
        middlePrimary={ middlePrimary }
        middleSecondary={ middleSecondary }
        middleAlign={ middleAlign }
        middleTertiary={ middleTertiary }
        footerPrimary={ footerPrimary }
        footerAlign={ footerAlign }
        cardWidth={ cardWidth }
      />
    );
  });
