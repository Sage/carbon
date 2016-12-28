import Icon from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Icon,
  key: 'icon',
  text: {
    bemClass: 'carbon-icon',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Icon',
    type: 'misc'
  },
  defaultProps: Icon.defaultProps,
  props: Icon.propTypes,
  propOptions: {
    type: DefinitionHelper.icons(),
    bgShape: ['square', 'rounded-rect', 'circle'],
    bgSize: ['small', 'medium', 'large'],
    bgTheme: DefinitionHelper.colors(),
    tooltipAlign: DefinitionHelper.alignPlusCenter(),
    tooltipPosition: DefinitionHelper.positions()
  }
};

let demoProps = DefinitionHelper.tooltipDecoratorDemoProps();

demoProps.type = DefinitionHelper.icons()[0];
demoProps.bgShape = 'square';
demoProps.bgSize = 'medium';
demoProps.bgTheme = 'success';

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, demoProps);

export default definition;
