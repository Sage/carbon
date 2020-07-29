import React from 'react';
import { storiesOf } from '@storybook/react';
import { State } from '@sambego/storybook-state';
import {
  boolean,
  text,
  select,
  number
} from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import { notes, info } from './documentation';
import TableWrapper from './table-story-helpers/table-story-wrapper.component';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { Table } from '.';
import getDocGenInfo from '../../utils/helpers/docgen-info';

TableWrapper.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /table\.component(?!spec)/
);

const commonKnobs = (
  {
    paginate: defaultPaginate = false,
    showPageSizeSelection: defaultShowPageSizeSelection = false
  } = {}
) => {
  const paginate = boolean('paginate', defaultPaginate);
  const showPageSizeSelection = paginate && boolean('showPageSizeSelection', defaultShowPageSizeSelection);
  const selectable = boolean('selectable', false);
  const highlightable = boolean('highlightable', false);

  return {
    sortOrder: select('sortOrder', ['', 'asc', 'desc'], ''),
    sortColumn: select('sortColumn', ['', 'name', 'code'], ''),
    highlightable,
    selectable,
    isPassiveData: !highlightable && !selectable ? boolean('isPassiveData', false) : undefined,
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
      text: info,
      propTablesExclude: [State]
    },
    notes: { markdown: notes }
  })
  .add('classic', () => {
    const tableProps = {
      ...commonKnobs(),
      ...classicKnobs()
    };

    return (
      <TableWrapper { ...tableProps } />
    );
  }, {
    themeSelector: classicThemeSelector,
    chromatic: {
      disable: true
    }
  })
  .add(
    'default',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...dlsKnobs()
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      themeSelector: dlsThemeSelector
    },
  )
  .add(
    'classic with inputs',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...classicKnobs(),
        ...inputKnobs()
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      themeSelector: classicThemeSelector,
      chromatic: {
        disable: true
      }
    },
  )
  .add(
    'default with inputs',
    () => {
      const tableProps = {
        ...commonKnobs(),
        ...dlsKnobs(),
        ...inputKnobs()
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      themeSelector: dlsThemeSelector
    },
  )
  .add(
    'default with inputs and paginate',
    () => {
      const tableProps = {
        ...commonKnobs({ paginate: true }),
        ...dlsKnobs(),
        ...inputKnobs()
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      themeSelector: dlsThemeSelector
    },
  )
  .add(
    'default with inputs and paginate and page size',
    () => {
      const tableProps = {
        ...commonKnobs({ paginate: true, showPageSizeSelection: true }),
        ...dlsKnobs(),
        ...inputKnobs()
      };

      return (
        <TableWrapper { ...tableProps } />
      );
    },
    {
      themeSelector: dlsThemeSelector
    },
  );
