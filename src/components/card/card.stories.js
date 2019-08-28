import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Card from './card.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import Icon from '../icon';
import Link from '../link';

Card.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /card.component(?!spec)/
);

const getKnobs = () => {
  const knobs = {
    cardSize: select('card size', OptionsHelper.sizesRestricted, Card.defaultProps.size),
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

const generateContentComponent = (content) => {
  switch (content) {
    case 'link':
      return <Link href='nufc.com'>This is a link</Link>;
    case 'icon':
      return <Icon type='add' />;
    default:
      return content;
  }
};

storiesOf('Card', module)
  .add('default', () => {
    const {
      cardSize,
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
      primary: generateContentComponent(headerPrimary),
      secondary: generateContentComponent(headerSecondary),
      align: headerAlign
    };

    const middleProps = {
      primary: generateContentComponent(middlePrimary),
      secondary: generateContentComponent(middleSecondary),
      tertiary: generateContentComponent(middleTertiary),
      align: middleAlign
    };

    const footerProps = {
      primary: generateContentComponent(footerPrimary),
      align: footerAlign
    };

    return (
      <Card
        size={ cardSize }
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
