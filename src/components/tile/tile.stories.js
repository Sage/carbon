import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Tile from '.';
import Content from '../content';
import { info, notes } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import { dlsThemeSelector } from '../../../.storybook/theme-selectors';

Tile.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /tile\.component(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    const percentageOpts = {
      range: true,
      min: 0,
      max: 100,
      step: 1
    };

    const tileProps = {
      as: select('as', OptionsHelper.tileThemes, Tile.defaultProps.as, 'Default'),
      orientation: select('orientation', OptionsHelper.orientation, Tile.defaultProps.orientation, 'Default'),
      padding: select('padding', OptionsHelper.sizesTile, Tile.defaultProps.padding, 'Default'),
      pixelWidth: number('pixelWidth', 0, { ...percentageOpts, max: 2000 }, 'Default'),
      width: number('width', 0, percentageOpts, 'Default')
    };

    const contentOneProps = {
      key: 'one',
      children: text('contentOneChildren', 'Test Body One', 'TileContent One'),
      title: text('contentOneTitle', 'Test Title One', 'TileContent One'),
      width: number('contentOneWidth', 0, percentageOpts, 'TileContent One')
    };

    const contentTwoProps = {
      key: 'two',
      children: text('contentTwoChildren', 'Test Body Two', 'TileContent Two'),
      title: text('contentTwoTitle', 'Test Title Two', 'TileContent Two'),
      width: number('contentTwoWidth', 0, percentageOpts, 'TileContent Two')
    };

    const contentThreeProps = {
      key: 'three',
      children: text('contentThreeChildren', 'Test Body Three', 'TileContent Three'),
      title: text('contentThreeTitle', 'Test Title Three', 'TileContent Three'),
      width: number('contentThreeWidth', 0, percentageOpts, 'TileContent Three')
    };

    const tileContent = [
      contentOneProps.children ? <Content { ...contentOneProps } /> : undefined,
      contentTwoProps.children ? <Content { ...contentTwoProps } /> : undefined,
      contentThreeProps.children ? <Content { ...contentThreeProps } /> : undefined
    ];

    return (
      <Tile { ...tileProps }>{tileContent}</Tile>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('Tile', module)
  .addParameters({
    info: {
      propTablesExclude: [Content],
      text: info
    },
    knobs: { escapeHTML: false },
    notes: { markdown: notes }
  })
  .add(...makeStory('default', dlsThemeSelector));
