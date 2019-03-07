import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Pill from './pill';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

storiesOf('Pill', module)
  .add('default', () => {
    const children = text('children', 'Pill');
    const as = children ? select('as', OptionsHelper.colors, Pill.defaultProps.as) : undefined;
    const fill = children ? boolean('fill', Pill.defaultProps.fill) : undefined;
    const onDelete = boolean('onDelete', false);

    return (
      <Pill
        as={ as }
        fill={ fill }
        onDelete={ onDelete ? action('delete') : undefined }
      >
        { children }
      </Pill>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A Pill widget.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>{'import Pill from "carbon-react/lib/components/pill"'}</StoryCode>

          <p>To render a Pager:</p>

          <StoryCode padded>{'<Pill as="warning">My warning text</Pill>'}</StoryCode>

          <p>Additionally you can pass optional props to the Pill component</p>

          <p>
            &ndash; as: Customizes the appearence of the pill changing the colour
            (see the iconColorSets for possible values).
          </p>
        </div>
      )
    },
    notes: { markdown: notes }
  });
