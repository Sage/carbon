import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { Row, Column } from './row';
import { notes, info } from './documentation';

storiesOf('Row', module)
  .add('default', () => {
    // row
    const columnClasses = text('columnClasses', 'example-classname');
    const columnDivide = boolean('columnDivide', Row.columnDivide);
    const columns = text('columns', '5');
    const gutter = text('gutter', Row.gutter);
    // column
    const columnAlign = text('columnAlign', Column.columnAlign);
    const columnOffset = text('columnOffset', Column.columnOffset);
    const columnSpan = text('columnSpan', Column.columnSpan);
    const children = text('children');

    return (
      <Row
        columnDivide={ columnDivide }
        columns={ columns }
        gutter={ gutter }
        columnClasses={ columnClasses }
      >
        <Column
          columnAlign={ columnAlign }
          columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          { children }
        </Column>
        <Column
          columnAlign={ columnAlign }
          columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          { children }
        </Column>
        <Column
          columnAlign={ columnAlign }
          columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          { children }
        </Column>
      </Row>
    );
  }, {
    notes: { markdown: notes },
    info: { text: info }
  });
