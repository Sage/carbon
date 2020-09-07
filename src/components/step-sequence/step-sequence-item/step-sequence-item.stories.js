import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import StepSequenceItem from './step-sequence-item.component';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

function makeStory(name, themeSelector) {
  const component = () => {
    const indicator = text('indicator', '1');
    const status = select('status', OptionsHelper.steps, StepSequenceItem.defaultProps.status);
    const hiddenCompleteLabel = text('hiddenCompleteLabel');
    const hiddenCurrentLabel = text('hiddenCurrentLabel');
    const ariaLabel = text('ariaLabel', 'Step 1 of 5');
    const children = text('children', 'Step Label');

    return (
      <StepSequenceItem
        aria-label={ ariaLabel }
        indicator={ indicator }
        status={ status }
        hiddenCompleteLabel={ hiddenCompleteLabel }
        hiddenCurrentLabel={ hiddenCurrentLabel }
      >
        {children}
      </StepSequenceItem>
    );
  };

  const metadata = {
    themeSelector,
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Step Sequence Item', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
