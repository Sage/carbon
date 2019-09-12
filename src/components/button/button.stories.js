import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info, InfoClassic } from './documentation';
import Button from '.';
import StyledButton from './button.style';
import classic from '../../style/themes/classic';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Button.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /button\.component(?!spec)/
);

const StyledComponent = styled('div')``.render().type;

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
      <Button
        { ...props }
      >
        { children }
      </Button>
    );
  }, {
    info: {
      text: Info,
      propTablesExclude: [StyledComponent, StyledButton, ThemeProvider]
    },
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
        <Button
          { ...props }
        >
          { children }
        </Button>
      </ThemeProvider>
    );
  }, {
    info: {
      text: InfoClassic,
      propTablesExclude: [StyledComponent, StyledButton, ThemeProvider]
    },
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
        <Button
          { ...props }
        >
          { children }
        </Button>

        <Button
          { ...props }
        >
          { children }
        </Button>
      </div>
    );
  }, {
    info: {
      propTablesExclude: [StyledComponent, StyledButton, ThemeProvider]
    }
  });
