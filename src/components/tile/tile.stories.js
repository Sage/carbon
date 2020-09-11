import React from 'react';
import {
  text, number, select, withKnobs
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Tile from '.';
import Content from '../content';

export default {
  title: 'Design System/Tile/Test',
  component: Tile,
  decorators: [withKnobs],
  parameters: {
    info: { disable: true },
    docs: {
      page: null
    },
    chromatic: {
      disable: true
    }
  }
};

export const Basic = () => {
  const percentageOpts = {
    range: true,
    min: 0,
    max: 100,
    step: 1
  };

  const as = select('as', OptionsHelper.tileThemes);
  const orientation = select('orientation', OptionsHelper.orientation, 'horizontal');
  const pixelWidth = number('pixelWidth', 0, { ...percentageOpts, max: 2000 });
  const width = number('width', 0, percentageOpts);

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
    <Tile
      as={ as }
      orientation={ orientation }
      pixelWidth={ pixelWidth }
      width={ width }
    >
      {tileContent}
    </Tile>
  );
};
