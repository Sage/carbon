import Slide from './';

import { _ } from 'lodash';

let definition = {
  component: Slide,
  key: 'slide',
  text: {
    bemClass: 'carbon-slide',
    details: '',
    description: '',
    name: 'Slide',
    type: 'layout'
  },
  props: { children: 'test', className: 'test' }
}

export default definition;
