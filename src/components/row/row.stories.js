import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Row, Column } from './row';
import { notes, info } from './documentation';

storiesOf('Row', module).add(
  'default',
  () => {
    // row
    const columnDivide = boolean('columnDivide', true);
    const gutter = select('gutter', OptionsHelper.sizesFull, Row.defaultProps.gutter);
    // column
    const columnAlign = select('columnAlign', OptionsHelper.alignBinary, Column.defaultProps.columnAlign);
    const columnOffset = text('columnOffset', Column.defaultProps.columnOffset);
    const columnSpan = text('columnSpan', Column.defaultProps.columnSpan);
    const children = text('children', 'content');

    return (
      <Row columnDivide={ columnDivide } gutter={ gutter }>
        <Column
          columnAlign={ columnAlign } columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          {children}
        </Column>
        <Column
          columnAlign={ columnAlign } columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          {children}
        </Column>
        <Column
          columnAlign={ columnAlign } columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          {children}
        </Column>
        <Column
          columnAlign={ columnAlign } columnOffset={ columnOffset }
          columnSpan={ columnSpan }
        >
          {children}
        </Column>
      </Row>
    );
  },
  {
    notes: { markdown: notes },
    info: { text: info }
  }
);
