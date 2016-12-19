import Detail from './';

import { _ } from 'lodash';

let definition = {
  component: Detail,
  key: 'detail',
  text: {
    bemClass: 'carbon-detail',
    details: '',
    description: '',
    name: 'Detail',
    type: 'layout'
  },
  defaultProps: Detail.defaultProps,
  demoProps: _.assign({ children: 'test' }, Detail.defaultProps),
  props: Detail.propTypes
}
export default definition;
