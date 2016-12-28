import Help from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Help,
  key: 'help',
  text: {
    bemClass: 'carbon-help',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Help',
    type: 'misc'
  },
  defaultProps: Help.defaultProps,
  props: Help.propTypes,
  propOptions: {
    tooltipAlign: DefinitionHelper.tooltipAlignPropOptions(),
    tooltipPosition: DefinitionHelper.tooltipPositionPropOptions()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'Tooltip test',
  tooltipAlign: 'left',
  tooltipPosition: 'top'
});

export default definition;
