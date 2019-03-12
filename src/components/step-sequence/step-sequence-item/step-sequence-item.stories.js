import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import StepSequenceItem from './step-sequence-item';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

storiesOf('Step Sequence Item', module).add('default', () => {
  const indicator = text('indicator', '1');
  const status = select('status', OptionsHelper.steps, OptionsHelper.steps[0]);
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
});
