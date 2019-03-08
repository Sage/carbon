import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Row, Column } from './row';
import notes from './notes.md';

storiesOf('Row', module)

  .add('default', () => {
    // row
    const classNameRow = text('className', '');
    const columnClasses = text('className', '');
    const columnDivide = boolean('columnDivide', false);
    const columns = text('columns', '3');
    const gutter = text('gutter', 'medium');
    // column
    const classNameColumn = text('className', '');
    const columnAlign = text('columnAlign', OptionsHelper.alignBinary[0]);
    const columnOffset = text('columnOffset', '0');
    const columnSpan = text('columnSpan', '1');
    const children = text('children', 'Column content');

    return (
      <Row
        className={ classNameRow }
        columnClasses={ columnClasses }
        columnDivide={ columnDivide }
        columns={ columns }
        gutter={ gutter }
      >
        <Column
          className={ classNameColumn }
          columnAlign={ columnAlign }
          columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          { children }
        </Column>
        <Column
          className={ classNameColumn }
          columnAlign={ columnAlign }
          columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          { children }
        </Column>
        <Column
          className={ classNameColumn }
          columnAlign={ columnAlign }
          columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          { children }
        </Column>
      </Row>
    );
  }, {
    notes: { markdown: notes }
  });
