import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Tile from '.';
import Content from '../../../components/content';
import { info, notes } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Tile.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /tile\.component(?!spec)/
);

storiesOf('Experimental/Tile', module)
  .add('default', () => {
    const tileProps = {
      as: select('as', OptionsHelper.tileThemes, Tile.defaultProps.as, 'Tile'),
      orientation: select('orientation', OptionsHelper.orientation, Tile.defaultProps.orientation, 'Tile'),
      padding: select('padding', OptionsHelper.sizesPod, Tile.defaultProps.padding, 'Tile'),
      width: number('width', 0, {}, 'Tile')
    };

    const contentOneProps = {
      key: 'one',
      children: text('contentOneChildren', 'Test Body One', 'TileContent One'),
      title: text('contentOneTitle', 'Test Title One', 'TileContent One'),
      width: number('contentOneWidth', 0, {}, 'TileContent One')
    };

    const contentTwoProps = {
      key: 'two',
      children: text('contentTwoChildren', 'Test Body Two', 'TileContent Two'),
      title: text('contentTwoTitle', 'Test Title Two', 'TileContent Two'),
      width: number('contentTwoWidth', 0, {}, 'TileContent Two')
    };

    const contentThreeProps = {
      key: 'three',
      children: text('contentThreeChildren', 'Test Body Three', 'TileContent Three'),
      title: text('contentThreeTitle', 'Test Title Three', 'TileContent Three'),
      width: number('contentThreeWidth', 0, {}, 'TileContent Three')
    };

    const tileContent = [
      contentOneProps.children ? <Content { ...contentOneProps } /> : undefined,
      contentTwoProps.children ? <Content { ...contentTwoProps } /> : undefined,
      contentThreeProps.children ? <Content { ...contentThreeProps } /> : undefined
    ];

    return (
      <Tile { ...tileProps }>{tileContent}</Tile>
    );
  }, {
    info: {
      propTablesExclude: [Content],
      text: info
    },
    notes: { markdown: notes }
  });
