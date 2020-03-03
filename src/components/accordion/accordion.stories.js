import React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import Accordion from './accordion.component';
import AccordionGroup from './accordion-group.component';
import Textbox from '../../__experimental__/components/textbox';

export default {
  title: 'Test/Accordion',
  component: Accordion,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    },
    knobs: { escapeHTML: false }
  }
};

export const Basic = () => {
  const { defaultProps } = Accordion;

  return (
    <Accordion
      iconType={ select('iconType', ['chevron_down', 'dropdown']) }
      iconAlign={ select(
        'iconAlign',
        OptionsHelper.alignBinary,
        defaultProps.iconAlign
      ) }
      type={ select(
        'type',
        OptionsHelper.themesBinary,
        defaultProps.type
      ) }
      title={ text('Title', 'Title') }
      onChange={ action('expansionToggled') }
    >
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  );
};

export const Grouped = () => (
  <AccordionGroup>
    <Accordion
      title='First Accordion'
      onChange={ action('expansionToggled') }
    >
      <Textbox label='Textbox in an Accordion' />
    </Accordion>
    <Accordion
      title='Second Accordion'
      onChange={ action('expansionToggled') }
    >
      <Textbox label='Textbox in an Accordion' />
    </Accordion>
    <Accordion
      title='Third Accordion'
      onChange={ action('expansionToggled') }
    >
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  </AccordionGroup>
);
