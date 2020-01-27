import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Card from './card.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import Icon from '../icon';
import Link from '../link';
import Heading from '../heading';
import CardColumn from './card-column';
import CardFooter from './card-footer';
import CardRow from './card-row';
import { dlsThemeSelector } from '../../../.storybook/theme-selectors';

Card.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /card.component(?!spec)/
);

CardColumn.__docgenInfo = getDocGenInfo(
  require('./card-column/docgenInfo.json'),
  /card-column.component(?!spec)/
);

CardFooter.__docgenInfo = getDocGenInfo(
  require('./card-footer/docgenInfo.json'),
  /card-footer.component(?!spec)/
);

CardRow.__docgenInfo = getDocGenInfo(
  require('./card-row/docgenInfo.json'),
  /card-row.component(?!spec)/
);

const cardKnobs = () => {
  return {
    key: 'one',
    cardSpacing: select('card spacing', OptionsHelper.sizesRestricted, Card.defaultProps.spacing),
    cardWidth: text('width', '500px'),
    interactive: boolean('interactive card', false)
  };
};

function getCard(knobs) {
  const {
    cardSpacing,
    cardWidth,
    interactive
  } = knobs;

  return (
    <Card
      spacing={ cardSpacing }
      cardWidth={ cardWidth }
      interactive={ interactive }
      action={ action('action prop triggered') }
    >
      <CardRow>
        <CardColumn align='left'>
          <Heading title='Stripe - [account name]' divider={ false } />
          <div style={ { fontSize: '16px' } }>user.name@sage.com</div>
        </CardColumn>
        <CardColumn align='right'>
          <Icon type='image' />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <div style={ { fontWeight: 'bold', fontSize: '16px' } }>Stripe Balance</div>
          <Heading title='£ 0.00' divider={ false } />
          <div style={ { fontSize: '12px' } }>LAST ENTRY: 15 DAYS AGO</div>
        </CardColumn>
      </CardRow>
      <CardFooter>
        <CardColumn><Link icon='link' href='https://carbon.sage.com/'>View Stripe Dashboard</Link></CardColumn>
      </CardFooter>
    </Card>
  );
}

function getSmallCard(knobs) {
  const {
    border,
    cardSpacing,
    cardWidth,
    interactive
  } = knobs;

  return (
    <Card
      spacing={ cardSpacing }
      border={ border }
      cardWidth={ cardWidth }
      interactive={ interactive }
      action={ action('action prop triggered') }
    >
      <CardRow>
        <CardColumn align='left'>
          <div align='left' style={ { fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' } }>Accounting</div>
          <span style={ { fontWeight: 'bold', fontSize: '12px' } }>£ 6.50 </span>
          <span style={ { fontSize: '12px' } }>paid by client monthly</span>
        </CardColumn>
      </CardRow>
      <CardFooter>
        <CardColumn align='left'>Promo code</CardColumn>
        <CardColumn align='right'>Manage</CardColumn>
      </CardFooter>
    </Card>
  );
}

function makeStory(name, themeSelector) {
  const component = () => {
    const knobs = cardKnobs();

    return (
      <div>
        {getCard(knobs)}
        {getSmallCard(knobs)}
      </div>);
  };

  const metadata = {
    themeSelector,
    info: { text: Info, propTablesExclude: [Icon, Link, Heading] },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Card', module)
  .add(...makeStory('default', dlsThemeSelector));
