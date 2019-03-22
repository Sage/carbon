import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import Button from '.';

storiesOf('Button', module)
  .add('default', () => {
    const renderAs = select('as', OptionsHelper.themesBinary, OptionsHelper.themesBinary[0]);
    const children = text('children', 'Example Button');
    const classicVariant = select('classicTheme', OptionsHelper.buttonColors, OptionsHelper.buttonColors[0]);
    const disabled = boolean('disabled', false);
    const iconType = select('iconType', [...OptionsHelper.icons, ''], '');
    const iconPosition = select('iconPosition', [...OptionsHelper.buttonIconPositions, ''], '');
    const size = select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]);
    const subtext = size === OptionsHelper.sizesRestricted[2] ? text('subtext', '') : undefined;
    const addSibling = boolean('renderSibling', false);

    return (
      <div>
        <Button
          as={ renderAs }
          size={ size }
          disabled={ disabled }
          onClick={ action('click') }
          subtext={ subtext }
          iconPosition={ iconPosition }
          iconType={ iconType }
          theme={ classicVariant }
        >
          { children }
        </Button>
        {
          addSibling
          && (
            <Button
              as={ renderAs }
              size={ size }
              disabled={ disabled }
              onClick={ action('click') }
              iconPosition={ iconPosition }
              iconType={ iconType }
              theme={ classicVariant }
            >
              { children }
            </Button>
          )
        }
      </div>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes }
  });
