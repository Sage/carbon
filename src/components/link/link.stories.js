import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info } from './documentation';
import Link from './link.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Link.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /link\.component(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    const children = text('children', 'Link');
    const disabled = boolean('disabled', false);
    const href = text('href');
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
    const hasOnClick = boolean('onClick', false);
    const onClick = hasOnClick ? action('click') : undefined;

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
        onClick={ onClick }
      >
        {children}
      </Link>
    );
  };

  const metadata = {
    themeSelector,
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Link', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
