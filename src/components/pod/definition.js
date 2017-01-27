import Pod from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import detailDefinition from '../detail/definition';
import linkDefinition from '../link/definition';

let definition = {
  component: Pod,
  key: 'pod',
  text: {
    bemClass: 'carbon-pod',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Pod',
    type: 'layout'
  },
  defaultProps: Pod.defaultProps,
  props: Pod.propTypes,
  propOptions: {
    alignTitle: OptionsHelper.alignFull(),
    as: OptionsHelper.themesFull(),
    padding: OptionsHelper.sizesPod()
  }
};

definition.demoProps = {
  alignTitle: 'left',
  as: "primary",
  border: true,
  children: DemoHelper.elemArray(detailDefinition, 2),
  collapsed: false,
  description: 'Test description',
  displayEditButtonOnHover: false,
  editContentFullWidth: false,
  footer: DemoHelper.elemArray(linkDefinition, 1),
  internalEditButton: false,
  padding: "medium",
  subtitle: 'Test subtitle',
  title: 'Test title',
  triggerEditOnContent: false
};

export default definition;
