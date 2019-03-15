import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Icon from './icon';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

storiesOf('Icon', module)
  .add('default', () => {
    const type = select('type', OptionsHelper.icons, 'add');
    const bgTheme = select('bgTheme', OptionsHelper.colors, 'default');
    const bgSize = select(
      'bgSize',
      OptionsHelper.sizesRestricted,
      Icon.defaultProps.bgSize
    );
    const bgShape = select('bgShape', OptionsHelper.shapes);
    const tooltipMessage = text('tooltipMessage', '');
    const tooltipPosition = tooltipMessage ? select(
      'tooltipPosition',
      OptionsHelper.positions,
      'top'
    ) : undefined;
    const tooltipAlign = tooltipMessage ? select(
      'tooltipAlign',
      OptionsHelper.alignAroundEdges,
      'top'
    ) : undefined;

    return (
      <Icon
        type={ type }
        bgSize={ bgSize }
        bgShape={ bgShape }
        bgTheme={ bgTheme }
        tooltipMessage={ tooltipMessage }
        tooltipPosition={ tooltipPosition }
        tooltipAlign={ tooltipAlign }
      />
    );
  }, {
    info: {
      text: (
        <div>
          <p>An Icon widget.</p>

          <StoryHeader>How to use an Icon in a component:</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>
            {'import Icon from "carbon-react/lib/components/icon";'}
          </StoryCode>

          <p>To render an Icon:</p>

          <StoryCode padded>
            {'<Icon type="foo" />'}
          </StoryCode>

          <p>
            {"'type' is a required prop"}
          </p>

          {/* eslint-disable-next-line */}
          <p>This widget follows the <a href="https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components">Stateless Functional Component</a> pattern.</p>
        </div>
      )
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
