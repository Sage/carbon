import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import Button from '.';

const defaultKnobs = () => {
  const size = select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]);

  return {
    as: select('as', OptionsHelper.themesBinary, OptionsHelper.themesBinary[1]),
    children: text('children', 'Example Button'),
    disabled: boolean('disabled', false),
    iconPosition: select('iconPosition', [...OptionsHelper.buttonIconPositions, ''], ''),
    iconType: select('iconType', [...OptionsHelper.icons, ''], ''),
    onClick: action('click'),
    size,
    subtext: size === OptionsHelper.sizesRestricted[2] ? text('subtext', '') : undefined,
    theme: select('theme', OptionsHelper.buttonColors, OptionsHelper.buttonColors[0]),
    to: text('to'),
    href: text('href')
  };
};

const TableComponent = ({ propDefinitions }) => {
  const props = propDefinitions.map(
    ({
      property,
      propType,
      required,
      description,
      defaultValue
    }) => {
      return (
        <tr key={ property }>
          <td>{ property }</td>
          <td>{ propType.name }</td>
          <td>{ required ? 'yes' : '-' }</td>
          <td style={ { color: 'rgb(34, 34, 170)' } }>
            { defaultValue || '-' }
          </td>
          <td>{ description }</td>
        </tr>
      );
    }
  );

  return (
    <table>
      <thead>
        <tr style={ { textAlign: 'left' } }>
          <th>property</th>
          <th>propType</th>
          <th>required</th>
          <th>default</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>{props}</tbody>
    </table>
  );
};

TableComponent.propTypes = {
  propDefinitions: PropTypes.array
};

storiesOf('Button', module)
  .add('default', () => {
    const props = defaultKnobs();
    const { children } = props;
    return (
      <Button
        { ...props }
      >
        { children }
      </Button>
    );
  }, {
    info: { TableComponent, text: Info },
    notes: { markdown: notes }
  })
  .add('as a sibling', () => {
    const props = defaultKnobs();
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
  });
