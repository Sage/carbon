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
  let as, buttonType;

  if (isClassic) {
    as = select('as', OptionsHelper.themesBinary, Button.defaultProps.as);
  } else {
    buttonType = select('buttonType', OptionsHelper.buttonTypes, Button.defaultProps.as);
  }

  return {
    as,
    buttonType,
    dataElement: text('data-element'),
    dataRole: text('data-role'),
    disabled: boolean('disabled', Button.defaultProps.disabled),
    onClick: ev => action('click')(ev),
    size,
    textContent: text('children', 'Example Split Button'),
    subtext: (size === OptionsHelper.sizesRestricted[2]) ? text('subtext', Button.defaultProps.subtext) : undefined,
    ...getIconKnobs()
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
      const props = getKnobs();
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
          { ...props }
        >
          <Button
            onClick={ ev => action('click')(ev) }
          >
            Example Button
          </Button>
          <Button
            onClick={ ev => action('click')(ev) }
          >
            Example Button
          </Button>
          <Button
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
