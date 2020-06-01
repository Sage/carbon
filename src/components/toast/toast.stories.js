import React, { useState } from 'react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector } from '../../../.storybook/theme-selectors';
import Toast from '.';

export default {
  title: 'Test/Toast',
  component: Toast,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    },
    knobs: { escapeHTML: false }
  }
};

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismissClick = (evt) => {
    setIsOpen(!isOpen);
    action('click')(evt);
  };
  const children = text('children', 'My text');
  return (
    <Toast
      variant='warning'
      id='toast-dismissible'
      open={ isOpen }
      onDismiss={ onDismissClick }
    >
      { children }
    </Toast>
  );
};
