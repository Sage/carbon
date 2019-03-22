import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StateDecorator, Store, State } from '@sambego/storybook-state';
import {
  boolean,
  number
} from '@storybook/addon-knobs';
import Number from './number.component';
import notes from './notes.md';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';
import getTextboxStoryProps from '../textbox/textbox.stories';

const store = new Store(
  {
    value: ''
  }
);

const setValue = (ev) => {
  action('onChange')(ev);
  store.set({ value: ev.target.value });
};

storiesOf('Experimental/Number Input', module)
  .addDecorator(StateDecorator(store))
  .add('default', () => {
    const onChangeDeferred = boolean('onChangeDeferred', false);
    const deferTimeout = onChangeDeferred ? number('deferTimeout') : undefined;

    return (
      <Number
        { ...getTextboxStoryProps() }
        value={ store.get('value') }
        onChange={ setValue }
        onKeyDown={ action('onKeyDown') }
        onChangeDeferred={ onChangeDeferred ? action('onChangeDeferred') : undefined }
        deferTimeout={ deferTimeout }
      />
    );
  }, {
    info: {
      text: (
        <div>
          <p>A number widget.</p>

          <p>It only allows entering of a whole number with an optional minus sign.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>
            {'import Number from "carbon-react/lib/components/number";'}
          </StoryCode>

          <p>To render a Number:</p>

          <StoryCode padded>
            {'<Number name="myNumber" />'}
          </StoryCode>
        </div>
      ),
      propTablesExclude: [State]
    },
    notes: { markdown: notes }
  });
