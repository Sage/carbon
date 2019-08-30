import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Card from './card.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import Icon from '../icon';
import Link from '../link';
import Heading from '../heading';
import CardContent from './card-content';

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

const generateContentComponent = (type, content, props) => {
  switch (type.toLowerCase()) {
    case 'link':
      return <Link { ...props }>{ content }</Link>;
    case 'icon':
      return <Icon type='add' { ...props } />;
    case 'heading':
      return (
        <Heading
          title={ content }
          divider={ false }
          { ...props }
        />
      );
    default:
      return <CardContent { ...props }>{ content }</CardContent>;
  }
};

const getKnobs = () => {
  const knobs = {
    cardSize: select('card size', OptionsHelper.sizesRestricted, Card.defaultProps.padding),
    headerKnobs: {
      headerPrimary: {
        type: select('header primary type', ['link', 'heading', 'icon', 'content'], 'content'),
        contentText: text('header primary text', 'Primary'),
        align: select('header primary align', OptionsHelper.alignFull, 'center')
      },
      headerSecondary: {
        type: select('header secondary type', ['link', 'heading', 'icon', 'content'], 'content'),
        contentText: text('header secondary', 'Secondary'),
        align: select('header secondary align', OptionsHelper.alignFull, 'center')
      }
    },
    headerInline: boolean('header inline', false),
    middleKnobs: {
      middlePrimary: {
        type: select('middle primary type', ['link', 'heading', 'icon', 'content'], 'content'),
        contentText: text('middle primary text', 'Primary'),
        align: select('middle primary align', OptionsHelper.alignFull, 'center')
      },
      middleSecondary: {
        type: select('middle secondary type', ['link', 'heading', 'icon', 'content'], 'content'),
        contentText: text('middle secondary', 'Secondary'),
        align: select('middle secondary align', OptionsHelper.alignFull, 'center')
      }
    },
    middleInline: boolean('middle inline', false),
    footerKnobs: {
      footerPrimary: {
        type: select('footer primary type', ['link', 'heading', 'icon', 'content'], 'content'),
        contentText: text('footer primary text', 'Primary'),
        align: select('footer primary align', OptionsHelper.alignFull, 'center')
      },
      footerSecondary: {
        type: select('footer secondary type', ['link', 'heading', 'icon', 'content'], 'content'),
        contentText: text('footer secondary', 'Secondary'),
        align: select('footer secondary align', OptionsHelper.alignFull, 'center')
      }
    },
    footerFilled: boolean('footer background fill', false),
    border: boolean('border', false),
    cardWidth: text('width', '500px')
  };
  return knobs;
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

const buildContnent = (config, props) => {
  return Object.values(config).map(({ type, contentText, align }) => {
    return generateContentComponent(type, contentText, { align, ...props });
  });
};

storiesOf('Card', module)
  .add('default', () => {
    const {
      cardSize,
      border,
      headerKnobs,
      headerInline,
      middleKnobs,
      middleInline,
      footerKnobs,
      footerFilled,
      cardWidth
    } = getKnobs();

    const headerProps = {
      positionType: 'header'
      // align: headerAlign
      // add inline stuff for content as well as row?
    };
    const middleProps = {
      positionType: 'middle'
      // align: middleAlign
    };

    const footerProps = {
      positionType: 'footer'
      // align: footerAlign
    };

    const header = buildContnent(headerKnobs, headerProps);

    const middle = buildContnent(middleKnobs, middleProps);

    const footer = buildContnent(footerKnobs, footerProps);

    const cardRows = [
      { positionType: 'header', content: header, inline: headerInline },
      { positionType: 'middle', content: middle, inline: middleInline },
      { positionType: 'footer', content: footer }
    ];

    return (
      <Card
        padding={ cardSize }
        border={ border }
        cardWidth={ cardWidth }
        cardRows={ cardRows }
        footerFilled={ footerFilled }
      />
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
