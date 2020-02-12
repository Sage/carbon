import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import Help from './help.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Help.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /help\.component(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    const children = text('children', 'This is help text');
    const tooltipPosition = children ? select(
      'tooltipPosition',
      OptionsHelper.positions,
      Help.defaultProps.tooltipPosition
    ) : undefined;
    const tooltipAlign = children ? select(
      'tooltipAlign',
      OptionsHelper.alignAroundEdges,
      Help.defaultProps.tooltipAlign
    ) : undefined;
    const href = text('href', '');
    const type = select('type', OptionsHelper.icons, 'help');

    return (
      <Help
        tooltipPosition={ tooltipPosition }
        tooltipAlign={ tooltipAlign }
        href={ href }
        type={ type }
      >
        {children}
      </Help>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Help', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
