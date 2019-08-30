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

const cardKnobs = () => {
  return {
    key: 'one',
    cardSize: select('card size', OptionsHelper.sizesRestricted, Card.defaultProps.padding, 'Card Knobs'),
    border: boolean('border', false, 'Card Knobs'),
    cardWidth: text('width', '500px', 'Card Knobs'),
    headerInline: boolean('header inline', false, 'Card Knobs'),
    middleInline: boolean('middle inline', false, 'Card Knobs'),
    footerFilled: boolean('footer background', false, 'Card Knobs'),
    clickable: boolean('interactive card', false, 'Card Knobs')
  };
};

const headerKnobs = () => {
  return {
    key: 'two',
    headerPrimary: {
      type: select('header primary type', ['link', 'heading', 'icon', 'content'], 'content', 'Header Knobs'),
      contentText: text('header primary text', 'Primary', 'Header Knobs'),
      align: select('header primary align', OptionsHelper.alignFull, 'center', 'Header Knobs')
    },
    headerSecondary: {
      type: select('header secondary type', ['link', 'heading', 'icon', 'content'], 'content', 'Header Knobs'),
      contentText: text('header secondary', 'Secondary', 'Header Knobs'),
      align: select('header secondary align', OptionsHelper.alignFull, 'center', 'Header Knobs')
    }
  };
};

const middleKnobs = () => {
  return {
    key: 'three',
    middlePrimary: {
      type: select('middle primary type', ['link', 'heading', 'icon', 'content'], 'content', 'Middle Knobs'),
      contentText: text('middle primary text', 'Primary', 'Middle Knobs'),
      align: select('middle primary align', OptionsHelper.alignFull, 'center', 'Middle Knobs')
    },
    middleSecondary: {
      type: select('middle secondary type', ['link', 'heading', 'icon', 'content'], 'content', 'Middle Knobs'),
      contentText: text('middle secondary', 'Secondary', 'Middle Knobs'),
      align: select('middle secondary align', OptionsHelper.alignFull, 'center', 'Middle Knobs')
    }
  };
};

const footerKnobs = () => {
  return {
    key: 'four',
    footerPrimary: {
      type: select('footer primary type', ['link', 'heading', 'icon', 'content'], 'content', 'Footer Knobs'),
      contentText: text('footer primary text', 'Primary', 'Footer Knobs'),
      align: select('footer primary align', OptionsHelper.alignFull, 'center', 'Footer Knobs')
    },
    footerSecondary: {
      type: select('footer secondary type', ['link', 'heading', 'icon', 'content'], 'content', 'Footer Knobs'),
      contentText: text('footer secondary', 'Secondary', 'Footer Knobs'),
      align: select('footer secondary align', OptionsHelper.alignFull, 'center', 'Footer Knobs')
    }
  };
};

const buildContnent = (config, props) => {
  return Object.values(config).map((obj) => {
    const { type, contentText, align } = obj;
    return generateContentComponent(type, contentText, { align, ...props });
  });
};

storiesOf('Card', module)
  .add('default', () => {
    const {
      cardSize,
      border,
      headerInline,
      middleInline,
      footerFilled,
      cardWidth
    } = cardKnobs();

    const header = buildContnent(
      { headerPrimary: headerKnobs().headerPrimary, headerSecondary: headerKnobs().headerSecondary },
      { positionType: 'header' }
    );

    const middle = buildContnent(
      { middlerimary: middleKnobs().middlePrimary, middleSecondary: middleKnobs().middleSecondary },
      { positionType: 'middle' }
    );

    const footer = buildContnent(
      { footerPrimary: footerKnobs().footerPrimary, footerSecondary: footerKnobs().footerSecondary },
      { positionType: 'footer' }
    );

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
