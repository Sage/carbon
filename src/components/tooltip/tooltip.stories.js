import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, select
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Tooltip from '.';
import { notes, info } from './documentation';

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

storiesOf('Tooltip', module)
  .addParameters({
    knobs: { escapeHTML: false }
  })
  .add('default', () => {
    return <div style={ { position: 'absolute' } }>{content()}</div>;
  },
  {
    info: { text: info },
    notes: { markdown: notes }
  });
