import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import MultiActionButton from './multi-action-button.component';
import Button from '../button';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

MultiActionButton.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /multi-action-button\.component(?!spec)/
);

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
      >
        <Button { ...menuButtonProps }>Example Button</Button>
        <Button { ...menuButtonProps }>Example Button with long text</Button>
        <Button { ...menuButtonProps }>Short</Button>
      </MultiActionButton>
    );
  }, {
    themeSelector: dlsThemeSelector,
    info: { text: info, propTablesExclude: [Button] },
    notes: { markdown: notes }
  })
  .add('classic', () => {
    const props = getKnobs(true);
    const {
      as,
      textContent,
      ...menuButtonProps
    } = props;

    return (
      <MultiActionButton
        as={ as }
        text={ textContent }
        { ...menuButtonProps }
      >
        <Button { ...menuButtonProps }>Example Button</Button>
        <Button { ...menuButtonProps }>Example Button with long text</Button>
        <Button { ...menuButtonProps }>Short</Button>
      </MultiActionButton>
    );
  }, {
    themeSelector: classicThemeSelector,
    info: { text: info, propTablesExclude: [Button] },
    notes: { markdown: notes }
  });
