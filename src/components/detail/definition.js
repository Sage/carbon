import Detail from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Detail,
  key: 'detail',
  text: {
    bemClass: 'carbon-detail',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Detail',
    type: 'layout'
  },
  defaultProps: Detail.defaultProps,
  props: Detail.propTypes,
  propOptions: {
    icon: OptionsHelper.icons()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'Test detail',
  footnote: 'Test footnote',
  icon: 'tick'
});

export default definition;
