import Tooltip from './';

import { _ } from 'lodash';

let definition = {
  component: Tooltip,
  key: 'tooltip',
  text: {
    bemClass: 'carbon-tooltip',
    details: '',
    description: '',
    name: 'Tooltip',
    type: 'layout'
  },
  defaultProps: Tooltip.defaultProps,
  demoProps: _.assign({ children: 'test' }, Tooltip.defaultProps),
  props: Tooltip.propTypes
}
export default definition;
