import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Pill from './pill';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper';
import '../../style/storybook-info-details.scss';

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
      text:
        <div className='storybook-info'>
          <p>A Pill widget.</p>
          <h1>Implementation</h1>
          <p>In your file</p>
          <code className='storybook-code'>
            import Pill from 'carbon-react/lib/components/pill'
          </code>
          <p>To render a Pager:</p>
          <code className='storybook-code'>
            {`<Pill as='warning'>My warning text</Pill>`}
          </code>
          <p>Additionally you can pass optional props to the Pill component</p>
          <p>
            &ndash; as: Customizes the appearence of the pill changing the colour
            (see the 'iconColorSets' for possible values).
          </p>
        </div>
    },
    notes: { markdown: notes }
  });
