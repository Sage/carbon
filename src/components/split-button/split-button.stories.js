import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, boolean, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SplitButton from './split-button.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../button';
import { notes, info } from './documentation';

const defaultKnobs = () => {
  const size = select('size', OptionsHelper.sizesRestricted, Button.defaultProps.size);

  return {
    as: select('as', [OptionsHelper.themesBinary[0], OptionsHelper.themesBinary[1]], Button.defaultProps.as),
    dataElement: text('data-element'),
    dataRole: text('data-role'),
    disabled: boolean('disabled', Button.defaultProps.disabled),
    iconPosition: select('iconPosition', [...OptionsHelper.buttonIconPositions, ''], Button.defaultProps.iconPosition),
    iconType: select('iconType', [...OptionsHelper.icons, ''], Button.defaultProps.iconType),
    onClick: ev => action('click')(ev),
    size,
    subtext: size === OptionsHelper.sizesRestricted[2] ? text('subtext', Button.defaultProps.subtext) : undefined,
    textContent: text('children', 'Example Split Button')
  };
};

storiesOf('Split Button', module)
  .addParameters({
    info: {
      propTablesExclude: [Button]
    }
  })
  .add(
    'default',
    () => {
      const props = defaultKnobs();
      const {
        as,
        dataElement,
        dataRole,
        disabled,
        onClick,
        textContent
      } = props;
      return (
        <SplitButton
          as={ as }
          data-element={ dataElement }
          data-role={ dataRole }
          disabled={ disabled }
          onClick={ onClick }
          text={ textContent }
        >
          <Button
            { ...props }
            onClick={ ev => action('click')(ev) }
          >
            Example Button
          </Button>
          <Button
            { ...props }
            onClick={ ev => action('click')(ev) }
          >
            Example Button
          </Button>
          <Button
            { ...props }
            onClick={ ev => action('click')(ev) }
          >
            Example Button
          </Button>
        </SplitButton>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );
