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

const { cardTextTypes } = OptionsHelper;

const generateContentComponent = (type, content, props) => {
  switch (type.toLowerCase()) {
    case 'link':
      return <Link { ...props }>{ content }</Link>;
    case 'icon':
      return <Icon type={ content } { ...props } />;
    case 'heading':
      return (
        <Heading
          title={ content }
          divider={ false }
          { ...props }
        />
      );
    default:
      return content;
  }
};

const buildContnent = (config, props) => {
  return Object.values(config).map((obj) => {
    const {
      align, contentType, contentText
    } = obj;
    const { positionType, ...rest } = props;
    return (
      <CardContent
        align={ align }
        type={ { position: positionType, contentStyle: contentType } }
        { ...rest }
      >
        { generateContentComponent(contentType, contentText, {}) }
      </CardContent>
    );
  });
};

const cardKnobs = () => {
  return {
    key: 'one',
    border: boolean('border', false, 'Card Knobs'),
    cardSpacing: select('card spacing', OptionsHelper.sizesRestricted, Card.defaultProps.spacing, 'Card Knobs'),
    cardWidth: text('width', '500px', 'Card Knobs'),
    clickable: boolean('interactive card', false, 'Card Knobs'),
    draggable: boolean('draggable card', false, 'Card Knobs'),
    headerInline: boolean('header inline', false, 'Header Knobs'),
    middleInline: boolean('middle inline', false, 'Middle Knobs'),
    footerFilled: boolean('footer background', false, 'Footer Knobs')
  };
};

const headerKnobs = () => {
  return {
    key: 'two',
    headerPrimary: {
      contentType: select(
        'header primary type',
        [
          'link',
          'heading',
          'icon',
          cardTextTypes[0],
          cardTextTypes[1]
        ],
        'primary',
        'Header Knobs'
      ),
      contentText: text('header one text', 'Primary', 'Header Knobs'),
      align: select('header one align', OptionsHelper.alignFull, 'center', 'Header Knobs')
    },
    headerSecondary: {
      contentType: select(
        'header two type', ['link', 'heading', 'icon', cardTextTypes[0], cardTextTypes[1]], 'primary', 'Header Knobs'
      ),
      contentText: text('header two text', 'Secondary', 'Header Knobs'),
      align: select('header two align', OptionsHelper.alignFull, 'center', 'Header Knobs')
    }
  };
};

const middleKnobs = () => {
  return {
    key: 'three',
    middlePrimary: {
      contentType: select(
        'middle primary type', ['link', 'heading', 'icon', ...cardTextTypes], 'primary', 'Middle Knobs'
      ),
      contentText: text('middle one text', 'Primary', 'Middle Knobs'),
      align: select('middle one align', OptionsHelper.alignFull, 'center', 'Middle Knobs')
    },
    middleSecondary: {
      contentType: select(
        'middle two type', ['link', 'heading', 'icon', ...cardTextTypes], 'primary', 'Middle Knobs'
      ),
      contentText: text('middle two text', 'Secondary', 'Middle Knobs'),
      align: select('middle two align', OptionsHelper.alignFull, 'center', 'Middle Knobs')
    }
  };
};

const footerKnobs = () => {
  return {
    key: 'four',
    footerPrimary: {
      contentType: select('footer one type', ['link', 'heading', 'icon', cardTextTypes[0]], 'primary', 'Footer Knobs'),
      contentText: text('footer one text', 'Primary', 'Footer Knobs'),
      align: select('footer one align', OptionsHelper.alignFull, 'center', 'Footer Knobs')
    },
    footerSecondary: {
      contentType: select(
        'footer two type', ['link', 'heading', 'icon', cardTextTypes[0]], 'primary', 'Footer Knobs'
      ),
      contentText: text('footer two text', 'Secondary', 'Footer Knobs'),
      align: select('footer two align', OptionsHelper.alignFull, 'center', 'Footer Knobs')
    }
  };
};


storiesOf('Card', module)
  .add('default', () => {
    const {
      border,
      cardSpacing,
      cardWidth,
      clickable,
      draggable,
      headerInline,
      middleInline,
      footerFilled
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
        spacing={ cardSpacing }
        border={ border }
        cardWidth={ cardWidth }
        cardRows={ cardRows }
        clickable={ clickable }
        draggable={ draggable }
        footerFilled={ footerFilled }
      />
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
