import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import StepSequence from './step-sequence.component';
import StepSequenceItem from './step-sequence-item/step-sequence-item.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import getDocGenInfo from '../../utils/helpers/docgen-info';

StepSequence.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /step-sequence\.component(?!spec)/
);

StepSequenceItem.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /step-sequence-item\.component(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const orientation = select('orientation', OptionsHelper.orientation, StepSequence.defaultProps.orientation);

    return (
      <StepSequence orientation={ orientation }>
        <StepSequenceItem
          aria-label='Step 1 of 5'
          hiddenCompleteLabel='Complete'
          hiddenCurrentLabel='Current'
          indicator='1'
          status='complete'
        >
          Name
        </StepSequenceItem>
        <StepSequenceItem
          aria-label='Step 2 of 5'
          hiddenCompleteLabel='Complete'
          hiddenCurrentLabel='Current'
          indicator='2'
          status='complete'
        >
          Delivery Address
        </StepSequenceItem>
        <StepSequenceItem
          aria-label='Step 3 of 5'
          hiddenCompleteLabel='Complete'
          hiddenCurrentLabel='Current'
          indicator='3'
          status='current'
        >
          Delivery Details
        </StepSequenceItem>
        <StepSequenceItem
          aria-label='Step 4 of 5'
          hiddenCompleteLabel='Complete'
          hiddenCurrentLabel='Current'
          indicator='4'
          status='incomplete'
        >
          Payment
        </StepSequenceItem>
        <StepSequenceItem
          aria-label='Step 5 of 5'
          hiddenCompleteLabel='Complete'
          hiddenCurrentLabel='Current'
          indicator='5'
          status='incomplete'
        >
          Confirm
        </StepSequenceItem>
      </StepSequence>
    );
  };

  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Step Sequence', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
