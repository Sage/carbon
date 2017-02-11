import NavigationBar from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('navigation-bar', NavigationBar, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
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
