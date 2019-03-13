import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Link from './link';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

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

          <StoryHeader>How to use a Link in a component:</StoryHeader>

          <p>In your file:</p>

          <StoryCode padded>
            {'import Link from "carbon-react/lib/components/link";'}
          </StoryCode>

          <p>To render the Link:</p>

          <StoryCode>
            {'<Link href="foo">Main Page</Link>'}
          </StoryCode>

          <p>For additional properties specific to this component, see propTypes.</p>
        </div>
      )
    },
    notes: { markdown: notes }
  });
