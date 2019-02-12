import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Button from './button';

const clickAction = action('click');

storiesOf('Button', module)
  .addParameters({
    info: {
      inline: true,
      header: false,
      propTablesExclude: [],
      propTables: [Button],
      source: false
    }
  })
  .add('default', () => {
    const asOption = select('as', OptionsHelper.themesBinary, OptionsHelper.themesBinary[0]);
    const children = text('children', 'Example Button');
    const disabled = boolean('disabled', false);
    const theme = select('theme', OptionsHelper.buttonColors, OptionsHelper.buttonColors[0]);
    const size = select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]);
    const subtext = text('subtext', '');

    return (
      <Button
        as={ asOption }
        disabled={ disabled }
        theme={ theme }
        size={ size }
        subtext={ subtext }
        onClick={ clickAction }
      >
        {children}
      </Button>
    );
  }, {
    notes: { markdown: notes }
  });
