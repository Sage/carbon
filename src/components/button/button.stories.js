import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import Button from '.';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Button.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /button\.component(?!spec)/
);

const getIconKnobs = () => {
  const defaultPosition = Button.defaultProps.iconPosition;
  const hasIcon = boolean('has icon', false);

  return {
    iconType: hasIcon ? select('iconType', [...OptionsHelper.icons, ''], '') : undefined,
    iconPosition: hasIcon ? select('iconPosition', [...OptionsHelper.buttonIconPositions], defaultPosition) : undefined
  };
};

const getKnobs = () => {
  const size = select('size', OptionsHelper.sizesRestricted, Button.defaultProps.size);
  return {
    children: text('children', 'Example Button'),
    disabled: boolean('disabled', Button.defaultProps.disabled),
    onClick: ev => action('click')(ev),
    size,
    subtext: (size === OptionsHelper.sizesRestricted[2]) ? text('subtext', Button.defaultProps.subtext) : undefined,
    buttonType: select('buttonType', OptionsHelper.buttonTypes, Button.defaultProps.as),
    href: text('href'),
    to: text('to'),
    destructive: boolean('destructive', false),
    ...getIconKnobs()
  };
};

function makeStory(name, infotext) {
  const component = () => {
    const props = getKnobs();
    const { children } = props; // eslint-disable-line react/prop-types
    return (
      <Button { ...props }>{ children }</Button>
    );
  };

  const metadata = {
    info: { text: infotext },
    notes: { markdown: notes },
    knobs: {
      escapeHTML: false
    }
  };

  return [name, component, metadata];
}

function makeSiblingStory(name, themeSelector) {
  const component = () => {
    const props = getKnobs();
    const { children } = props; // eslint-disable-line react/prop-types
    return (
      <div>
        <Button { ...props }>{ children }</Button>
        <Button { ...props }>{ children }</Button>
      </div>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('Button', module)
  .add(...makeStory('default', Info))
  .add(...makeSiblingStory('as a sibling'));
