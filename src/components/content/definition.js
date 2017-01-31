import Content from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Content,
  key: 'content',
  text: {
    bemClass: 'carbon-content',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Content',
    type: 'layout'
  },
  defaultProps: Content.defaultProps,
  props: Content.propTypes,
  propOptions: {
    align: OptionsHelper.alignBinary(),
    as: OptionsHelper.themesBinary()
  }
};

definition.demoProps = {
  align: "left",
  as: "primary",
  bodyFullWidth: false,
  children: 'test',
  inline: true,
  title: 'Test',
  titleWidth: 20,
};

export default definition;
