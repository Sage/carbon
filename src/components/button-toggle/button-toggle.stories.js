import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, select, boolean
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import ButtonToggle from './button-toggle.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

ButtonToggle.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /button-toggle\.component(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const children = text('children', 'Option');
    const buttonIcon = select('buttonIcon', [null, ...OptionsHelper.icons]);
    const buttonIconSize = select(
      'buttonIconSize',
      OptionsHelper.sizesBinary,
      ButtonToggle.defaultProps.buttonIconSize
    );
    const size = select('size', OptionsHelper.sizesBinary, ButtonToggle.defaultProps.size);
    const disabled = boolean('disabled', false);
    const grouped = boolean('grouped', false);

    const onChange = (ev) => {
      action('onChange')(ev);
    };

    const onFocus = (ev) => {
      action('onFocus')(ev);
    };

    const onBlur = (ev) => {
      action('onBlur')(ev);
    };

    return (
      <div>
        <ButtonToggle
          name='new-button-toggle'
          size={ size }
          buttonIcon={ buttonIcon }
          buttonIconSize={ buttonIconSize }
          disabled={ disabled }
          grouped={ grouped }
          onChange={ onChange }
          onFocus={ onFocus }
          onBlur={ onBlur }
          key='button-toggle-1'
        >
          {children}
        </ButtonToggle>
        <ButtonToggle
          name='new-button-toggle'
          size={ size }
          buttonIcon={ buttonIcon }
          buttonIconSize={ buttonIconSize }
          disabled={ disabled }
          grouped={ grouped }
          onChange={ onChange }
          onFocus={ onFocus }
          onBlur={ onBlur }
          key='button-toggle-2'
        >
          {children}
        </ButtonToggle>
        <ButtonToggle
          name='new-button-toggle'
          size={ size }
          buttonIcon={ buttonIcon }
          buttonIconSize={ buttonIconSize }
          disabled={ disabled }
          grouped={ grouped }
          onChange={ onChange }
          onFocus={ onFocus }
          onBlur={ onBlur }
          key='button-toggle-3'
        >
          {children}
        </ButtonToggle>
      </div>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic
    },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Button Toggle', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
