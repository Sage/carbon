import Tooltip from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Tooltip,
  key: 'tooltip',
  text: {
    bemClass: 'carbon-tooltip',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Tooltip',
    type: 'misc'
  },
  defaultProps: Tooltip.defaultProps,
  props: Tooltip.propTypes,
  propOptions: {
    align: DefinitionHelper.tooltipAlignPropOptions(),
    position: DefinitionHelper.tooltipPositionPropOptions()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  align: 'left',
  children: 'test',
  isVisible: true
});

export default definition;
