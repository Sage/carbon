import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import {
  text, select, boolean, color
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../../components/button';
import { carbonThemeList } from '.';
import { mergeWithBase } from './base';
import { mergeDeep } from '../utils/merge-deep';


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

storiesOf('Theme', module)
  .add('Overrides', () => {
    const firstCarbonTheme = carbonThemeList[0];
    const themeGroup = 'Theme Overrides';
    const props = getKnobs();
    const Code = styled.code`
      background-color: #eee;
    `;

    // We're using mergeWithBase and mergeDeep so we can extend a Carbon Theme, but still access the palette
    // in our new theme. If you don't need the palette you can call mergeDeep on an exported Carbon Theme theme without
    // needing to use mergeWithBase.
    const customTheme = palette => (mergeDeep(
      firstCarbonTheme(palette),
      {
        colors: {
          primary: color('Primary color', palette.gold, themeGroup),
          secondary: color('Secondary color', palette.plum, themeGroup)
        }
      }
    ));
    const theme = mergeWithBase(customTheme);

    const CustomButton = styled(Button)`
    transition: all 1.0s linear;
    &:hover {
      transform: rotateY(180deg);
    }
    `;
    return (
      <ThemeProvider { ...{ theme } }>
        <React.Fragment>

          <h1>Modifying an existing CSS rule</h1>
          <p>You can modify existing styles by creating your own Theme. It is possible to extend one of
            the existing themes or to provide a full theme yourself.
             This only works for providing theme values, you can&apos;t add new CSS rules.
          </p>

          <p>In this example you can select the <Code>primary</Code> and <Code>secondary</Code> theme
          values from the Knobs pannel below.
          </p>

          <Button { ...props } />

          <h1>Adding new CSS rules</h1>
          <p>If you want to add a new CSS rule you&apos;ll need to wrap the component with
            the <Code>styled()</Code> constuctor. This will return a new tagged template
            literal where you can add your own CSS.
          </p>

          <p>In this example when you hover, the button will rotate. Note that it is still using our custom theme from
            the previous example because it is wrapped in the same <Code>ThemeProvider</Code>
          </p>

          <CustomButton { ...props } />
        </React.Fragment>
      </ThemeProvider>
    );
  });
