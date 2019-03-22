import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import Button from '.';

const defaultKnobs = () => {
  const size = select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]);

  return {
    as: select('as', OptionsHelper.themesBinary, OptionsHelper.themesBinary[1]),
    children: text('children', 'Example Button'),
    disabled: boolean('disabled', false),
    iconPosition: select('iconPosition', [...OptionsHelper.buttonIconPositions, ''], ''),
    iconType: select('iconType', [...OptionsHelper.icons, ''], ''),
    onClick: action('click'),
    size,
    subtext: size === OptionsHelper.sizesRestricted[2] ? text('subtext', '') : undefined,
    theme: select('theme', OptionsHelper.buttonColors, OptionsHelper.buttonColors[0])
  };
};

storiesOf('Button', module)
  .add('default', () => {
    const props = defaultKnobs();
    const { children } = props;
    return (
      <Button
        { ...props }
      >
        { children }
      </Button>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes }
  })
  .add('as a sibling', () => {
    const props = defaultKnobs();
    const { children } = props;
    return (
      <div>
        <Button
          { ...props }
        >
          { children }
        </Button>

        <Button
          { ...props }
        >
          { children }
        </Button>
      </div>
    );
  });
