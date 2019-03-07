import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { StepSequence, StepSequenceItem } from './step-sequence';
import OptionsHelper from '../../utils/helpers/options-helper';

storiesOf('Step Sequence', module).add('default', () => {
  const orientation = select('orientation', OptionsHelper.orientation, OptionsHelper.orientation[0]);

  return (
    <StepSequence orientation={ orientation }>
      <StepSequenceItem
        ariaLabel='Step 1 of 5'
        ariaCompleteLabel='Complete'
        ariaCurrentLabel='Current'
        indicator='1'
        status='complete'
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        ariaLabel='Step 2 of 5'
        ariaCompleteLabel='Complete'
        ariaCurrentLabel='Current'
        indicator='2'
        status='complete'
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        ariaLabel='Step 3 of 5'
        ariaCompleteLabel='Complete'
        ariaCurrentLabel='Current'
        indicator='3'
        status='current'
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        ariaLabel='Step 4 of 5'
        ariaCompleteLabel='Complete'
        ariaCurrentLabel='Current'
        indicator='4'
        status='incomplete'
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        ariaLabel='Step 5 of 5'
        ariaCompleteLabel='Complete'
        ariaCurrentLabel='Current'
        indicator='5'
        status='incomplete'
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
});
