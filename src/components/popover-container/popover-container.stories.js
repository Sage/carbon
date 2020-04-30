import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import PopoverContainer from './popover-container.component';

export default {
  title: 'Test/Popover Container',
  component: PopoverContainer,
  decorators: [withKnobs],
  parameters: {
    info: { disable: true },
    docs: {
      page: null
    }
  }
};

export const Basic = () => {
  const title = text('title', 'Title');

  return (
    <PopoverContainer title={ title } />
  );
};
