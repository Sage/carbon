import React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Link as RouterLink } from 'react-router';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '.';

const getIconKnobs = () => {
  const defaultPosition = Button.defaultProps.iconPosition;
  const hasIcon = boolean('has icon', false);

  return {
    iconType: hasIcon ? select('iconType', [...OptionsHelper.icons, ''], '') : undefined,
    iconPosition: hasIcon ? select('iconPosition', [...OptionsHelper.buttonIconPositions], defaultPosition) : undefined
  };
};

const getKnobs = () => {
  const size = select('size', OptionsHelper.sizesRestricted, Button.defaultProps.size);
  return {
    children: text('children', 'Example Button'),
    disabled: boolean('disabled', Button.defaultProps.disabled),
    onClick: ev => action('click')(ev),
    size,
    subtext: (size === OptionsHelper.sizesRestricted[2]) ? text('subtext', Button.defaultProps.subtext) : undefined,
    buttonType: select('buttonType', OptionsHelper.buttonTypes, Button.defaultProps.as),
    href: text('href'),
    to: text('to'),
    destructive: boolean('destructive', false),
    ...getIconKnobs()
  };
};

export default {
  title: 'Button',
  component: Button,
  parameters: {
    info: {
      disable: true
    },
    docs: {
      disable: true
    }
  }
};

export const knobs = () => {
  const props = getKnobs();
  const { children } = props; // eslint-disable-line react/prop-types
  return (
    <Button { ...props } renderRouterLink={ routerProps => <RouterLink { ...routerProps } /> }>{ children }</Button>
  );
};

export const asASibling = () => {
  const props = getKnobs();
  const { children } = props; // eslint-disable-line react/prop-types
  return (
    <div>
      <Button { ...props } renderRouterLink={ routerProps => <RouterLink { ...routerProps } /> }>{ children }</Button>
      <Button { ...props } renderRouterLink={ routerProps => <RouterLink { ...routerProps } /> }>{ children }</Button>
    </div>
  );
};

const generateButtons = (buttonType, iconPosition) => () => {
  return (
    <>
      {
        ['', ...OptionsHelper.icons].map((iconType) => {
          const props = { iconPosition, buttonType, iconType };
          return (
            <div>
              {OptionsHelper.sizesRestricted.map((size, index) => (
                <>
                  <Button
                    key={ String(index) }
                    size={ size }
                    { ...props }
                  >
                    {size}
                  </Button>

                  {size === 'large' && (
                    <Button
                      key={ String(index) }
                      size={ size }
                      subtext='line two'
                      { ...props }
                    >
                      {size}
                    </Button>
                  )}
                </>
              ))}

              {OptionsHelper.sizesRestricted.map((size, index) => (
                <>
                  <Button
                    key={ String(index) }
                    size={ size }
                    destructive
                    { ...props }
                  >
                    {size}
                  </Button>

                  {size === 'large' && (
                    <Button
                      key={ String(index) }
                      size={ size }
                      destructive
                      subtext='line two'
                      { ...props }
                    >
                      {size}
                    </Button>
                  )}
                </>
              ))}

              {OptionsHelper.sizesRestricted.map((size, index) => (
                <>
                  <Button
                    key={ String(index) }
                    size={ size }
                    disabled
                    { ...props }
                  >
                    {size}
                  </Button>

                  {size === 'large' && (
                    <Button
                      key={ String(index) }
                      size={ size }
                      disabled
                      subtext='line two'
                      { ...props }
                    >
                      {size}
                    </Button>
                  )}
                </>
              ))}
            </div>
          );
        })
      }
    </>
  );
};

export const primaryButtonsIconsBefore = generateButtons('primary', 'before');
export const primaryButtonsIconsAfter = generateButtons('primary', 'after');
export const secondaryButtonsIconsBefore = generateButtons('secondary', 'before');
export const secondaryButtonsIconsAfter = generateButtons('secondary', 'after');
export const tertiaryButtonsIconsBefore = generateButtons('tertiary', 'before');
export const tertiaryButtonsIconsAfter = generateButtons('tertiary', 'after');
export const dashedButtonsIconsBefore = generateButtons('dashed', 'before');
export const dashedButtonsIconsAfter = generateButtons('dashed', 'after');
export const darkBackgroundButtonsIconsBefore = generateButtons('darkBackground', 'before');
export const darkBackgroundButtonsIconsAfter = generateButtons('darkBackground', 'after');
