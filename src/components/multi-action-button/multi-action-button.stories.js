import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import MultiActionButton from './multi-action-button.component';
import Button, { OriginalButton } from '../button';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';
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
  let as, buttonType, size, subtext;

  if (isClassic) {
    as = select('as', [...OptionsHelper.themesBinary, 'transparent'], Button.defaultProps.as);
  } else {
    buttonType = select('buttonType', OptionsHelper.themesBinary, Button.defaultProps.as);
    size = select('size', OptionsHelper.sizesRestricted, Button.defaultProps.size);
    subtext = (size === OptionsHelper.sizesRestricted[2]) ? text('subtext', Button.defaultProps.subtext) : undefined;
  }

  return {
    align: select('align', OptionsHelper.alignBinary, OptionsHelper.alignBinary[0]),
    as,
    buttonType,
    disabled: boolean('disabled', Button.defaultProps.disabled),
    onClick: ev => action('click')(ev),
    size,
    subtext,
    textContent: text('text', 'Example Multi Action Button')
  };
};

storiesOf('Multi Action Button', module)
  .add('default', () => {
    const props = getKnobs();
    const {
      buttonType,
      textContent,
      subtext,
      ...menuButtonProps
    } = props;

    return (
      <MultiActionButton
        buttonType={ buttonType }
        text={ textContent }
        subtext={ subtext }
        { ...menuButtonProps }
        { ...getIconKnobs() }
      >
        <Button { ...menuButtonProps }>Example Button</Button>
        <Button { ...menuButtonProps }>Example Button with long text</Button>
        <Button { ...menuButtonProps }>Short</Button>
      </MultiActionButton>
    );
  })
  .add('classic', () => {
    const props = getKnobs(true);
    const {
      as,
      textContent,
      ...menuButtonProps
    } = props;

    return (
      <ThemeProvider theme={ classic }>
        <MultiActionButton
          as={ as }
          text={ textContent }
          { ...menuButtonProps }
        >
          <Button { ...menuButtonProps }>Example Button</Button>
          <Button { ...menuButtonProps }>Example Button with long text</Button>
          <Button { ...menuButtonProps }>Short</Button>
        </MultiActionButton>
      </ThemeProvider>
    );
  }, {
    info: { text: info, propTablesExclude: [OriginalButton, ThemeProvider] },
    notes: { markdown: notes }
  });
