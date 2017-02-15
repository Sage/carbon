import NavigationBar from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('navigation-bar', NavigationBar, {
  propOptions: {
    as: OptionsHelper.themesBinary,
  },
  propTypes: {
    as: "String"
  },
  propDescriptions: {
    as: "Primary or Secondary theme."
  }
});

export default definition;
