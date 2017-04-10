const elementsTagTest = (wrapper, elements) => {
  elements.forEach((element) => {
    it(`include 'data-element="${element}"'`, () => {
      expect(wrapper.find({ 'data-element': element }).length).toEqual(1);
    });
  });
};

const rootTagTest = (rootNode, comp, elem, role) => {
  expect(rootNode.prop('data-component')).toEqual(comp);
  expect(rootNode.prop('data-element')).toEqual(elem);
  expect(rootNode.prop('data-role')).toEqual(role);
};

export {
  elementsTagTest,
  rootTagTest
};
