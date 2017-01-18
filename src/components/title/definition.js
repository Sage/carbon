import Title from './';

let definition = {
  component: Title,
  key: 'title',
  text: {
    bemClass: 'carbon-title',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Title',
    type: 'layout'
  },
  defaultProps: Title.defaultProps,
  props: Title.propTypes
};

definition.demoProps = {
  start: 'This is the first part',
  end: 'and this is the second part'
};

export default definition;
