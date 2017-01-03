import AppWrapper from './';
import DemoHelper from '../../utils/helpers/demo-helper';

let definition = {
  component: AppWrapper,
  key: 'app-wrapper',
  text: {
    bemClass: 'carbon-app-wrapper',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'AppWrapper',
    type: 'layout'
  },
  defaultProps: AppWrapper.defaultProps,
  props: AppWrapper.propTypes
};

definition.demoProps = {
  children: 'This content has been wrapped in a fixed  padding that can be re-used across the application'
};

export default definition;
