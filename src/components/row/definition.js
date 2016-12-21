import React from 'react';

import Row from './';

import { _ } from 'lodash';

let column = React.createElement('div', { children: 'test' });

let definition = {
  component: Row,
  key: 'row',
  text: {
    bemClass: 'carbon-row',
    details: '',
    description: '',
    name: 'Row',
    type: 'layout'
  },
  defaultProps: Row.defaultProps,
  demoProps: _.assign({ children: [column, column, column] }, Row.defaultProps),
  props: Row.propTypes
}
export default definition;
