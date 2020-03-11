import React from 'react';
import { select, text } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import PopoverContainer from './popover-container.component';

export default {
  component: PopoverContainer,
  title: 'Test/Popover Container',
  parameters: {
    info: { disable: true },
    knobs: { escapeHTML: false }
  }
};

export const basic = () => {
  const title = text('title', 'Popover Title');
  const iconType = select('iconType', [...OptionsHelper.icons], 'settings');
  const position = select('position', [...OptionsHelper.alignBinary], 'right');

  return (
    <div style={ position === 'left' ? { marginLeft: '400px' } : null }>
      <PopoverContainer
        title={ title }
        position={ position }
        iconType={ iconType }
      />
    </div>
  );
};
