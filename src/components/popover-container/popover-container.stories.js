import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import PopoverContainer from './popover-container.component';

export default {
  title: 'Design System/Popover Container/Test',
  component: PopoverContainer,
  decorators: [withKnobs],
  parameters: {
    info: { disable: true },
    docs: {
      page: null
    },
    chromatic: {
      disable: true
    }
  }
};

export const Basic = () => {
  const title = text('title', 'Title');

  return (
    <PopoverContainer title={ title } />
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: false
    }
  }
};
