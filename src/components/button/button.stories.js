import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Button from './button';

storiesOf('Button', module)
  .add('default', () => {
    const asOption = select('as', OptionsHelper.themesBinary, Button.defaultProps.as);
    const children = text('children', 'Example Button');
    const disabled = boolean('disabled', Button.defaultProps.disabled);
    const theme = select('theme', OptionsHelper.buttonColors, Button.defaultProps.theme);
    const size = select('size', OptionsHelper.sizesRestricted, Button.defaultProps.size);
    const subtext = size === OptionsHelper.sizesRestricted[2] ? text('subtext', '') : undefined;

    return (
      <Button
        as={ asOption }
        disabled={ disabled }
        theme={ theme }
        size={ size }
        subtext={ subtext }
        onClick={ action('click') }
      >
        {children}
      </Button>
    );
  }, {
    notes: { markdown: notes }
  });
