import React from 'react';
import { storiesOf } from '@storybook/react';
import { State } from '@sambego/storybook-state';
import {
  boolean,
  text,
  select,
  number
} from '@storybook/addon-knobs';
import classic from '../../style/themes/classic';
import small from '../../style/themes/small';
import { notes, info } from './documentation';
import TableWrapper from './table-story-helpers/table-story-wrapper.component';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { Table } from '.';

const commonKnobs = () => {
  const paginate = boolean('paginate', false);
  const showPageSizeSelection = paginate && boolean('showPageSizeSelection', false);

  return {
    sortOrder: select('sortOrder', ['', 'asc', 'desc'], ''),
    sortColumn: select('sortColumn', ['', 'name', 'code'], ''),
    selectable: boolean('selectable', false),
    highlightable: boolean('highlightable', false),
    shrink: boolean('shrink', false),
    caption: text('caption', 'Country and Country Codes'),
    totalRecords: number('totalRecords', 50),
    paginate,
    showPageSizeSelection
  };
};

const classicKnobs = () => {
  return {
    theme: select(
      'theme',
      [
        OptionsHelper.tableThemes[0],
        OptionsHelper.tableThemes[1]
      ],
      Table.defaultProps.theme
    )
  };
};

const dlsKnobs = () => {
  return {
    theme: select(
      'theme',
      [
        OptionsHelper.tableThemes[0],
        OptionsHelper.tableThemes[1],
        OptionsHelper.tableThemes[2]
      ],
      Table.defaultProps.theme
    ),
    size: select('size', OptionsHelper.tableSizes, Table.defaultProps.size),
    isZebra: boolean('zebra striping', false)
  };
};

const inputKnobs = () => {
  return {
    inputType: select(
      'input type',
      [
        OptionsHelper.inputTypes[0],
        OptionsHelper.inputTypes[1],
        OptionsHelper.inputTypes[2]
      ],
      OptionsHelper.inputTypes[0]
    )
  };
};

storiesOf('Table', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('classic', () => {
    const tableProps = {
      ...commonKnobs(),
      ...classicKnobs(),
      contextTheme: classic
    };

    return (
      <TableWrapper { ...tableProps } />
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  })
  .add(
    'default',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...dlsKnobs(),
        contextTheme: small
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  )
  .add(
    'classic with inputs',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...classicKnobs(),
        ...inputKnobs(),
        contextTheme: classic
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  )
  .add(
    'default with inputs',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...dlsKnobs(),
        ...inputKnobs(),
        contextTheme: small
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );
