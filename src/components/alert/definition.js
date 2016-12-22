import Alert from './';

import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Alert,
  key: 'alert',
  text: {
    bemClass: 'carbon-alert',
    details: '',
    description: '',
    name: 'Alert',
    type: 'layout'
  },
  props: Alert.propTypes,
  defaultProps: Alert.defaultProps,
  propOptions: {
    size: DefinitionHelper.baseSizes()
  }
}

definition.demoProps = DefinitionHelper.prepareDemoProps(
  definition,
  'test',
  { enableBackgroundUI: true,
    showCloseIcon: true,
    size: DefinitionHelper.baseSizes()[2] }
);

export default definition;
