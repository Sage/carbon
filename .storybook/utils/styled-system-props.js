import React from 'react';
import PropTypes from 'prop-types';
import { PropsTable } from '@storybook/components';
import { Props } from '@storybook/addon-docs/blocks';

const generateStyledSystemSpacingProps = (
  defaults
) => {
  return [
    {
      name: 'm',
      type: { summary: 'number | string' },
      description: 'Margin, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.m || '-'
      }
    },
    {
      name: 'mt',
      type: { summary: 'number | string' },
      description: 'Margin top, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.mt || '-'
      }
    },
    {
      name: 'mr',
      type: { summary: 'number | string' },
      description: 'Margin right, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.mr || '-'
      }
    },
    {
      name: 'mb',
      type: { summary: 'number | string' },
      description: 'Margin bottom, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.mb || '-'
      }
    },
    {
      name: 'ml',
      type: { summary: 'number | string' },
      description: 'Margin left, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.ml || '-'
      }
    },
    {
      name: 'mx',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Margin left/right, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.mx || '-'
      }
    },
    {
      name: 'my',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Margin top/bottom, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.my || '-'
      }
    },
    {
      name: 'p',
      type: { summary: 'number | string' },
      description: 'Padding, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.p || '-'
      }
    },
    {
      name: 'pt',
      type: { summary: 'number | string' },
      description: 'Padding top, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.pt || '-'
      }
    },
    {
      name: 'pr',
      type: { summary: 'number | string' },
      description: 'Padding right, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.pr || '-'
      }
    },
    {
      name: 'pb',
      type: { summary: 'number | string' },
      description: 'Padding bottom, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.pb || '-'
      }
    },
    {
      name: 'pl',
      type: { summary: 'number | string' },
      description: 'Padding left, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.pl || '-'
      }
    },
    {
      name: 'px',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Padding left/right, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.px || '-'
      }
    },
    {
      name: 'py',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Padding top/bottom, an integer multiplier of the base spacing constant (8px) or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.py || '-'
      }
    }
  ];
};

const generateStyledSystemColorProps = (
  defaults
) => {
  return [
    {
      name: 'color',
      type: { summary: 'string' },
      description: 'Color, theme value or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.color || '-'
      }
    },
    {
      name: 'backgroundColor',
      type: { summary: 'string' },
      description: 'Background, theme value or any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.backgroundColor || '-'
      }
    },
    {
      name: 'bg',
      type: { summary: 'string' },
      description: 'Shorthand for backgroundColor',
      required: false,
      defaultValue: {
        summary: defaults.bg || '-'
      }
    },
    {
      name: 'opacity',
      type: { summary: 'decimal' },
      description: 'Any decimal between 0 and 1.0',
      required: false,
      defaultValue: {
        summary: defaults.opacity || '-'
      }
    }
  ];
};

const generateStyledSystemLayoutProps = (
  defaults
) => {
  return [
    {
      name: 'width',
      type: { summary: 'number | string' },
      description: 'Numbers from 0-1 are converted to percentage widths. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme',
      required: false,
      defaultValue: {
        summary: defaults.width || '-'
      }
    },
    {
      name: 'height',
      type: { summary: 'number | string' },
      description: 'Numbers from 0-1 are converted to percentage heights. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive height styles. If theme.sizes is defined, the height prop will attempt to pick up values from the theme',
      required: false,
      defaultValue: {
        summary: defaults.height || '-'
      }
    },
    {
      name: 'minWidth',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Numbers from 0-1 are converted to percentage widths. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme',
      required: false,
      defaultValue: {
        summary: defaults.minWidth || '-'
      }
    },
    {
      name: 'maxWidth',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Numbers from 0-1 are converted to percentage widths. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme',
      required: false,
      defaultValue: {
        summary: defaults.maxWidth || '-'
      }
    },
    {
      name: 'minHeight',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Numbers from 0-1 are converted to percentage heights. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive height styles. If theme.sizes is defined, the height prop will attempt to pick up values from the theme',
      required: false,
      defaultValue: {
        summary: defaults.minWidth || '-'
      }
    },
    {
      name: 'maxHeight',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Numbers from 0-1 are converted to percentage heights. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive height styles. If theme.sizes is defined, the height prop will attempt to pick up values from the theme',
      required: false,
      defaultValue: {
        summary: defaults.maxWidth || '-'
      }
    },
    {
      name: 'size',
      type: { summary: 'number | string' },
      // eslint-disable-next-line max-len
      description: 'Width/Height, Numbers from 0-1 are converted to percentage values. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive styles. If theme.sizes is defined, the height and width props will attempt to pick up values from the theme',
      required: false,
      defaultValue: {
        summary: defaults.size || '-'
      }
    },
    {
      name: 'display',
      type: { summary: 'string' },
      description: 'Any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.display || '-'
      }
    },
    {
      name: 'verticalAlign',
      type: { summary: 'string' },
      description: 'Any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.verticalAlign || '-'
      }
    },
    {
      name: 'overflow',
      type: { summary: 'string' },
      description: 'Any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.overflow || '-'
      }
    },
    {
      name: 'overflowX',
      type: { summary: 'string' },
      description: 'Any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.overflowX || '-'
      }
    },
    {
      name: 'overflowY',
      type: { summary: 'string' },
      description: 'Any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.display || '-'
      }
    }
  ];
};

const generateStyledSystemFlexBoxProps = (
  defaults
) => {
  return [
    {
      name: 'alignItems',
      type: { summary: 'string' },
      description: 'Any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.alignItems || '-'
      }
    },
    {
      name: 'alignContent',
      type: { summary: 'string' },
      description: 'Any valid CSS string.',
      required: false,
      defaultValue: {
        summary: defaults.alignContent || '-'
      }
    },
    {
      name: 'justifyItems',
      type: { summary: 'string' },
      description: 'Any valid CSS string',
      required: false,
      defaultValue: {
        summary: defaults.justifyItems || '-'
      }
    },
    {
      name: 'justifyContent',
      type: { summary: 'string' },
      description: 'Any valid CSS string',
      required: false,
      defaultValue: {
        summary: defaults.justifyContent || '-'
      }
    },
    {
      name: 'flexWrap',
      type: { summary: 'string' },
      description: 'Any valid CSS string',
      required: false,
      defaultValue: {
        summary: defaults.flexWrap || '-'
      }
    },
    {
      name: 'flexDirection',
      type: { summary: 'string' },
      description: 'Any valid CSS string',
      required: false,
      defaultValue: {
        summary: defaults.flexDirection || '-'
      }
    },
    {
      name: 'flex',
      type: { summary: 'string' },
      description: 'Any valid CSS string',
      required: false,
      defaultValue: {
        summary: defaults.flex || '-'
      }
    },
    {
      name: 'flexGrow',
      type: { summary: 'number' },
      description: 'Any number greater than 0.',
      required: false,
      defaultValue: {
        summary: defaults.flexGrow || '-'
      }
    },
    {
      name: 'flexShrink',
      type: { summary: 'number' },
      description: 'Any number greater than 0.',
      required: false,
      defaultValue: {
        summary: defaults.flexShrink || '-'
      }
    },
    {
      name: 'flexBasis',
      type: { summary: 'string' },
      description: 'Any valid CSS string',
      required: false,
      defaultValue: {
        summary: defaults.flexBasis || '-'
      }
    },
    {
      name: 'justifySelf',
      type: { summary: 'string' },
      description: 'Any valid CSS string',
      required: false,
      defaultValue: {
        summary: defaults.justifySelf || '-'
      }
    },
    {
      name: 'alignSelf',
      type: { summary: 'string' },
      description: 'Any valid CSS string',
      required: false,
      defaultValue: {
        summary: defaults.alignSelf || '-'
      }
    },
    {
      name: 'order',
      type: { summary: 'number' },
      description: 'Any number greater than 0.',
      required: false,
      defaultValue: {
        summary: defaults.order || '-'
      }
    }
  ];
};

const StyledSystemProps = ({
  of,
  spacing,
  color,
  layout,
  flexBox,
  defaults = {},
  noHeader
}) => {
  let sections = {};
  if(spacing)
  sections['Spacing'] = generateStyledSystemSpacingProps(defaults);
  if(color)
  sections['Color'] = generateStyledSystemColorProps(defaults);
  if(layout)
  sections['Layout'] = generateStyledSystemLayoutProps(defaults);
  if(flexBox)
  sections['FlexBox'] = generateStyledSystemFlexBoxProps(defaults);
  return (
    <>
      {!noHeader && <h2>Props</h2>}
      {of && <Props of={ of } />}
      <PropsTable
        sections={ sections }
      />
    </>
  );
};

StyledSystemProps.propTypes = {
  of: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
  noHeader: PropTypes.bool,
  spacing: PropTypes.bool,
  layout: PropTypes.bool,
  flex: PropTypes.bool,
  defaults: PropTypes.object
};

export default StyledSystemProps;
