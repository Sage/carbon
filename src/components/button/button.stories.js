import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, Info, InfoClassic } from './documentation';
import Button from '.';
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
    info: { TableComponent, text: Info },
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
    info: { TableComponent, text: InfoClassic },
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
  });
