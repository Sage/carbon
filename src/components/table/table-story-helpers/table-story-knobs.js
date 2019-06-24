import {
  boolean,
  text,
  select,
  number
} from '@storybook/addon-knobs';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';
import { Table } from '..';

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

export {
  commonKnobs,
  classicKnobs,
  dlsKnobs,
  inputKnobs
};
