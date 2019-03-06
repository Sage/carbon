import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Pill from './pill';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper';

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
      text: `
        # A Pill widget.

        ## How to use a Pill in a component:

        In your file

        ~~~JS
        import Pill from 'carbon-react/lib/components/pill'
        ~~~
        To render the Pill:

        ~~~JS
        <Pill as='warning'>My warning text</Pill>
        ~~~
        Additionally you can pass optional props to the Pill component
        - as: Customizes the appearence of the pill changing the colour (see the 'iconColorSets' for possible values).
      `
    },
    notes: { markdown: notes }
  });
