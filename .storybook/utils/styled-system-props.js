import React from 'react';
import PropTypes from 'prop-types';
import { PropsTable } from '@storybook/components';
import { Props } from '@storybook/addon-docs/blocks';

const generateStyledSystemProps = (
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

const StyledSystemProps = ({
  of,
  spacing,
  spacingDefaults = {},
  noHeader
}) => {
  const rows = spacing ? generateStyledSystemProps(spacingDefaults) : null;

  return (
    <>
      {!noHeader && <h2>Props</h2>}
      {of && <Props of={ of } />}
      <PropsTable
        rows={ rows }
      />
    </>
  );
};

StyledSystemProps.propTypes = {
  of: PropTypes.node,
  noHeader: PropTypes.bool,
  spacing: PropTypes.bool,
  spacingDefaults: PropTypes.object
};

export default StyledSystemProps;
