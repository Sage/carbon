import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, select
} from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import Tooltip from '.';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Tooltip.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /tooltip\.component(?!spec)/
);

function validTooltip({ children, isVisible }) {
  return (children && isVisible);
}

const props = () => {
  return {
    isVisible: boolean('isVisible', true),
    children: text('children', "I'm a helpful tooltip that can display more information to a user."),
    align: select('align', OptionsHelper.alignAroundEdges, Tooltip.defaultProps.align),
    position: select('position', OptionsHelper.positions, Tooltip.defaultProps.position),
    type: select('type', ['error', 'warning', 'info'], 'info')
  };
};

const content = () => (validTooltip(props()) ? <Tooltip { ...props() } /> : null);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    return <div style={ { position: 'absolute' } }>{content()}</div>;
  };

  const metadata = {
    themeSelector,
    info: { text: info },
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Tooltip', module)
  .addParameters({
    knobs: { escapeHTML: false }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
