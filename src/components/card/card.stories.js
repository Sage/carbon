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

// const cardProps = () => {
//   return {
//     key: 'one',
//     size: select('card size', OptionsHelper.sizesRestricted, Card.defaultProps.size),
//     border: boolean('border', false),
//     cardWidth: text('width', '500px')
//   };
// };

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
    footerSecondary: text('footer primary', 'Footer Secondary'),
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

// const headerProps = {
//   children: [
//     generateContentComponent(text('header primary', 'Header Primary', 'Header Content')),
//     generateContentComponent(text('header secondary', 'Header Secondary', 'Header Content'))
//   ],
//   align: select('header align', OptionsHelper.alignFull, OptionsHelper.alignFull[0], 'Header Content')
// };

// const middleProps = {
//   children: [
//     generateContentComponent(text('middle primary', 'Middle Primary', 'Middle Content')),
//     generateContentComponent(text('middle secondary', 'Middle Secondary', 'Middle Content')),
//     generateContentComponent(text('middle tertiary', 'Middle Tertiary', 'Middle Content'))
//   ],
//   align: select('middle align', OptionsHelper.alignFull, OptionsHelper.alignFull[0], 'Middle Content')
// };

// const footerProps = {
//   children: [
//     generateContentComponent(text('footer primary', 'Footer Primary', 'Footer Content')),
//     generateContentComponent(text('footer secondary', 'Footer Secondary', 'Footer Content'))
//   ],
//   align: select('footer align', OptionsHelper.alignFull, OptionsHelper.alignFull[0], 'Footer Content')
// };

storiesOf('Card', module)
  .add('default', () => {
    // const { border, cardSize, size } = cardProps();
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
      footerSecondary,
      footerAlign,
      cardWidth
    } = getKnobs();


    const headerProps = {
      children: [
        generateContentComponent(headerPrimary),
        generateContentComponent(headerSecondary)
      ],
      align: headerAlign
    };

    const middleProps = {
      children: [
        generateContentComponent(middlePrimary),
        generateContentComponent(middleSecondary),
        generateContentComponent(middleTertiary)
      ],
      align: middleAlign
    };

    const footerProps = {
      children: [
        generateContentComponent(footerPrimary),
        generateContentComponent(footerSecondary)
      ],
      align: footerAlign
    };

    return (
      <Card
        headerProps={ headerProps }
        middleProps={ middleProps }
        footerProps={ footerProps }
        size={ cardSize }
        border={ border }
        cardWidth={ cardWidth }
      />
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
