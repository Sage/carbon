import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Icon from './icon';

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
      text: `
        An Icon widget.

        ## How to use an Icon in a component:

        In your file

        ~~~js
        import Icon from 'carbon-react/lib/components/icon';
        ~~~

        To render an Icon:

        ~~~js
        <Icon type='foo' />
        ~~~

        'type' is a required prop

        This widget follows this pattern:

        https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
      `
    }
  }, {
    notes: { markdown: notes }
  });
