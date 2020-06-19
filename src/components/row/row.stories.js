import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Row, Column } from './row';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Row.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /row\.js(?!spec)/
);

Column.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /column\.js(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
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
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: { text: info },
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Row', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
