import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info, InfoClassic } from './documentation';
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

const getKnobs = (isClassic) => {
  const size = select('size', OptionsHelper.sizesRestricted, Button.defaultProps.size);
  let classicProps = {}, buttonType, destructive;

  if (isClassic) {
    classicProps = {
      theme: select('theme', OptionsHelper.buttonColors, Button.defaultProps.theme),
      as: select('as', OptionsHelper.themesBinary, Button.defaultProps.as),
      href: text('href'),
      to: text('to')
    };
  } else {
    buttonType = select('buttonType', OptionsHelper.buttonTypes, Button.defaultProps.as);
    destructive = boolean('destructive', false);
  }

  return {
    buttonType,
    children: text('children', 'Example Button'),
    destructive,
    disabled: boolean('disabled', Button.defaultProps.disabled),
    onClick: ev => action('click')(ev),
    size,
    subtext: (size === OptionsHelper.sizesRestricted[2]) ? text('subtext', Button.defaultProps.subtext) : undefined,
    ...classicProps,
    ...getIconKnobs()
  };
};

function makeStory(name, themeSelector, isClassic, infotext) {
  const component = () => {
    const props = getKnobs(isClassic);
    const { children } = props; // eslint-disable-line react/prop-types
    return (
      <Button { ...props }>{ children }</Button>
    );
  };

  const metadata = {
    info: { text: infotext },
    notes: { markdown: notes },
    themeSelector,
    knobs: {
      escapeHTML: false
    }
  };

  return [name, component, metadata];
}

function makeSiblingStory(name, themeSelector, isClassic) {
  const component = () => {
    const props = getKnobs(isClassic);
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
  .add(...makeStory('default', dlsThemeSelector, false, Info))
  .add(...makeStory('classic', classicThemeSelector, true, InfoClassic))
  .add(...makeSiblingStory('as a sibling', dlsThemeSelector, false))
  .add(...makeSiblingStory('as a sibling classic', classicThemeSelector, true));
