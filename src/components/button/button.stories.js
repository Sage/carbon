import React from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info, InfoClassic } from './documentation';
import Button, { OriginalButton } from '.';
import classic from '../../style/themes/classic';

const getIconKnobs = () => {
  const defaultPosition = Button.defaultProps.iconPosition;
  const hasIcon = boolean('has icon', false);

  return {
    iconType: hasIcon ? select('iconType', [...OptionsHelper.icons, ''], '') : undefined,
    iconPosition: hasIcon ? select('iconPosition', [...OptionsHelper.buttonIconPositions], defaultPosition) : undefined
  };
};

const getKnobs = (isClassic) => {
  const size = select('size', OptionsHelper.sizesRestricted, Button.defaultProps.size);
  let classicProps = {}, buttonType;

  if (isClassic) {
    classicProps = {
      theme: select('theme', OptionsHelper.buttonColors, Button.defaultProps.theme),
      as: select('as', OptionsHelper.themesBinary, Button.defaultProps.as),
      href: text('href'),
      to: text('to')
    };
  } else {
    buttonType = select('buttonType', OptionsHelper.buttonTypes, Button.defaultProps.as);
  }

  return {
    buttonType,
    children: text('children', 'Example Button'),
    disabled: boolean('disabled', Button.defaultProps.disabled),
    onClick: ev => action('click')(ev),
    size,
    subtext: (size === OptionsHelper.sizesRestricted[2]) ? text('subtext', Button.defaultProps.subtext) : undefined,
    ...classicProps,
    ...getIconKnobs()
  };
};

storiesOf('Button', module)
  .add('default', () => {
    const props = getKnobs();
    const { children } = props;
    return (
      <OriginalButton
        { ...props }
      >
        { children }
      </OriginalButton>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: {
      escapeHTML: false
    }
  })
  .add('classic', () => {
    const props = getKnobs(true);
    const { children } = props;
    return (
      <ThemeProvider theme={ classic }>
        <OriginalButton
          { ...props }
        >
          { children }
        </OriginalButton>
      </ThemeProvider>
    );
  }, {
    info: { text: InfoClassic },
    notes: { markdown: notes },
    knobs: {
      escapeHTML: false
    }
  })
  .add('as a sibling', () => {
    const props = getKnobs();
    const { children } = props;
    return (
      <div>
        <OriginalButton
          { ...props }
        >
          { children }
        </OriginalButton>

        <OriginalButton
          { ...props }
        >
          { children }
        </OriginalButton>
      </div>
    );
  });
