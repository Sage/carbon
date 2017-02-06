import Pod from './';
import OptionsHelper from '../../utils/helpers/options-helper';
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
  children: 'This is some demo content deliberately supposed to be quite a few words long',
  collapsed: false,
  description: 'Test description',
  displayEditButtonOnHover: false,
  editContentFullWidth: false,
  footer: DemoHelper.elemArray(linkDefinition, 1)[0],
  internalEditButton: false,
  onEdit: DemoHelper.stubbedFunction,
  padding: "medium",
  subtitle: 'Test subtitle',
  title: 'Test title',
  triggerEditOnContent: false
};

export default definition;
