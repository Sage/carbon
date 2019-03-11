import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Link from './link';

storiesOf('Link', module)
  .add('default', () => {
    const children = text('children', 'Link');
    const disabled = boolean('disabled', false);
    const href = text('href', '');
    const icon = select('icon', ['', ...OptionsHelper.icons], '');
    const iconAlign = select(
      'iconAlign',
      OptionsHelper.alignBinary,
      Link.defaultProps.iconAlign
    );
    const tabbable = boolean('tabbable', Link.defaultProps.tabbable);
    const to = text('to', '');
    const tooltipMessage = icon ? text('tooltipMessage', '') : undefined;
    const tooltipPosition = tooltipMessage ? select(
      'tooltipPosition',
      OptionsHelper.positions,
      OptionsHelper.positions[0]
    ) : undefined;
    const tooltipAlign = tooltipMessage ? select(
      'tooltipAlign',
      OptionsHelper.alignAroundEdges,
      OptionsHelper.alignAroundEdges[0]
    ) : undefined;

    return (
      <Link
        disabled={ disabled }
        href={ href }
        icon={ icon }
        iconAlign={ iconAlign }
        tabbable={ tabbable }
        to={ to }
        tooltipMessage={ tooltipMessage }
        tooltipPosition={ tooltipPosition }
        tooltipAlign={ tooltipAlign }
        onClick={ action('click') }
      >
        {children}
      </Link>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A link widget.</p>
          
          <h2>How to use a Link in a component:</h2>
          
          <p>In your file:</p>
          
          <code>{'import Link from "carbon-react/lib/components/link";'}</code>
          
          <p>To render the Link:</p>
          
          <code>{'<Link href="foo">Main Page</Link>'}</code>
          
          <p>For additional properties specific to this component, see propTypes.</p>
        </div>
      )
    },
    notes: { markdown: notes }
  });
