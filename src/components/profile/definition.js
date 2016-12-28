import Profile from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test',
  email: 'test@test.com',
  name: 'Test'
});

export default definition;
