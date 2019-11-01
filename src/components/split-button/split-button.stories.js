import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, boolean, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import SplitButton from './split-button.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../button';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

SplitButton.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /split-button\.component(?!spec)/
);

const getIconKnobs = () => {
  const defaultPosition = Button.defaultProps.iconPosition;
  const hasIcon = boolean('has icon', false);

  return {
    iconType: hasIcon ? select('iconType', [...OptionsHelper.icons, ''], '') : undefined,
    iconPosition: hasIcon ? select('iconPosition', [...OptionsHelper.buttonIconPositions], defaultPosition) : undefined
  };
};

const getKnobs = (isClassic) => {
  let as, buttonType, size;

  if (isClassic) {
    as = select('as', OptionsHelper.themesBinary, Button.defaultProps.as);
  } else {
    buttonType = select('buttonType', OptionsHelper.themesBinary, Button.defaultProps.as);
    size = select('size', OptionsHelper.sizesRestricted, Button.defaultProps.size);
  }

  return {
    as,
    buttonType,
    dataElement: text('data-element'),
    dataRole: text('data-role'),
    disabled: boolean('disabled', Button.defaultProps.disabled),
    onClick: ev => action('click')(ev),
    size,
    align: select('align', OptionsHelper.alignBinary, SplitButton.defaultProps.align),
    textContent: text('text', 'Example Split Button'),
    subtext: (size === OptionsHelper.sizesRestricted[2]) ? text('subtext', Button.defaultProps.subtext) : undefined
  };
};

storiesOf('Split Button', module)
  .add(
    'default',
    () => {
      const props = getKnobs();
      const {
        buttonType,
        dataElement,
        dataRole,
        textContent,
        subtext,
        ...menuButtonProps
      } = props;
      return (
        <SplitButton
          buttonType={ buttonType }
          data-element={ dataElement }
          data-role={ dataRole }
          text={ textContent }
          subtext={ subtext }
          { ...getIconKnobs() }
          { ...menuButtonProps }
        >
          <Button { ...menuButtonProps }>Example Button</Button>
          <Button { ...menuButtonProps }>Example Button with long text</Button>
          <Button { ...menuButtonProps }>Short</Button>
        </SplitButton>
      );
    },
    {
      themeSelector: dlsThemeSelector,
      info: { text: info, propTablesExclude: [Button] },
      notes: { markdown: notes }
    },
  )
  .add('classic', () => {
    const props = getKnobs(true);
    const {
      as,
      dataElement,
      dataRole,
      disabled,
      onClick,
      textContent
    } = props;
    return (
      <SplitButton
        as={ as }
        data-element={ dataElement }
        data-role={ dataRole }
        disabled={ disabled }
        onClick={ onClick }
        text={ textContent }
        { ...props }
      >
        <Button onClick={ onClick }>
            Example Button
        </Button>
        <Button onClick={ onClick }>
            Example Button
        </Button>
        <Button onClick={ onClick }>
            Example Button
        </Button>
      </SplitButton>
    );
  }, {
    themeSelector: classicThemeSelector,
    info: { text: info, propTablesExclude: [Button] },
    notes: { markdown: notes }
  });
