import I18n from './';

import { _ } from 'lodash';

let definition = {
  component: I18n,
  key: 'i18n',
  text: {
    bemClass: 'carbon-i18n',
    details: '',
    description: '',
    name: 'I18n',
    type: 'layout'
  },
  defaultProps: I18n.defaultProps,
  demoProps: _.assign({ children: 'test' }, I18n.defaultProps),
  props: I18n.propTypes
}
export default definition;
