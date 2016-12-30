import Profile from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Profile,
  key: 'profile',
  text: {
    bemClass: 'carbon-profile',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Profile',
    type: 'misc'
  },
  defaultProps: Profile.defaultProps,
  props: Profile.propTypes
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test',
  email: 'test@test.com',
  name: 'Test'
});

export default definition;
