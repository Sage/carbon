/**
 * Runs snapshot test
 * @return {Void}
 */
function snapShotTest(component) {
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
}

export default snapShotTest;
